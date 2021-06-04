import express from 'express';
import CommonRouter from '../Commons/CommonRouter';
import { createProcessDTO, createSuccessResponse } from '../Utils/Router';
import CommonLoader from '../Commons/CommonLoader';
import ProcessDTO from '../Utils/ProcessDTO';

export const CONNECTOR_PREFIX = 'hbpf.connector';

export default class ConnectorRouter extends CommonRouter {
    private loader: CommonLoader;

    constructor(app: express.Application, loader: CommonLoader) {
      super(app, 'ConnectorRouter');
      this.loader = loader;
    }

    configureRoutes(): express.Application {
      this.app.route('/connector/:name/action').post(async (req, res, next) => {
        const connector = this.loader.get(CONNECTOR_PREFIX, req.params.name);
        await connector
          .processAction(createProcessDTO(req))
          .then(
            (dto: ProcessDTO) => {
              createSuccessResponse(res, dto);
              next();
            },
          );
      });

      this.app.route('/connector/:name/action/test').get((req, res) => {
        this.loader.get(CONNECTOR_PREFIX, req.params.name);
        res.json([]);
      });

      this.app.route('/connector/list').get((req, res) => {
        res.json(this.loader.getList(CONNECTOR_PREFIX));
      });

      // TODO: Deprecated
      this.app.route('/connector/:name/webhook').post(async (req, res, next) => {
        const connector = this.loader.get(CONNECTOR_PREFIX, req.params.name);
        await connector
          .processAction(createProcessDTO(req))
          .then((dto: ProcessDTO) => {
            createSuccessResponse(res, dto);
            next();
          });
      });

      // TODO: Deprecated
      this.app.route('/connector/:name/webhook/test').get((req, res) => {
        this.loader.get(CONNECTOR_PREFIX, req.params.name);
        res.json([]);
      });

      return this.app;
    }
}
