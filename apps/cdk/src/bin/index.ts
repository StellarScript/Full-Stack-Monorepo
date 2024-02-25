#!/usr/bin/env node
import 'source-map-support/register';

import { App } from 'aws-cdk-lib';
import { config } from '@appify/config';
import { ProdStage } from '../stage/prod';

const props = {
   env: {
      region: config.aws.region,
      account: config.aws.account,
      tagIdentifier: config.cdk.tagIdentifier,
   },
   tagIdentifier: config.cdk.tagIdentifier,
};

const app = new App();
new ProdStage(app, 'prod', props);
