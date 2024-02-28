declare global {
   export type HotModule = {
      accept: () => void;
      dispose: (arg0: () => void) => void;
   };
}

export {};
