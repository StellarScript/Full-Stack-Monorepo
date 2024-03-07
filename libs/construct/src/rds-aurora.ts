import type { Construct } from 'constructs';
import type { IVpc } from 'aws-cdk-lib/aws-ec2';
import type { ISecret } from 'aws-cdk-lib/aws-secretsmanager';

import {
   Credentials,
   CfnDBCluster,
   DatabaseCluster,
   ClusterInstance,
   DatabaseClusterProps,
   DatabaseClusterEngine,
   AuroraPostgresEngineVersion,
} from 'aws-cdk-lib/aws-rds';
import { Aspects } from 'aws-cdk-lib';
import { SubnetType } from 'aws-cdk-lib/aws-ec2';
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

   public static databaseURIFromSecret(secret: ISecret, hostEndpoint: string): string {
      const getValue = (key: string) => secret.secretValueFromJson(key).toString();
      return `postgresql://${getValue('username')}:${getValue('password')}@${hostEndpoint}:${getValue('port')}/${getValue('dbname')}`;
   }
}
