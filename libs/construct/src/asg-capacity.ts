import type { Construct } from 'constructs';
import type { AutoScalingGroup } from 'aws-cdk-lib/aws-autoscaling';
import type { AsgCapacityProviderProps as AsgProps } from 'aws-cdk-lib/aws-ecs';
import { AsgCapacityProvider as CapacityProvider } from 'aws-cdk-lib/aws-ecs';

class DefaultOptions {
   static targetCapacityPercent = 85;
   static maximumScalingStepSize = 1;
}

interface AsgCapacityProviderProps extends Partial<AsgProps> {
   autoScalingGroup: AutoScalingGroup;
}

export class AsgCapacityProvider extends CapacityProvider {
   constructor(scope: Construct, id: string, props: AsgCapacityProviderProps) {
      super(scope, id, {
         targetCapacityPercent: DefaultOptions.targetCapacityPercent,
         maximumScalingStepSize: DefaultOptions.maximumScalingStepSize,
         ...props,
      });
   }
}
