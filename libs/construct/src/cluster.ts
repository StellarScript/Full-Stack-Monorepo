import type { Construct } from 'constructs';
import type { IVpc } from 'aws-cdk-lib/aws-ec2';
import type { AsgCapacityProvider, ClusterProps as ClusterConstructProps } from 'aws-cdk-lib/aws-ecs';
import { Cluster as ClusterConstruct } from 'aws-cdk-lib/aws-ecs';

interface ClusterProps extends Partial<ClusterConstructProps> {
   asgCapacityProvider?: AsgCapacityProvider;
   vpc: IVpc;
}

export class Cluster extends ClusterConstruct {
   constructor(scope: Construct, id: string, props: ClusterProps) {
      super(scope, id, {
         containerInsights: true,
         ...props,
      });

      if (props.asgCapacityProvider) {
         this.addAsgCapacityProvider(props.asgCapacityProvider);
      }
   }
}
