import express from 'express';
import CommonRouter from '../Commons/CommonRouter';
import { createErrorResponse, createProcessDTO, createSuccessResponse } from '../Utils/Router';
import CommonNodeLoader from '../Commons/CommonNodeLoader';
import ProcessDTO from '../Utils/ProcessDTO';

export const CONNECTOR_PREFIX = 'hbpf.connector';

export default class ConnectorRouter extends CommonRouter {
    private loader: CommonNodeLoader;

    constructor(app: express.Application, loader: CommonNodeLoader) {
      super(app, 'ConnectorRouters');
      this.loader = loader;
    }

    configureRoutes(): express.Application {
      this.app.route('/connector/:name/action').post((req, res, next) => {
        try {
          const connector = this.loader.get(CONNECTOR_PREFIX, req.params.name);
          connector
            .processAction(createProcessDTO(req))
            .then((dto: ProcessDTO) => {
              createSuccessResponse(res, dto);
              next();
            });
        } catch (e) {
          createErrorResponse(req, res, e);
        }
      });

      this.app.route('/connector/:name/action/test').get((req, res) => {
        try {
          this.loader.get(CONNECTOR_PREFIX, req.params.name);

          res.json([]);
        } catch (e) {
          createErrorResponse(req, res, e);
        }
      });

      this.app.route('/connector/list').get((req, res) => {
        try {
          res.json(this.loader.getList(CONNECTOR_PREFIX));
        } catch (e) {
          createErrorResponse(req, res, e);
        }
      });

      // TODO: Deprecated
      this.app.route('/connector/:name/webook').post((req, res, next) => {
        try {
          const connector = this.loader.get(CONNECTOR_PREFIX, req.params.name);
          connector
            .processAction(createProcessDTO(req))
            .then((dto: ProcessDTO) => {
              createSuccessResponse(res, dto);
              next();
            });
        } catch (e) {
          createErrorResponse(req, res, e);
        }
      });

      // TODO: Deprecated
      this.app.route('/connector/:name/webook/test').get((req, res) => {
        try {
          this.loader.get(CONNECTOR_PREFIX, req.params.name);

          res.json([]);
        } catch (e) {
          createErrorResponse(req, res, e);
        }
      });

      return this.app;
    }
}
