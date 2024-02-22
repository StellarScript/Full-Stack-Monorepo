import type { App, StageProps } from 'aws-cdk-lib';

import { Stage } from 'aws-cdk-lib';
import { ServiceStack } from '../stack/service';
import { ResourceStack } from '../stack/resource';

export class ProdStage extends Stage {
   constructor(scope: App, id: string, props?: StageProps) {
      super(scope, id, props);

      new ResourceStack(this, 'resource');
      new ServiceStack(this, 'service');
   }
}
