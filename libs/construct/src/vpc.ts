import type { Construct } from 'constructs';
import type { IIpAddresses, IVpc, VpcProps as VpcConstructProps } from 'aws-cdk-lib/aws-ec2';
import { SubnetType, Vpc as VpcConstruct } from 'aws-cdk-lib/aws-ec2';

import { Parameter } from './parameter';
import { Arn } from './arn';

interface VpcProps extends Partial<VpcConstructProps> {
   ipAddresses: IIpAddresses;
}

export class Vpc extends VpcConstruct {
   constructor(scope: Construct, id: string, props?: VpcProps) {
      super(scope, id, {
         subnetConfiguration: [
            {
               cidrMask: 24,
               name: 'public',
               subnetType: SubnetType.PUBLIC,
            },
            {
               cidrMask: 24,
               name: 'private',
               subnetType: SubnetType.PRIVATE_WITH_EGRESS,
            },
            {
               cidrMask: 28,
               name: 'isolated',
               subnetType: SubnetType.PRIVATE_ISOLATED,
            },
         ],
         ...props,
      });
   }

   public static vpcLookup(scope: Construct, id: string, parameterName: string): IVpc {
      const vpcId = Parameter.stringValue(scope, parameterName);
      return Vpc.fromLookup(scope, id, { vpcId });
   }

   public static vpcArn(vpc: Vpc): string {
      return Arn.Vpc(vpc.stack.region, vpc.stack.account, vpc.vpcId);
   }

   public static subnetIds(vpc: IVpc): string[] {
      const subnets = [vpc.publicSubnets, vpc.isolatedSubnets, vpc.privateSubnets].flat();
      return subnets.map((subnet) => subnet.subnetId);
   }

   public static routeTableIds(vpc: IVpc): string[] {
      const subnets = [vpc.publicSubnets, vpc.isolatedSubnets, vpc.privateSubnets].flat();
      return subnets.map((subnet) => subnet.routeTable.routeTableId);
   }

   public static subnetArns(vpc: IVpc): string[] {
      return this.subnetIds(vpc).map((subnetId) =>
         Arn.VpcSubnet(vpc.stack.region, vpc.stack.account, subnetId)
      );
   }

   public static routeTabeArns(vpc: IVpc): string[] {
      return this.routeTableIds(vpc).map((routeTableId) =>
         Arn.VpcRouteTable(vpc.stack.region, vpc.stack.account, routeTableId)
      );
   }

   public static internetGatewayArn(vpc: Vpc): string {
      return Arn.VpcInternetGateway(vpc.stack.region, vpc.stack.account, vpc.internetGatewayId);
   }
}
