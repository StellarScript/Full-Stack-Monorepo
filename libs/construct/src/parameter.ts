import type { Construct } from 'constructs';
import { StringParameter } from 'aws-cdk-lib/aws-ssm';

export class Parameter extends StringParameter {
   static stringValue(scope: Construct, name: string): string {
      return StringParameter.valueFromLookup(scope, name);
   }
}
