export const config = {
   cdk: {
      certificateArn: process.env['CERTIFICATE_ARN'],
      hostedZoneId: process.env['HOSTED_ZONE_ID'],
      hostedZoneDomain: process.env['HOSTED_ZONE_DOMAIN'],
   },

   dopper: {
      token: process.env['DOPPER_ACCESS_TOKEN'],
   },
};

export function configuration(): typeof config {
   return config;
}
