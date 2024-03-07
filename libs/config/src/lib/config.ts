export const config = {
   app: {
      environment: process.env['ENVIRONMENT'],
      serverPort: process.env['SERVER_PORT'],
      frontendPort: process.env['FRONTEND_PORT'],
      origin: process.env['ORIGIN'],
   },
   database: {
      port: process.env['DATABASE_PORT'],
      password: process.env['DATABASE_PASSWORD'],
      identifier: process.env['DATABASE_IDENTIFIER'],
      url: process.env['DATABASE_URL'],
   },
   cdk: {
      certificateArn: process.env['CERTIFICATE_ARN'],
      hostedZoneId: process.env['HOSTED_ZONE_ID'],
      hostedZoneDomain: process.env['HOSTED_ZONE_DOMAIN'],
      tagIdentifier: process.env['TAG_IDENTIFIER'],
   },

   dopper: {
      token: process.env['DOPPER_ACCESS_TOKEN'],
   },

   clerk: {
      webhookSecret: process.env['CLERK_WEBHOOK_SECRET'],
      clerkJwksUrl: process.env['CLERK_JWKS_URL'],
      clerkJwtKey: process.env['CLERK_JWT_KEY'],
   },

   aws: {
      account: process.env['AWS_ACCOUNT_ID'],
      region: process.env['AWS_DEFAULT_REGION'],
   },
};

export function configuration(): typeof config {
   return config;
}
