import type { App } from 'aws-cdk-lib';
import { Stage } from 'aws-cdk-lib';
import { Port } from 'aws-cdk-lib/aws-ec2';

import { StackIdentifier } from '../config';
import { ServiceStack } from '../stack/service';
import { ResourceStack } from '../stack/resource';
import { PipelineStack } from '../stack/pipeline';
import { DatabaseStack } from '../stack/database';

export class ProdStage extends Stage {
   public readonly resourceStack: ResourceStack;
   public readonly serviceStack: ServiceStack;
   public readonly pipelineStack: PipelineStack;
   public readonly databaseStack: DatabaseStack;

   constructor(scope: App, id: string, props?: Cdk.StageProps) {
      super(scope, id, props);

      this.resourceStack = new ResourceStack(this, 'resource', {
         stackIdentifier: StackIdentifier.ResourceStack,
         tagIdentifier: props.tagIdentifier,
         env: props.env,
      });

      this.databaseStack = new DatabaseStack(this, 'database', {
         tagIdentifier: props.tagIdentifier,
         stackIdentifier: StackIdentifier.DatabaseStack,
         env: props.env,
      });

      this.serviceStack = new ServiceStack(this, 'service', {
         stackIdentifier: StackIdentifier.ServiceStack,
         tagIdentifier: props.tagIdentifier,
         env: props.env,
      });

      this.pipelineStack = new PipelineStack(this, 'pipeline', {
         greenTargetGroup: this.serviceStack.greenTargetGroup,
         blueTargetGroup: this.serviceStack.blueTargetGroup,
         fargateService: this.serviceStack.fargateService,
         listener: this.serviceStack.secureListener,
      });

      if (this.serviceStack.serviceSG) {
         this.databaseStack.rdsSG.addIngressRule(
            this.serviceStack.serviceSG,
            Port.tcp(5432),
            'allow ecs service access to rds',
         );
      }
   }
}
