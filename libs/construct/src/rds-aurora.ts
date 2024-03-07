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
import { ISecret } from 'aws-cdk-lib/aws-secretsmanager';

interface RdsAuroraProps extends Partial<DatabaseClusterProps> {
   port: number;
   vpc: IVpc;
   credentials: Credentials;
   capacity: DatabaseCapacity;
}

export class RdsAurora extends DatabaseCluster {
   constructor(scope: Construct, id: string, props: RdsAuroraProps) {
      super(scope, id, {
         writer: ClusterInstance.serverlessV2('writer'),
         engine: DatabaseClusterEngine.auroraPostgres({
            version: AuroraPostgresEngineVersion.VER_16_1,
         }),
         vpcSubnets: { subnetType: SubnetType.PRIVATE_WITH_EGRESS },
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

   public static databaseURIFromSecret(secret: ISecret, host: string): string {
      return `postgresql://${secret.secretValueFromJson('username')}:${secret.secretValueFromJson('password')}@${host}:${secret.secretValueFromJson('port')}/${secret.secretValueFromJson('dbname')}`;
   }
}
