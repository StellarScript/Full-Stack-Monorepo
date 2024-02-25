import type { Construct } from 'constructs';
import { Tag } from 'aws-cdk-lib';

export class Tags {
   public static tagStack(scope: Construct, tags: Record<string, string>[]): void {
      for (const tag of tags) {
         for (const [key, value] of Object.entries(tag)) {
            new Tag(key, value).visit(scope);
         }
      }
   }
}
