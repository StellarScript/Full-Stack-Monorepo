import type { Construct } from 'constructs';
import type { IApplicationLoadBalancer as IAlb } from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { ApplicationLoadBalancer } from 'aws-cdk-lib/aws-elasticloadbalancingv2';

import { Parameter } from './parameter';
import { Arn } from './arn';

export class Alb extends ApplicationLoadBalancer {
   public static albLookup(scope: Construct, id: string, parameterName: string): IAlb {
      const loadBalancerArn = Parameter.stringValue(scope, parameterName);
      return ApplicationLoadBalancer.fromLookup(scope, id, { loadBalancerArn });
   }

   public static LoadbalancerArn(alb: ApplicationLoadBalancer): string {
      return Arn.Alb(alb.stack.region, alb.stack.account, alb.loadBalancerName);
   }
}
