// TODO: Add validation
export class DatabaseCapacity {
   public minCapacity: number;
   public maxCapacity: number;

   constructor(options: { minCapacity: number; maxCapacity: number }) {
      this.minCapacity = options.minCapacity;
      this.maxCapacity = options.maxCapacity;
   }
}
