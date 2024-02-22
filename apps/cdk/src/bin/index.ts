#!/usr/bin/env node
import 'source-map-support/register';

import { App } from 'aws-cdk-lib';
import { ProdStage } from '../stage/prod';

const app = new App();
new ProdStage(app, 'prod');
