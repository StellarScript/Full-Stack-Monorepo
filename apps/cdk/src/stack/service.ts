import type { Stage } from 'aws-cdk-lib';
import type { ISecurityGroup, IVpc } from 'aws-cdk-lib/aws-ec2';
import type { ICertificate } from 'aws-cdk-lib/aws-certificatemanager';
import type { ApplicationListener } from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import type { IApplicationLoadBalancer as IAlb } from 'aws-cdk-lib/aws-elasticloadbalancingv2';

import { Secret } from 'aws-cdk-lib/aws-ecs';
import { SecretValue, Stack } from 'aws-cdk-lib';
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';
import { ListenerAction, ListenerCondition } from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { ApplicationProtocol, ApplicationTargetGroup } from 'aws-cdk-lib/aws-elasticloadbalancingv2';

import { Vpc } from '@appify/construct/vpc';
import { Alb } from '@appify/construct/alb';
import { SecurityGroup } from '@appify/construct/security-group';

import { Tags } from '@appify/construct/tags';
import { HealthCheck } from '@appify/construct/health-check';
import { ServiceContainer } from '@appify/construct/container';
import { FargateService } from '@appify/construct/fargate-service';

import { config } from '@appify/config';
import { Secrets } from '@appify/construct/secrets';
import { Cluster } from '@appify/construct/cluster';
import { RdsAurora } from '@appify/construct/rds-aurora';
import { AutoScalingGroup } from '@appify/construct/autoscaling';
import { AsgCapacityProvider } from '@appify/construct/asg-capacity';
import { FargateTaskDefinition } from '@appify/construct/task-definition';
import { Ports, ServiceConfig, ContainerName, ImageTag, ExportParamter } from '../config';

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
   public readonly ecsSecrets: Secrets;

   constructor(scope: Stage, id: string, props?: Cdk.StackProps) {
      super(scope, id, props);

      // Resource Lookup
      this.vpc = Vpc.vpcLookup(this, 'VpcLookup', ExportParamter.VPC_ID);
      this.alb = Alb.albLookup(this, 'AlbLookup', ExportParamter.ALB_ARN);
      this.albSG = SecurityGroup.securityGroupLookup(this, 'SGLookup', ExportParamter.ALB_SG);
      this.certificate = Certificate.fromCertificateArn(this, 'CertLookup', config.cdk.certificateArn);

      const databaseUrl = RdsAurora.databaseURIFromSecret(
         Secrets.fromSecretNameParameter(this, 'RdsSecret', ExportParamter.RDS_SECRET),
         config.database.rdsEndpoint,
      );

      this.ecsSecrets = new Secrets(this, 'EcsSecrets', {
         secretObjectValue: {
            DATABASE_URL: SecretValue.unsafePlainText(databaseUrl),
            TOKEN: SecretValue.unsafePlainText(config.dopper.token),
         },
      });

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
         portMappings: [{ containerPort: Ports.Server }],
         tag: ImageTag.Latest,
         log: true,
         essential: false,
         // Change to secrets
         environment: {
            DOPPLER_TOKEN: config.dopper.token,
            DATABASE_URL: databaseUrl,
         },
      });
      new ServiceContainer(this.taskDefinition, ContainerName.Client, {
         portMappings: [{ containerPort: Ports.Client }],
         tag: ImageTag.Latest,
         essential: true,
         log: true,
         // Change to secrets
         environment: {
            DOPPLER_TOKEN: config.dopper.token,
         },
         secrets: {
            DATABASE_URL: Secret.fromSecretsManager(this.ecsSecrets, 'DATABASE_URL'),
            TOKEN: Secret.fromSecretsManager(this.ecsSecrets, 'TOKEN'),
         },
      });
      this.ecsSecrets.grantRead(this.taskDefinition.taskRole);

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
         containerPort: Ports.Client,
      });

      this.blueTargetGroup = new ApplicationTargetGroup(this, 'BlueTargetGroup', {
         healthCheck: new HealthCheck({ path: '/' }),
         protocol: ApplicationProtocol.HTTP,
         targets: [clientTargetGroup],
         port: Ports.Client,
         vpc: this.vpc,
      });

      this.greenTargetGroup = new ApplicationTargetGroup(this, 'GreenTargetGroup', {
         healthCheck: new HealthCheck({ path: '/api/health' }),
         protocol: ApplicationProtocol.HTTP,
         targets: [clientTargetGroup],
         port: Ports.Client,
         vpc: this.vpc,
      });

      this.testListener = this.alb.addListener('TestListener', {
         port: Ports.Client,
         protocol: ApplicationProtocol.HTTP,
      });

      this.secureListener = this.alb.addListener('SecureListener', {
         certificates: [this.certificate],
         port: Ports.Secure,
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
            port: Ports.Secure.toString(),
            protocol: ApplicationProtocol.HTTPS,
         }),
      });

      Tags.tagStack(this, [
         { tagIdentifier: props.tagIdentifier },
         { stackIdentifier: props.stackIdentifier },
      ]);
   }
}
