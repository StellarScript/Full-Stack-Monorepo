import { config } from '@appify/config';
import { isProdEnv } from './utils';

export function originUrl(devPort: string | number): string {
   const { origin } = config.app;
   const originUrl = isProdEnv() ? origin : `${origin}:${devPort}`;

   if (!originUrl) {
      throw new Error('Origin URL is not found in env');
   }

   return originUrl;
}
