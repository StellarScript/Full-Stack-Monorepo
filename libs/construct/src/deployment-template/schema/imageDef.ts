import type { Config } from './template';
import { Template } from './template';

export class ImageDef extends Template {
   public readonly FILE_NAME = 'image-def.json';

   public create(config: Config): string {
      this.ensureDirectory();

      const template = this.constructTemplate(config);

      this.writeTemplate(template);
      return this.outputPath;
   }

   private constructTemplate(config: Config): Record<string, any>[] {
      if (!config.containers || config.containers.length === 0) {
         throw new Error('No containers found in configuration.');
      }

      return config.containers.map((container) => ({
         name: container.name,
         imageUri: container.image,
      }));
   }
}
