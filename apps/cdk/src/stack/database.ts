import type { IVpc } from 'aws-cdk-lib/aws-ec2';
import { CfnOutput, RemovalPolicy, SecretValue, Stack, Stage } from 'aws-cdk-lib';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';
import { Credentials } from 'aws-cdk-lib/aws-rds';

import { config } from '@appify/config';
import { Vpc } from '@appify/construct/vpc';
import { Tags } from '@appify/construct/tags';
import { RdsAurora } from '@appify/construct/rds-aurora';
import { SecurityGroup } from '@appify/construct/security-group';
import { DatabaseCapacity } from '@appify/construct/rds-capacity';
import { ExportParamter } from '../config';

export class DatabaseStack extends Stack {
   public readonly vpc: IVpc;
   public readonly rdsSG: SecurityGroup;
   public readonly rdsDatabase: RdsAurora;

   constructor(scope: Stage, id: string, props?: Cdk.StackProps) {
      super(scope, id, props);

      this.vpc = Vpc.vpcLookup(this, 'VpcLookup', ExportParamter.VPC_ID);

      this.rdsSG = new SecurityGroup(this, 'RdsSecurityGroup', {
         allowAllOutbound: true,
         vpc: this.vpc,
      });

      const rdsCredentials = new Secret(this, 'RdsCredentials', {
         secretName: 'RdsCredentials',
         secretObjectValue: {
            username: new SecretValue(config.database.identifier),
            password: new SecretValue(config.database.password),
         },
      });

      this.rdsDatabase = new RdsAurora(this, 'RdsDatabase', {
         defaultDatabaseName: 'appifydatabase',
         capacity: new DatabaseCapacity({ minCapacity: 0.5, maxCapacity: 1 }),
         credentials: Credentials.fromSecret(rdsCredentials),
         clusterIdentifier: config.database.identifier,
         removalPolicy: RemovalPolicy.DESTROY,
         port: Number(config.database.port),
         securityGroups: [this.rdsSG],
         vpc: this.vpc,
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
