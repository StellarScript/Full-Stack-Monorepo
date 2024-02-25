import type { Construct } from 'constructs';
import type { BuildSpec, IBuildImage, ProjectProps } from 'aws-cdk-lib/aws-codebuild';

import { Duration, Stack } from 'aws-cdk-lib';
import { IGrantable } from 'aws-cdk-lib/aws-iam';
import { Project, ComputeType, LinuxBuildImage } from 'aws-cdk-lib/aws-codebuild';

type Grantable = {
   grantRead: (grantable: IGrantable) => void;
};

export interface BuildProjectConstructprops extends Partial<ProjectProps> {
   readonly buildSpec: BuildSpec;
   readonly grantables?: Grantable[];
   readonly environment?: BuildEnvironment;
}

export class BuildEnvironment {
   constructor(
      public computeType: ComputeType = ComputeType.SMALL,
      public buildImage: IBuildImage = LinuxBuildImage.AMAZON_LINUX_2_5
   ) {}
}

export class BuildProjectConstruct extends Project {
   constructor(scope: Construct, id: string, props: BuildProjectConstructprops) {
      const environment = new BuildEnvironment();
      super(scope, id, {
         timeout: Duration.minutes(10),
         environment: {
            computeType: environment.computeType,
            buildImage: environment.buildImage,
         },
         ...props,
         environmentVariables: {
            REGION: { value: Stack.of(scope).region },
            ACCOUNT: { value: Stack.of(scope).account },
            ...props.environmentVariables,
         },
      });

      this.requestPermissions(props.grantables);
   }

   public static env<T>(value: T): { value: string } {
      return { value: String(value) };
   }

   public requestPermissions(grantables: Grantable[]): void {
      grantables?.forEach((grantable) => grantable.grantRead(this));
   }
}
