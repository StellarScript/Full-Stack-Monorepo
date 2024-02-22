import type { StackProps, Stage } from 'aws-cdk-lib';
import { Stack } from 'aws-cdk-lib';

export class ResourceStack extends Stack {
   constructor(scope: Stage, id: string, props?: StackProps) {
      super(scope, id, props);
   }
}
