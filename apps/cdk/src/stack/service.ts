import type { StackProps, Stage } from 'aws-cdk-lib';
import type { ISecurityGroup, IVpc } from 'aws-cdk-lib/aws-ec2';
import type { ICertificate } from 'aws-cdk-lib/aws-certificatemanager';
import type { ApplicationListener } from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import type { IApplicationLoadBalancer as IAlb } from 'aws-cdk-lib/aws-elasticloadbalancingv2';

import { Stack } from 'aws-cdk-lib';
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';
import {
   ListenerAction,
   ListenerCondition,
   ApplicationProtocol,
   ApplicationTargetGroup,
} from 'aws-cdk-lib/aws-elasticloadbalancingv2';

import { config } from '@appify/config';
import { Vpc } from '@appify/construct/vpc';
import { Alb } from '@appify/construct/alb';
import { SecurityGroup } from '@appify/construct/security-group';

import { ExportParamter } from './resource';
import { Cluster } from '@appify/construct/cluster';
import { AutoScalingGroup } from '@appify/construct/autoscaling';
import { AsgCapacityProvider } from '@appify/construct/asg-capacity';
import { FargateTaskDefinition } from '@appify/construct/task-definition';

import { HealthCheck } from '@appify/construct/health-check';
import { ServiceContainer } from '@appify/construct/container';
import { FargateService } from '@appify/construct/fargate-service';
import { Config, ContainerName, ImageTag } from '../config';
import { Tags } from '@appify/construct/tags';

interface ServiceStackProps extends StackProps {
   tagIdentifier: string;
   stackIdentifier: string;
}

const TaskConfig = {
   Cpu: 256,
   MemoryLimitMiB: 512,
   familyName: 'appify-service',
};

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
   private readonly blueTargetGroup: ApplicationTargetGroup;
   private readonly greenTargetGroup: ApplicationTargetGroup;

   constructor(scope: Stage, id: string, props?: ServiceStackProps) {
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
         memoryLimitMiB: TaskConfig.MemoryLimitMiB,
         cpu: TaskConfig.Cpu,
         family: TaskConfig.familyName,
      });

      const serverContainer = new ServiceContainer(this.taskDefinition, ContainerName.Server, {
         portMappings: [{ containerPort: Config.Ports.Server }],
         tag: ImageTag.Latest,
         log: true,
         essential: false,
         environment: {
            DOPPLER_TOKEN: config.dopper.token,
         },
      });
      const clientContainer = new ServiceContainer(this.taskDefinition, ContainerName.Client, {
         portMappings: [{ containerPort: Config.Ports.Client }],
         tag: ImageTag.Latest,
         essential: true,
         log: true,
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
         containerPort: Config.Ports.Client,
      });

      this.blueTargetGroup = new ApplicationTargetGroup(this, 'BlueTargetGroup', {
         healthCheck: new HealthCheck({ path: '/' }),
         protocol: ApplicationProtocol.HTTP,
         targets: [clientTargetGroup],
         port: Config.Ports.Client,
         vpc: this.vpc,
      });

      this.greenTargetGroup = new ApplicationTargetGroup(this, 'GreenTargetGroup', {
         healthCheck: new HealthCheck({ path: '/api/data' }),
         protocol: ApplicationProtocol.HTTP,
         targets: [clientTargetGroup],
         port: Config.Ports.Client,
         vpc: this.vpc,
      });

      this.testListener = this.alb.addListener('TestListener', {
         port: Config.Ports.Client,
         protocol: ApplicationProtocol.HTTP,
      });

      this.secureListener = this.alb.addListener('SecureListener', {
         certificates: [this.certificate],
         port: Config.Ports.Secure,
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
            port: Config.Ports.Secure.toString(),
            protocol: ApplicationProtocol.HTTPS,
         }),
      });

      Tags.tagStack(this, [
         { tagIdentifier: props.tagIdentifier },
         { stackIdentifier: props.stackIdentifier },
      ]);
   }
}
