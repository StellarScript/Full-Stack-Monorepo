import * as fs from 'fs';
import * as path from 'path';
import type { ServiceContainerSettings, TaskDefinitionSettings } from '../factory/types';

export type Config = TaskDefinitionSettings & {
   containers: ServiceContainerSettings[];
};

export abstract class Template {
   protected outputPath: string;
   public abstract readonly FILE_NAME: string;
   public abstract create<T extends Config>(content: T): string;

   constructor(outputPath?: string) {
      this.outputPath = outputPath;
   }

   protected ensureDirectory(): void {
      this.outputPath = path.join(this.outputPath, this.FILE_NAME);
      const directory = path.dirname(this.outputPath);

      if (!fs.existsSync(directory)) {
         fs.mkdirSync(directory);
      }
   }

   protected writeTemplate<T>(content: T): void {
      const template = JSON.stringify(content, null, 2);
      fs.writeFileSync(this.outputPath, template, 'utf8');
   }
}
