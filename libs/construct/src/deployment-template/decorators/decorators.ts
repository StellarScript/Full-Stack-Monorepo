import type { TaskDefinition } from 'aws-cdk-lib/aws-ecs';
import type { ServiceContainer } from '../../container';
import type { ServiceContainerConfig, TaskDefinitionConfig } from './types';
import { DeploymentTemplateGenerator } from '../factory/template';

export function registerTaskDefinitionDecorator() {
   return function <T extends new (...args: any[]) => TaskDefinition>(Constructor: T) {
      return class extends Constructor {
         constructor(...args: any[]) {
            super(...args);

            const config: TaskDefinitionConfig = {
               cpu: this['_cpu'],
               memory: this['_memory'],
               family: this.family,
               networkMode: this.networkMode,
               compatibility: this.compatibility,
               region: this.stack.region,
               account: this.stack.account,
               executionRoleName: this.executionRole?.['physicalName'],
            };

            DeploymentTemplateGenerator.setTaskDefinition(config);
         }
      };
   };
}

export function registerContainerConfigurationDecorator() {
   return function <T extends new (...args: any[]) => ServiceContainer>(Constructor: T) {
      return class extends Constructor {
         constructor(...args: any[]) {
            super(...args);

            const config: ServiceContainerConfig = {
               cpu: this.container.cpu,
               essential: this.container.essential,
               containerName: this.container.containerName,
               portMappings: this.container.portMappings,
               imageName: this.container.imageName,
            };

            DeploymentTemplateGenerator.addContainerDefinition(config);
         }
      };
   };
}
