import express from 'express';
import CommonRouter from '../Commons/CommonRouter';
import { createErrorResponse, createProcessDTO, createSuccessResponse } from '../Utils/RouterUtils';
import CommonNodeLoader from '../Commons/CommonNodeLoader';

const CONNECTOR_PREFIX = 'hbpf.connector';

export default class ConnectorRouter extends CommonRouter {
    private loader: CommonNodeLoader;

    constructor(app: express.Application, loader: CommonNodeLoader) {
      super(app, 'ConnectorRouters');
      this.loader = loader;
    }

    configureRoutes(): express.Application {
      this.app.route('/connector/:name/action').post((req, res) => {
        try {
          const connector = this.loader.get(CONNECTOR_PREFIX, req.params.name);
          const dto = connector.processAction(createProcessDTO(req));

          createSuccessResponse(res, dto);
        } catch (e) {
          createErrorResponse(res);
        }
      });

      this.app.route('/connector/:name/action/test').get((req, res) => {
        try {
          this.loader.get(CONNECTOR_PREFIX, req.params.name);

          res.json([]);
        } catch (e) {
          createErrorResponse(res);
        }
      });

      this.app.route('/connectors/list').get((req, res) => {
        try {
          res.json(this.loader.getList(CONNECTOR_PREFIX));
        } catch (e) {
          createErrorResponse(res);
        }
      });

      // TODO: Deprecated
      this.app.route('/connector/:name/webook').post((req, res) => {
        try {
          const connector = this.loader.get(CONNECTOR_PREFIX, req.params.name);
          const dto = connector.processAction(createProcessDTO(req));

          createSuccessResponse(res, dto);
        } catch (e) {
          createErrorResponse(res);
        }
      });

      // TODO: Deprecated
      this.app.route('/connector/:name/webook/test').get((req, res) => {
        try {
          this.loader.get(CONNECTOR_PREFIX, req.params.name);

          res.json([]);
        } catch (e) {
          createErrorResponse(res);
        }
      });

      return this.app;
    }
}
