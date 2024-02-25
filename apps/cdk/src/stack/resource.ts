import type { StackProps, Stage } from 'aws-cdk-lib';
import { IpAddresses } from 'aws-cdk-lib/aws-ec2';
import { Stack } from 'aws-cdk-lib';

import { config } from '@appify/config';
import { Vpc } from '@appify/construct/vpc';
import { Alb } from '@appify/construct/alb';
import { Tags } from '@appify/construct/tags';
import { Parameter } from '@appify/construct/parameter';
import { SecurityGroup } from '@appify/construct/security-group';
import { LoadBalancerTarget } from 'aws-cdk-lib/aws-route53-targets';
import { ARecord, IHostedZone, PublicHostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53';

/**
 *
 * @description Exported parameters for other stacks to use
 */
export enum ExportParamter {
   VPC_ID = 'VpcId-ExportParamter',
   ALB_ARN = 'AlbArn-ExportParamter',
   ALB_SG = 'AlbSG-ExportParamter',
}

interface ResourceStackProps extends StackProps {
   tagIdentifier: string;
   stackIdentifier: string;
}

export class ResourceStack extends Stack {
   public readonly vpc: Vpc;
   public readonly alb: Alb;
   public readonly albSG: SecurityGroup;
   public readonly hostedZone: IHostedZone;

   constructor(scope: Stage, id: string, props?: ResourceStackProps) {
      super(scope, id, props);

      this.vpc = new Vpc(this, 'DefaultVpc', {
         ipAddresses: IpAddresses.cidr('10.0.0.0/16'),
         natGateways: 1,
         maxAzs: 3,
      });

      this.albSG = new SecurityGroup(this, 'AlbSecurityGroup', {
         description: 'Security Group for Load Balancer',
         allowAllOutbound: true,
         vpc: this.vpc,
      });

      this.alb = new Alb(this, 'DefaultAlb', {
         securityGroup: this.albSG,
         internetFacing: true,
         vpc: this.vpc,
      });

      this.hostedZone = PublicHostedZone.fromHostedZoneAttributes(this, 'HostedZone', {
         hostedZoneId: config.cdk.hostedZoneId,
         zoneName: config.cdk.hostedZoneDomain,
      });

      new ARecord(this, 'ARecordAlb', {
         target: RecordTarget.fromAlias(new LoadBalancerTarget(this.alb)),
         recordName: config.cdk.hostedZoneDomain,
         zone: this.hostedZone,
      });

      new Parameter(this, 'VpcIdExport', {
         parameterName: ExportParamter.VPC_ID,
         stringValue: this.vpc.vpcId,
      });

      new Parameter(this, 'AlbArnExport', {
         parameterName: ExportParamter.ALB_ARN,
         stringValue: this.alb.loadBalancerArn,
      });

      new Parameter(this, 'AlbSGExport', {
         parameterName: ExportParamter.ALB_SG,
         stringValue: this.albSG.securityGroupId,
      });

      Tags.tagStack(this, [
         { tagIdentifier: props.tagIdentifier },
         { stackIdentifier: props.stackIdentifier },
      ]);
   }
}
