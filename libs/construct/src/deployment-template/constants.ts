export enum TemplateType {
   TASK_DEF = 'taskdef',
   APP_SPEC = 'appspec',
   IMAGE_DEF = 'imageDetails',
}

export enum Placeholder {
   Account = 'ACCOUNT',
   Region = 'REGION',
   TaskDefArn = 'TASK_DEFINITION_ARN',
}

export const CompatibilityMap = {
   '0': 'EC2',
   '1': 'FARGATE',
   '2': 'EC2_AND_FARGATE',
   '3': 'EXTERNAL',
};
