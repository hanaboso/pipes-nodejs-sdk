import express, { Request, Response } from 'express';
import CommonRouter from '../Commons/CommonRouter';
import CommonNodeLoader from '../Commons/CommonNodeLoader';
import { createProcessDTO, createSuccessResponse } from '../Utils/Router';
import ProcessDTO from '../Utils/ProcessDTO';

export const CUSTOM_NODE_PREFIX = 'hbpf.connector';

export default class CustomNodeRouter extends CommonRouter {
  constructor(app: express.Application, private loader: CommonNodeLoader) {
    super(app, 'CustomNodeRouter');
  }

  configureRoutes(): express.Application {
    this.app.route('/custom_node/:name/process').post((req, res, next) => {
      const customNode = this.loader.get(CUSTOM_NODE_PREFIX, req.params.name);
      customNode
        .processAction(createProcessDTO(req))
        .then((dto: ProcessDTO) => {
          createSuccessResponse(res, dto);
          next();
        });
    });

    this.app.route('/custom_node/:name/process/test').get((req, res) => {
      this.loader.get(CUSTOM_NODE_PREFIX, req.params.name);
      res.json([]);
    });

    this.app.route('/custom_node/list').get((req: Request, res: Response) => {
      res.json(this.loader.getList(CUSTOM_NODE_PREFIX));
    });

    return this.app;
  }
}
