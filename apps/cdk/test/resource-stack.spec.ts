import { beforeAll, describe, expect, it } from 'vitest';

import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { ResourceStack } from '../src/stack/resource';

describe('Resource Stack', () => {
   let stack: ResourceStack;

   beforeAll(() => {
      const app = new App();
      stack = new ResourceStack(app, 'resource');
   });

   describe('Resource Stack Resources', () => {
      it('test ', () => {
         const template = Template.fromStack(stack.vpc);
         expect(template).toBeDefined();
      });
   });
});
