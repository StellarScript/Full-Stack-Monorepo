import type { App } from 'aws-cdk-lib';
import { Stage } from 'aws-cdk-lib';

import { StackIdentifier } from '../config';
import { ServiceStack } from '../stack/service';
import { ResourceStack } from '../stack/resource';

export class ProdStage extends Stage {
   public readonly resourceStack: ResourceStack;
   public readonly serviceStack: ServiceStack;

   constructor(scope: App, id: string, props?: Cdk.StageProps) {
      super(scope, id, props);

      this.resourceStack = new ResourceStack(this, 'resource', {
         env: props?.env,
         tagIdentifier: props.tagIdentifier,
         stackIdentifier: StackIdentifier.ResourceStack,
      });

      this.serviceStack = new ServiceStack(this, 'service', {
         env: props?.env,
         tagIdentifier: props.tagIdentifier,
         stackIdentifier: StackIdentifier.ServiceStack,
      });
   }
}
