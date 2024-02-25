import { PortMapping } from 'aws-cdk-lib/aws-ecs';

export type TaskDefinitionSettings = {
   family: string;
   cpu: string;
   memory: string;
   networkMode: string;
   executionRoleArn: string;
   requiresCompatibilities: string[];
};

export type ServiceContainerSettings = {
   name: string;
   image: string;
   essential: boolean;
   portMappings: PortMapping[];
};
