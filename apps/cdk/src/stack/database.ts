import type { IVpc } from 'aws-cdk-lib/aws-ec2';
import { CfnOutput, RemovalPolicy, SecretValue, Stack, Stage } from 'aws-cdk-lib';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';
import { Credentials } from 'aws-cdk-lib/aws-rds';

import { Vpc } from '@appify/construct/vpc';
import { Tags } from '@appify/construct/tags';
import { Parameter } from '@appify/construct/parameter';
import { RdsAurora } from '@appify/construct/rds-aurora';
import { SecurityGroup } from '@appify/construct/security-group';
import { DatabaseCapacity } from '@appify/construct/rds-capacity';
import { DatabaseConfig, ExportParamter, Ports } from '../config';

export class DatabaseStack extends Stack {
   public readonly vpc: IVpc;
   public readonly rdsSG: SecurityGroup;
   public readonly rdsDatabase: RdsAurora;

   constructor(scope: Stage, id: string, props?: Cdk.StackProps) {
      super(scope, id, props);

      this.vpc = Vpc.vpcLookup(this, 'VpcLookup', ExportParamter.VPC_ID);

      this.rdsSG = new SecurityGroup(this, 'RdsSecurityGroup', {
         description: 'RDS Security Group',
         allowAllOutbound: true,
         vpc: this.vpc,
      });

      const rdsSecrets = new Secret(this, 'RdsCredentials', {
         secretName: 'RdsCredentials',
         secretObjectValue: {
            username: new SecretValue(DatabaseConfig.identifier),
            password: new SecretValue(DatabaseConfig.password),
         },
      });

      this.rdsDatabase = new RdsAurora(this, 'RdsDatabase', {
         defaultDatabaseName: DatabaseConfig.identifier,
         capacity: new DatabaseCapacity({ minCapacity: 0.5, maxCapacity: 1 }),
         credentials: Credentials.fromSecret(rdsSecrets),
         clusterIdentifier: DatabaseConfig.identifier,
         removalPolicy: RemovalPolicy.DESTROY,
         port: Number(Ports.Database),
         securityGroups: [this.rdsSG],
         vpc: this.vpc,
      });

      new Parameter(this, 'RdsSecretName', {
         parameterName: ExportParamter.RDS_SECRET,
         stringValue: rdsSecrets.secretName,
      });

      Tags.tagStack(this, [
         { stackIdentifier: props.stackIdentifier },
         { tagIdentifier: props.tagIdentifier },
      ]);

      new CfnOutput(this, 'DatabaseEndpoint', {
         value: this.rdsDatabase.clusterEndpoint.hostname,
         exportName: 'DatabaseEndpoint',
      });
   }
}
