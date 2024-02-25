import type { Compatibility, PortMapping } from 'aws-cdk-lib/aws-ecs';

export type TaskDefinitionConfig = {
   cpu: string;
   memory: string;
   family: string;
   networkMode: string;
   region: string;
   account: string;
   executionRoleName: string;
   compatibility: Compatibility;
};

export type ServiceContainerConfig = {
   cpu?: number;
   memory?: number;
   containerName: string;
   imageName: string;
   essential: boolean;
   portMappings: PortMapping[];
};
