export const config = {
   app: {
      environment: process.env['ENVIRONMENT'],
      serverPort: process.env['SERVER_PORT'],
      frontendPort: process.env['FRONTEND_PORT'],
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

   aws: {
      account: process.env['AWS_ACCOUNT_ID'],
      region: process.env['AWS_DEFAULT_REGION'],
   },
};

export function configuration(): typeof config {
   return config;
}
