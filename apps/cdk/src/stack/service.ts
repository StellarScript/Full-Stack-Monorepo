import type { Stage } from 'aws-cdk-lib';
import type { ISecurityGroup, IVpc } from 'aws-cdk-lib/aws-ec2';
import type { ICertificate } from 'aws-cdk-lib/aws-certificatemanager';
import type { ApplicationListener } from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import type { IApplicationLoadBalancer as IAlb } from 'aws-cdk-lib/aws-elasticloadbalancingv2';

import { Stack } from 'aws-cdk-lib';
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';
import { ApplicationProtocol, ApplicationTargetGroup } from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { ListenerAction, ListenerCondition } from 'aws-cdk-lib/aws-elasticloadbalancingv2';

import { Vpc } from '@appify/construct/vpc';
import { Alb } from '@appify/construct/alb';
import { SecurityGroup } from '@appify/construct/security-group';

import { Tags } from '@appify/construct/tags';
import { HealthCheck } from '@appify/construct/health-check';
import { ServiceContainer } from '@appify/construct/container';
import { FargateService } from '@appify/construct/fargate-service';

import { Cluster } from '@appify/construct/cluster';
import { AutoScalingGroup } from '@appify/construct/autoscaling';
import { AsgCapacityProvider } from '@appify/construct/asg-capacity';
import { FargateTaskDefinition } from '@appify/construct/task-definition';

import { config } from '@appify/config';
import { ServiceConfig, ContainerName, ImageTag, ExportParamter } from '../config';
import { RdsAurora } from '@appify/construct/rds-aurora';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';

export class ServiceStack extends Stack {
   public readonly vpc: IVpc;
   public readonly alb: IAlb;
   public readonly albSG: ISecurityGroup;
   public readonly certificate: ICertificate;

   public readonly cluster: Cluster;
   public readonly serviceSG: SecurityGroup;
   public readonly fargateService: FargateService;
   public readonly autoscalingGroup: AutoScalingGroup;
   public readonly asgCapacityProvider: AsgCapacityProvider;
   public readonly taskDefinition: FargateTaskDefinition;

   public readonly testListener: ApplicationListener;
   public readonly secureListener: ApplicationListener;
   public readonly blueTargetGroup: ApplicationTargetGroup;
   public readonly greenTargetGroup: ApplicationTargetGroup;

   constructor(scope: Stage, id: string, props?: Cdk.StackProps) {
      super(scope, id, props);

      // Resource Lookup
      this.vpc = Vpc.vpcLookup(this, 'VpcLookup', ExportParamter.VPC_ID);
      this.alb = Alb.albLookup(this, 'AlbLookup', ExportParamter.ALB_ARN);
      this.albSG = SecurityGroup.securityGroupLookup(this, 'SGLookup', ExportParamter.ALB_SG);
      this.certificate = Certificate.fromCertificateArn(this, 'CertLookup', config.cdk.certificateArn);

      this.autoscalingGroup = new AutoScalingGroup(this, 'AutoscalingGroup', {
         vpc: this.vpc,
         minCapacity: 1,
         maxCapacity: 3,
      });

      this.asgCapacityProvider = new AsgCapacityProvider(this, 'AsgCapacityProvider', {
         autoScalingGroup: this.autoscalingGroup,
      });

      this.cluster = new Cluster(this, 'Cluster', {
         asgCapacityProvider: this.asgCapacityProvider,
         vpc: this.vpc,
      });

      this.taskDefinition = new FargateTaskDefinition(this, 'TaskDefinition', {
         memoryLimitMiB: ServiceConfig.MemoryLimitMiB,
         cpu: ServiceConfig.Cpu,
         family: ServiceConfig.FamilyName,
      });

      new ServiceContainer(this.taskDefinition, ContainerName.Server, {
         portMappings: [{ containerPort: ServiceConfig.Ports.Server }],
         tag: ImageTag.Latest,
         log: true,
         essential: false,
         environment: {
            DOPPLER_TOKEN: config.dopper.token,
            DATABASE_URL: RdsAurora.databaseURIFromSecret(
               Secret.fromSecretNameV2(this, 'RdsSecret', ExportParamter.RDS_SECRET),
               config.database.rdsEndpoint,
            ),
         },
      });
      new ServiceContainer(this.taskDefinition, ContainerName.Client, {
         portMappings: [{ containerPort: ServiceConfig.Ports.Client }],
         tag: ImageTag.Latest,
         essential: true,
         log: true,
         environment: {
            DOPPLER_TOKEN: config.dopper.token,
         },
      });

      this.serviceSG = new SecurityGroup(this, 'ServiceSecurityGroup', {
         description: 'Ecs Fargate Service Security Group',
         allowAllOutbound: true,
         vpc: this.vpc,
      });

      this.fargateService = new FargateService(this, 'FargateService', {
         securityGroups: [this.serviceSG],
         taskDefinition: this.taskDefinition,
         cluster: this.cluster,
         desiredCount: 1,
      });

      const clientTargetGroup = this.fargateService.loadBalancerTarget({
         containerName: ContainerName.Client,
         containerPort: ServiceConfig.Ports.Client,
      });

      this.blueTargetGroup = new ApplicationTargetGroup(this, 'BlueTargetGroup', {
         healthCheck: new HealthCheck({ path: '/' }),
         protocol: ApplicationProtocol.HTTP,
         targets: [clientTargetGroup],
         port: ServiceConfig.Ports.Client,
         vpc: this.vpc,
      });

      this.greenTargetGroup = new ApplicationTargetGroup(this, 'GreenTargetGroup', {
         healthCheck: new HealthCheck({ path: '/api/health' }),
         protocol: ApplicationProtocol.HTTP,
         targets: [clientTargetGroup],
         port: ServiceConfig.Ports.Client,
         vpc: this.vpc,
      });

      this.testListener = this.alb.addListener('TestListener', {
         port: ServiceConfig.Ports.Client,
         protocol: ApplicationProtocol.HTTP,
      });

      this.secureListener = this.alb.addListener('SecureListener', {
         certificates: [this.certificate],
         port: ServiceConfig.Ports.Secure,
         open: true,
      });

      this.testListener.addTargetGroups('TestListener', {
         targetGroups: [this.greenTargetGroup],
      });

      this.secureListener.addTargetGroups('SecureListener', {
         targetGroups: [this.blueTargetGroup],
      });

      this.testListener.addAction('RedirectHttps', {
         priority: 1,
         conditions: [ListenerCondition.pathPatterns(['*'])],
         action: ListenerAction.redirect({
            port: ServiceConfig.Ports.Secure.toString(),
            protocol: ApplicationProtocol.HTTPS,
         }),
      });

      Tags.tagStack(this, [
         { tagIdentifier: props.tagIdentifier },
         { stackIdentifier: props.stackIdentifier },
      ]);
   }
}
