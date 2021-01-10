import express from 'express';
import DIContainer from '../DIContainer/Container';
import CommonNodeLoader from '../Commons/CommonNodeLoader';
import ConnectorRouter from '../Connector/ConnectorRouter';
import CommonRouter from '../Commons/CommonRouter';
import logger from '../Logger/Logger';
import CustomNodeRouter from '../CustomNode/CustomNodeRouter';
import { appOptions } from '../Config/Config';

export const routes: Array<CommonRouter> = [];

const sdk: express.Application = express();
const container = new DIContainer();
const loader = new CommonNodeLoader(container);
routes.push(new ConnectorRouter(sdk, loader));
routes.push(new CustomNodeRouter(sdk, loader));

export function listen(): void {
  sdk.disable('x-powered-by');
  sdk.listen(appOptions.port, () => {
    logger.info(`⚡️[server]: Server is running at http://localhost:${appOptions.port}`);
    routes.forEach((router) => {
      logger.info(`⚡️[server]: Router '${router.getName()}' loaded.`);
    });
  });
}

export { sdk, container };
