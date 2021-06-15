import express from 'express';
import CommonRouter from '../Commons/CommonRouter';
import CommonLoader from '../Commons/CommonLoader';

export const APPLICATION_PREFIX = 'hbpf.application';

export class ApplicationRouter extends CommonRouter {
  constructor(app: express.Application, private _loader: CommonLoader) {
    super(app, 'ApplicationRouter');
  }

  configureRoutes(): express.Application {
    return this.app;
  }
}
