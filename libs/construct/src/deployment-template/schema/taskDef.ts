import { Config, Template } from './template';

export class TaskDefSpec extends Template {
   public readonly FILE_NAME = 'taskdef.json';

   public create(config: Config): string {
      this.ensureDirectory();

      this.writeTemplate({
         cpu: config.cpu,
         family: config.family,
         memory: config.memory,
         networkMode: config.networkMode,
         containerDefinitions: config.containers,
         executionRoleArn: config.executionRoleArn,
         requiresCompatibilities: config.requiresCompatibilities,
      });

      return this.outputPath;
   }
}
