/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "*.svg" {
   const content: any;
   export const ReactComponent: any;
   export default content;
}

declare global {
   export type SvgProps = {
      width?: string;
      height?: string;
      strokeColor?: string;
      strokeWidth?: string;
      fillColor?: string;
      rotateCenter?: string;
      className?: string;
   };

   export type Nullable<T> = T | null;
}

export {};
