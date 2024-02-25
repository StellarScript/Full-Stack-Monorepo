import { beforeAll, describe, expect, it } from 'vitest';
import { Template, Match } from 'aws-cdk-lib/assertions';
import { expect as expectCdk, objectLike } from '@aws-cdk/assert';
import { App } from 'aws-cdk-lib';

import { MockStackProps } from './mocks';
import { ResourceStack } from '../src/stack/resource';

describe('Resource Stack', () => {
   let template: Template;
   let stack: ResourceStack;

   beforeAll(() => {
      const app = new App();
      stack = new ResourceStack(app, 'resource', MockStackProps);
      template = Template.fromStack(stack);
   });

   describe('Resource Stack Resources', () => {
      it('vpc ', () => {
         template.hasResourceProperties('AWS::EC2::VPC', {
            CidrBlock: '10.0.0.0/16',
         });
      });

      it('alb', () => {
         template.hasResourceProperties('AWS::ElasticLoadBalancingV2::LoadBalancer', {
            Type: 'application',
            Scheme: 'internet-facing',
         });
      });
   });
});
