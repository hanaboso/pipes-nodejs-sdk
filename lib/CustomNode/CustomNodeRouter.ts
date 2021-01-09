import express from 'express';
import CommonRouter from '../Commons/CommonRouter';
import CommonNodeLoader from '../Commons/CommonNodeLoader';
import { createErrorResponse, createProcessDTO, createSuccessResponse } from '../Utils/RouterUtils';

const CUSTOM_NODE_PREFIX = 'hbpf.connector';

export default class CustomNodeRouter extends CommonRouter {
  private loader: CommonNodeLoader;

  constructor(app: express.Application, loader: CommonNodeLoader) {
    super(app, 'CustomNodeRouter');
    this.loader = loader;
  }

  configureRoutes(): express.Application {
    this.app.route('/custom_node/:name/process').post(((req, res) => {
      try {
        const customNode = this.loader.get(CUSTOM_NODE_PREFIX, req.params.name);
        const dto = customNode.processAction(createProcessDTO(req));

        createSuccessResponse(res, dto);
      } catch (e) {
        createErrorResponse(res);
      }
    }));

    this.app.route('/custom_node/:name/process/test').get((req, res) => {
      try {
        this.loader.get(CUSTOM_NODE_PREFIX, req.params.name);

        res.json([]);
      } catch (e) {
        createErrorResponse(res);
      }
    });

    this.app.route('/custom_node/list').get((req, res) => {
      try {
        res.json(this.loader.getList(CUSTOM_NODE_PREFIX));
      } catch (e) {
        createErrorResponse(res);
      }
    });

    return this.app;
  }
}
