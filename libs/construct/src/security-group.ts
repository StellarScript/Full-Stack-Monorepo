import type { Construct } from 'constructs';
import { SecurityGroup as SecurityGroupConstruct } from 'aws-cdk-lib/aws-ec2';

import { Parameter } from './parameter';
import { Arn } from './arn';

export class SecurityGroup extends SecurityGroupConstruct {
   public static securityGroupLookup(scope: Construct, id: string, parameterName: string) {
      const paramterValue = Parameter.stringValue(scope, parameterName);
      return SecurityGroup.fromSecurityGroupId(scope, id, paramterValue);
   }

   public static securityGroupArn(sg: SecurityGroupConstruct): string {
      return Arn.SecurityGroup(sg.stack.region, sg.stack.account, sg.securityGroupId);
   }
}
