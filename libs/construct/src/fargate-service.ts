import type { Construct } from 'constructs';
import type { SecurityGroup } from 'aws-cdk-lib/aws-ec2';
import type { Cluster, FargateServiceProps, FargateTaskDefinition } from 'aws-cdk-lib/aws-ecs';

import {
   PropagatedTagSource,
   DeploymentControllerType,
   FargateService as FargateConstruct,
} from 'aws-cdk-lib/aws-ecs';
import { SubnetType } from 'aws-cdk-lib/aws-ec2';

interface FargateProps extends Partial<FargateServiceProps> {
   readonly taskDefinition: FargateTaskDefinition;
   readonly securityGroups: SecurityGroup[];
   readonly cluster: Cluster;
}

export class FargateService extends FargateConstruct {
   constructor(scope: Construct, id: string, props: FargateProps) {
      super(scope, id, {
         propagateTags: PropagatedTagSource.TASK_DEFINITION,
         vpcSubnets: { subnetType: SubnetType.PRIVATE_WITH_EGRESS },
         deploymentController: { type: DeploymentControllerType.CODE_DEPLOY },
         ...props,
      });
   }
}
