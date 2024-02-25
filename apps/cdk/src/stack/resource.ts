import type { StackProps } from 'aws-cdk-lib';
import { Stack } from 'aws-cdk-lib';

/**
 *
 * @description Exported parameters for other stacks to use
 */
export enum ExportParamter {
   VPC_ID = 'VpcId-ExportParamter',
   ALB_ARN = 'AlbArn-ExportParamter',
   ALB_SG = 'AlbSG-ExportParamter',
}

interface ResourceStackProps extends StackProps {
   tagIdentifier: string;
   stackIdentifier: string;
}

export class ResourceStack extends Stack {}
