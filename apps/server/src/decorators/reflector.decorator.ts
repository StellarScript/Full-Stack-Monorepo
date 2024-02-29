/* eslint-disable @typescript-eslint/no-explicit-any */
export type Descriptor<T = any> = T | void;
export type Target<T = any> = T;

export class Reflector {
   constructor(
      private target: Target,
      private descriptor?: Descriptor,
   ) {}

   public define<T>(metadataKey: string, data: T): Target | Descriptor<T> {
      if (this.descriptor) {
         Reflect.defineMetadata(metadataKey, data, this.descriptor.value);
         return this.descriptor;
      }
      Reflect.defineMetadata(metadataKey, data, this.target);
      return this.target;
   }
}
