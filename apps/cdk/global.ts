import type { StackProps as Stack, StageProps as Stage } from 'aws-cdk-lib';

declare global {
   namespace Cdk {
      export interface StackProps extends Stack {
         readonly tagIdentifier: string;
         readonly stackIdentifier: string;
      }

      export interface StageProps extends Stage {
         readonly tagIdentifier: string;
      }
   }
}
