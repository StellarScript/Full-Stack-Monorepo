import type { Construct } from 'constructs';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';
import { Parameter } from './parameter';

export class Secrets extends Secret {
   public static fromSecret(scope: Construct, id: string, name: string) {
      return Secret.fromSecretNameV2(scope, id, name);
   }

   public static fromSecretNameParameter(scope: Construct, id: string, name: string) {
      const secretValueName = Parameter.stringValue(scope, name);
      return this.fromSecret(scope, id, secretValueName);
   }
}
