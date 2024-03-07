import { config } from '@appify/config';

export enum ContainerName {
   Server = 'server',
   Client = 'client',
}

export enum ImageTag {
   Latest = 'latest',
   Staging = 'staging',
   Production = 'production',
}

export enum ExportParamter {
   VPC_ID = 'VpcId-ExportParamter',
   ALB_SG = 'AlbSG-ExportParamter',
   ALB_ARN = 'AlbArn-ExportParamter',
   RDS_SECRET = 'RdsSecret-ExportParamter',
}

export enum StackIdentifier {
   ResourceStack = 'resource',
   ServiceStack = 'service',
   DatabaseStack = 'database',
}

export enum Ports {
   Server = 8080,
   Client = 3000,
   Secure = 443,
   Database = 5432,
}

export class ServiceConfig {
   public static readonly FamilyName: 'appify-service';
   public static readonly MemoryLimitMiB: 512;
   public static readonly Cpu: 256;
}

export class DatabaseConfig {
   static identifier = config.database.identifier;
   static password = config.database.password;
}
