import type { Construct } from 'constructs';
import type { FargateTaskDefinitionProps as TaskDefinitionProps } from 'aws-cdk-lib/aws-ecs';
import { PolicyStatement, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { FargateTaskDefinition as TaskDefinition } from 'aws-cdk-lib/aws-ecs';
import { registerTaskDefinitionDecorator } from './deployment-template/decorators';

interface FargateTaskDefinitionProps extends Partial<TaskDefinitionProps> {
   readonly family: string;
}

@registerTaskDefinitionDecorator()
export class FargateTaskDefinition extends TaskDefinition {
   constructor(scope: Construct, id: string, props: FargateTaskDefinitionProps) {
      super(scope, id, {
         family: props.family,

         taskRole: new Role(scope, 'TaskRole', {
            assumedBy: new ServicePrincipal('ecs-tasks.amazonaws.com'),
         }),

         executionRole: new Role(scope, 'TaskExecRole', {
            assumedBy: new ServicePrincipal('ecs-tasks.amazonaws.com'),
         }),
      });

      this.taskRole.addToPrincipalPolicy(
         new PolicyStatement({
            actions: ['logs:*', 'cloudwatch:*'],
            resources: [this.taskDefinitionArn],
         })
      );

      this.executionRole.addToPrincipalPolicy(
         new PolicyStatement({
            actions: ['logs:*', 'cloudwatch:*'],
            resources: [this.taskDefinitionArn],
         })
      );
   }
}
