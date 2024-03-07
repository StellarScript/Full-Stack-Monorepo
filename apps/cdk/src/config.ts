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

export class Ports {
   static Secure = Number(config.app.securePort);
   static Server = Number(config.app.serverPort);
   static Client = Number(config.app.frontendPort);
   static Database = Number(config.database.port);
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
