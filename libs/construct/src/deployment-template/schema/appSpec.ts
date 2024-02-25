import * as yaml from 'write-yaml-file';

import { Placeholder } from '../constants';
import { Template, type Config } from './template';
import { ServiceContainerSettings } from '../factory/types';

export class Appspec extends Template {
   public readonly FILE_NAME = 'appspec.yaml';
   private readonly TASK_DEFINITION_ARN_TYPE = 'AWS::ECS::Service';

   public create(config: Config): string {
      this.ensureDirectory();
      const container = this.findEssentialContainer(config);

      if (!container) {
         throw new Error('Essential container not found in config.');
      }

      const content = this.prepareContent(container);
      this._writeTemplate(content);

      return this.outputPath;
   }

   private findEssentialContainer(config: Config) {
      return config.containers?.find((container) => container.essential);
   }

   private prepareContent(container: ServiceContainerSettings) {
      if (!container.portMappings || container.portMappings.length === 0) {
         throw new Error('Port mappings are missing for the essential container.');
      }

      return {
         ContainerPort: container.portMappings[0].containerPort.toString(),
         ContainerName: container.name,
      };
   }

   private _writeTemplate(content: Record<string, string>): void {
      const TargetService = {
         Type: this.TASK_DEFINITION_ARN_TYPE,
         Properties: {
            TaskDefinition: Placeholder.TaskDefArn,
            LoadBalancerInfo: content,
         },
      };
      yaml.sync(this.outputPath, {
         version: 0,
         Resources: [{ TargetService }],
      });
   }
}
