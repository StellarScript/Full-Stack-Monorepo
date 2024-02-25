import { beforeAll, describe, expect, it } from 'vitest';

import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { ResourceStack } from '../src/stack/resource';

describe('Resource Stack', () => {
   let template: Template;

   beforeAll(() => {
      const app = new App();
      const stack = new ResourceStack(app, 'ResourceStack');
      template = Template.fromStack(stack);
   });

   describe('Resource Stack Resources', () => {
      it('test ', () => {
         expect(template).toBeDefined();
      });
   });
});
