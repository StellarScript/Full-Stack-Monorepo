export enum ContainerName {
   Server = 'server',
   Client = 'client',
}

export enum ImageTag {
   Latest = 'latest',
   Staging = 'staging',
   Production = 'production',
}

export class Config {
   public static readonly FamilyName: 'appify-service';
   public static readonly MemoryLimitMiB: 512;
   public static readonly Cpu: 256;

   static Ports = {
      Server: 8080,
      Client: 3000,
      Secure: 443,
   };
}
