import { config } from '@appify/config';

/**
 *
 * @param obj
 * @param keys
 * @returns
 */
export function exclude<T, Key extends keyof T>(obj: T, keys: Key[]): Omit<T, Key> {
   for (const key of keys) {
      delete obj[key];
   }
   return obj;
}

/**
 *
 * @param obj
 * @param keys
 * @returns
 */
export function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
   const result: Partial<Pick<T, K>> = {};
   for (const key of keys) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
         result[key] = obj[key];
      }
   }
   return result as Pick<T, K>;
}

/**
 *
 * @description Check if the environment is production
 */
export function isProdEnv(): boolean {
   if (config.app.environment !== 'production') {
      return false;
   }
   return true;
}

/**
 *
 * @param data
 * @returns
 */
export function toArray<T>(data: T | T[]): T[] {
   return Array.isArray(data) ? data : [data];
}
