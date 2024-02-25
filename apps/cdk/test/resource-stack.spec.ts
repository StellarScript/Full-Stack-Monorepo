import { beforeAll, describe, expect, it } from 'vitest';

import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { ResourceStack } from '../src/stack/resource';

describe('Resource Stack', () => {
   let stack: Stack;

   beforeAll(() => {
      const app = new App();
      stack = new ResourceStack(app, 'resource');
   });

   describe('Resource Stack Resources', () => {
      it('test ', () => {
         template = Template.fromStack(stack);
         expect(template).toBeDefined();
      });
   });
});
