import type { Construct } from 'constructs';
import type { FargateService } from 'aws-cdk-lib/aws-ecs';
import type { IEcsDeploymentConfig } from 'aws-cdk-lib/aws-codedeploy';
import type {
   ApplicationListener,
   ApplicationTargetGroup,
} from 'aws-cdk-lib/aws-elasticloadbalancingv2';

import { Stack } from 'aws-cdk-lib';
import { BuildSpec } from 'aws-cdk-lib/aws-codebuild';
import { Artifact, Pipeline } from 'aws-cdk-lib/aws-codepipeline';
import { EcsDeploymentConfig, EcsDeploymentGroup } from 'aws-cdk-lib/aws-codedeploy';
import { CodeBuildAction, CodeDeployEcsDeployAction } from 'aws-cdk-lib/aws-codepipeline-actions';

import { BuildProjectConstruct } from '@appify/construct/buildProject';
import { EcrSourceActionConstruct } from '@appify/construct/ecrSourceAction';
import { Template, TemplateType } from '@appify/construct/deployment-template/index';
import { ContainerName, ImageTag } from '../config';

export interface EcsDeploymentPipelineProps {
   readonly fargateService: FargateService;
   readonly listener: ApplicationListener;
   readonly blueTargetGroup: ApplicationTargetGroup;
   readonly greenTargetGroup: ApplicationTargetGroup;
}

export class PipelineStack extends Stack {
   constructor(scope: Construct, id: string, props: EcsDeploymentPipelineProps) {
      super(scope, id);

      const { clientSource, serverSource, buildArtifact } = this.createArtifacts();
      const { taskDefAsset, appSpecAsset, imageDefAsset } = this.createTemplates();

      const { clientSourceAction, serverSourceAction } = this.createSourceActions(
         clientSource,
         serverSource,
      );

      const buildAction = this.createBuildProject(props.fargateService, buildArtifact, [
         taskDefAsset,
         appSpecAsset,
         imageDefAsset,
      ]);

      const deploymentConfig = EcsDeploymentConfig.ALL_AT_ONCE;
      const deployAction = this.createDeployAction(buildArtifact, deploymentConfig, props);

      new Pipeline(this, 'deployment-pipeline', {
         pipelineName: 'EcsDeploymentPipeline',
         stages: [
            {
               stageName: 'Source',
               actions: [clientSourceAction, serverSourceAction],
            },
            {
               stageName: 'Build',
               actions: [buildAction],
            },
            {
               stageName: 'Deploy',
               actions: [deployAction],
            },
         ],
      });
   }

   private createArtifacts() {
      const clientSource = new Artifact('ClientSource');
      const serverSource = new Artifact('ServerSource');
      const buildArtifact = new Artifact('BuildArtifact');
      return { clientSource, serverSource, buildArtifact };
   }

   private createTemplates() {
      const taskDefAsset = new Template(this, 'taskdef-asset', TemplateType.TASK_DEF);
      const appSpecAsset = new Template(this, 'appspec-asset', TemplateType.APP_SPEC);
      const imageDefAsset = new Template(this, 'image-asset', TemplateType.IMAGE_DEF);
      return { taskDefAsset, appSpecAsset, imageDefAsset };
   }

   private createSourceActions(clientSource: Artifact, serverSource: Artifact) {
      const clientSourceAction = new EcrSourceActionConstruct(
         this,
         ContainerName.Client,
         clientSource,
         ImageTag.Latest,
      );
      const serverSourceAction = new EcrSourceActionConstruct(
         this,
         ContainerName.Server,
         serverSource,
         ImageTag.Latest,
      );
      return { clientSourceAction, serverSourceAction };
   }

   private createDeployAction(
      buildArtifact: Artifact,
      config: IEcsDeploymentConfig,
      props: EcsDeploymentPipelineProps,
   ) {
      const deploymentGroup = new EcsDeploymentGroup(this, 'CodeDeployGroup', {
         deploymentConfig: config,
         service: props.fargateService,
         blueGreenDeploymentConfig: {
            listener: props.listener,
            blueTargetGroup: props.blueTargetGroup,
            greenTargetGroup: props.greenTargetGroup,
         },
      });
      return new CodeDeployEcsDeployAction({
         actionName: 'EcsDeployment',
         deploymentGroup: deploymentGroup,
         appSpecTemplateInput: buildArtifact,
         taskDefinitionTemplateInput: buildArtifact,
      });
   }

   private createBuildProject(service: FargateService, buildArtifact: Artifact, templates: Template[]) {
      const [taskDefAsset, appSpecAsset, imageDefAsset] = templates;
      const buildProject = new BuildProjectConstruct(this, 'BuildProject', {
         buildSpec: buildSpec(),
         environmentVariables: {
            TASK_DEF_TEMPLATE: BuildProjectConstruct.env(taskDefAsset.s3ObjectUrl),
            APP_SPEC_TEMPLATE: BuildProjectConstruct.env(appSpecAsset.s3ObjectUrl),
            IMAGE_DETAILS_TEMPLATE: BuildProjectConstruct.env(imageDefAsset.s3ObjectUrl),
            TASK_DEFINITION_ARN: BuildProjectConstruct.env(service.taskDefinition.taskDefinitionArn),
         },
      });
      taskDefAsset.grantRead(buildProject);
      appSpecAsset.grantRead(buildProject);
      imageDefAsset.grantRead(buildProject);
      return new CodeBuildAction({
         actionName: 'Build',
         project: buildProject,
         outputs: [buildArtifact],
         input: new Artifact('ClientSource'),
      });
   }
}

export function buildSpec(): BuildSpec {
   return BuildSpec.fromObject({
      version: '0.2',
      phases: {
         build: {
            commands: [
               'aws s3 cp $TASK_DEF_TEMPLATE ./taskdef.json',
               'aws s3 cp $APP_SPEC_TEMPLATE ./appspec.yaml',
               'aws s3 cp $IMAGE_DETAILS_TEMPLATE ./imagedetails.json',
            ],
         },
         post_build: {
            commands: [
               'sed -i "s|IMAGE_TAG|${IMAGE_TAG}|g" taskdef.json',
               'sed -i "s|REPOSITORY_URI|${REPOSITORY_URI}|g" taskdef.json',
               'sed -i "s|TASK_DEFINITION_ARN|${TASK_DEFINITION_ARN}|g" appspec.yaml',

               'sed -i "s|ACCOUNT|${ACCOUNT}|g" taskdef.json',
               'sed -i "s|REGION|${REGION}|g" taskdef.json',
               'sed -i "s|ACCOUNT|${ACCOUNT}|g" imagedetails.json',
               'sed -i "s|REGION|${REGION}|g" imagedetails.json',

               'cp appspec.yaml ../',
               'cp taskdef.json ../',
               'cp imagedetails.json ../',
            ],
         },
      },
      artifacts: {
         files: ['taskdef.json', 'appspec.yaml', 'imagedetails.json'],
      },
   });
}
