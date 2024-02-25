import 'reflect-metadata';

import type { Construct } from 'constructs';
import { Asset } from 'aws-cdk-lib/aws-s3-assets';
import { container } from 'tsyringe';

import { TemplateType } from './constants';
import { DeploymentTemplateGenerator } from './factory/template';

export class Template extends Asset {
   constructor(scope: Construct, id: string, type: TemplateType) {
      const schema = container.resolve(DeploymentTemplateGenerator);
      const outputPath = schema.createTemplate(type);

      super(scope, id, { path: outputPath });
   }
}
