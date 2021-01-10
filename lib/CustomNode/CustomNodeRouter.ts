import express from 'express';
import CommonRouter from '../Commons/CommonRouter';
import CommonNodeLoader from '../Commons/CommonNodeLoader';
import { createErrorResponse, createProcessDTO, createSuccessResponse } from '../Utils/Router';
import ProcessDTO from '../Utils/ProcessDTO';

export const CUSTOM_NODE_PREFIX = 'hbpf.connector';

export default class CustomNodeRouter extends CommonRouter {
  private loader: CommonNodeLoader;

  constructor(app: express.Application, loader: CommonNodeLoader) {
    super(app, 'CustomNodeRouter');
    this.loader = loader;
  }

  configureRoutes(): express.Application {
    this.app.route('/custom_node/:name/process').post(((req, res, next) => {
      try {
        const customNode = this.loader.get(CUSTOM_NODE_PREFIX, req.params.name);
        customNode
          .processAction(createProcessDTO(req))
          .then((dto: ProcessDTO) => {
            createSuccessResponse(res, dto);
            next();
          });
      } catch (e) {
        createErrorResponse(req, res, e);
      }
    }));

    this.app.route('/custom_node/:name/process/test').get((req, res) => {
      try {
        this.loader.get(CUSTOM_NODE_PREFIX, req.params.name);

        res.json([]);
      } catch (e) {
        createErrorResponse(req, res, e);
      }
    });

    this.app.route('/custom_node/list').get((req, res) => {
      try {
        res.json(this.loader.getList(CUSTOM_NODE_PREFIX));
      } catch (e) {
        createErrorResponse(req, res, e);
      }
    });

    return this.app;
  }
}
