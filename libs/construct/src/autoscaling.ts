import type { Construct } from 'constructs';
import type { IVpc } from 'aws-cdk-lib/aws-ec2';
import type { AutoScalingGroupProps as AsgProps } from 'aws-cdk-lib/aws-autoscaling';

import { EcsOptimizedImage } from 'aws-cdk-lib/aws-ecs';
import { AutoScalingGroup as AsgConstruct } from 'aws-cdk-lib/aws-autoscaling';
import { InstanceSize, InstanceClass, InstanceType } from 'aws-cdk-lib/aws-ec2';

interface AsgConstructProps extends Partial<AsgProps> {
   vpc: IVpc;
}

class DefaultOptions {
   static minCapacity = 1;
   static maxCapacity = 3;
}

export class AutoScalingGroup extends AsgConstruct {
   constructor(scope: Construct, id: string, props: AsgConstructProps) {
      super(scope, id, {
         instanceType: InstanceType.of(InstanceClass.T2, InstanceSize.SMALL),
         machineImage: EcsOptimizedImage.amazonLinux2(),
         minCapacity: props.minCapacity || DefaultOptions.minCapacity,
         maxCapacity: props.maxCapacity || DefaultOptions.maxCapacity,
         ...props,
      });
   }
}
