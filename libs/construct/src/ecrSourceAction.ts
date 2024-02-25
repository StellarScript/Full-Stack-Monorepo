import type { Construct } from 'constructs';
import type { Artifact } from 'aws-cdk-lib/aws-codepipeline';

import { EcrSourceAction } from 'aws-cdk-lib/aws-codepipeline-actions';
import { Repository } from 'aws-cdk-lib/aws-ecr';

export class EcrSourceActionConstruct extends EcrSourceAction {
   constructor(scope: Construct, name: string, artifact: Artifact, imageTag: string) {
      const repository = Repository.fromRepositoryName(scope, `${name}-ecrRepo`, name);

      super({
         actionName: `${name}Source`,
         repository,
         output: artifact,
         imageTag: imageTag,
      });
   }
}
