import { Construct } from 'constructs';
import { Aspects } from 'aws-cdk-lib';
import {
   Credentials,
   CfnDBCluster,
   DatabaseCluster,
   ClusterInstance,
   DatabaseClusterProps,
   DatabaseClusterEngine,
   AuroraPostgresEngineVersion,
} from 'aws-cdk-lib/aws-rds';
import { IVpc, SubnetType } from 'aws-cdk-lib/aws-ec2';
import { DatabaseCapacity } from './rds-capacity';

interface RdsAuroraProps extends Partial<DatabaseClusterProps> {
   port: number;
   vpc: IVpc;
   credentials: Credentials;
   capacity: DatabaseCapacity;
}

export class RdsAurora extends DatabaseCluster {
   constructor(scope: Construct, id: string, props: RdsAuroraProps) {
      super(scope, id, {
         writer: ClusterInstance.serverlessV2,
         engine: DatabaseClusterEngine.auroraPostgres({
            version: AuroraPostgresEngineVersion.VER_14_8,
         }),
         vpcSubnets: { subnetType: SubnetType.PRIVATE_ISOLATED },
         ...props,
      });

      Aspects.of(this).add({
         visit(node) {
            const serverlessV2ScalingConfigurationProperty: CfnDBCluster.ServerlessV2ScalingConfigurationProperty =
               props.capacity;
            if (node instanceof CfnDBCluster) {
               node.serverlessV2ScalingConfiguration = serverlessV2ScalingConfigurationProperty;
            }
         },
      });
   }
}
