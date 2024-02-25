export const config = {
   cdk: {
      hostedZoneId: process.env['HOSTED_ZONE_ID'],
      hostedZoneDomain: process.env['HOSTED_ZONE_DOMAIN'],
   },
};

export function configuration(): typeof config {
   return config;
}
