import 'reflect-metadata';

import * as path from 'path';
import { container, singleton } from 'tsyringe';
import { pick } from '@appify/utils';

import type { ServiceContainerSettings, TaskDefinitionSettings } from './types';
import type { ServiceContainerConfig, TaskDefinitionConfig } from '../decorators';

import { Arn } from '../../arn';
import { Appspec, TaskDefSpec, ImageDef } from '../schema';
import { CompatibilityMap, Placeholder, TemplateType } from '../constants';

@singleton()
export class DeploymentTemplateGenerator {
   private taskDefinitionSettings?: TaskDefinitionSettings;
   private containerServiceSettings: ServiceContainerSettings[] = [];
   private readonly outputPath: string = path.join('cdk.out', 'templates');

   private get schema() {
      return Object.assign({}, this.taskDefinitionSettings, {
         containers: this.containerServiceSettings,
      });
   }

   public createTemplate(type: TemplateType): string {
      switch (type) {
         case TemplateType.APP_SPEC:
            const appSpecTemplate = new Appspec(this.outputPath);
            return appSpecTemplate.create(this.schema);

         case TemplateType.TASK_DEF:
            const taskDefTemplate = new TaskDefSpec(this.outputPath);
            return taskDefTemplate.create(this.schema);

         case TemplateType.IMAGE_DEF:
            const imageDefTemplate = new ImageDef(this.outputPath);
            return imageDefTemplate.create(this.schema);
         default:
            throw new Error('Invalid template type');
      }
   }

   public static setTaskDefinition(config: TaskDefinitionConfig): void {
      const template = container.resolve(DeploymentTemplateGenerator);
      template.taskDefinitionSettings = {
         ...pick(config, ['family', 'cpu', 'memory', 'networkMode']),
         requiresCompatibilities: [CompatibilityMap[config.compatibility]],
         executionRoleArn: Arn.Role(Placeholder.Account, config.executionRoleName),
      };
   }

   public static addContainerDefinition(config: ServiceContainerConfig): void {
      const template = container.resolve(DeploymentTemplateGenerator);
      const imageName = config.imageName.split('/')[1];
      template.containerServiceSettings.push({
         ...pick(config, ['portMappings', 'essential']),
         image: Arn.ImageEcr(Placeholder.Region, Placeholder.Account, imageName),
         name: config.containerName,
      });
   }
}
