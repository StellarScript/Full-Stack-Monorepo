import { beforeAll, describe, expect, it } from 'vitest';

import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { ServiceStack } from '../src/stack/service';

describe('Service Stack', () => {
   let template: Template;

   beforeAll(() => {
      // const app = new App();
      // const stack = new ServiceStack(app, 'ServiceStack');
      // template = Template.fromStack(stack);
   });

   describe('Service Stack Resources', () => {
      it('test ', () => {
         expect(1).toBe(1);
      });
   });
});
