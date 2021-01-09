import express from 'express';
import DIContainer from '../DIContainer/Container';
import CommonNodeLoader from '../Commons/CommonNodeLoader';
import ConnectorRouter from '../Connector/ConnectorRouter';
import CommonRouter from '../Commons/CommonRouter';
import logger from '../Logger/Winston';
import CustomNodeRouter from '../CustomNode/CustomNodeRouter';

export const routes: Array<CommonRouter> = [];

const sdk: express.Application = express();
const container = new DIContainer();
const loader = new CommonNodeLoader(container);
routes.push(new ConnectorRouter(sdk, loader));
routes.push(new CustomNodeRouter(sdk, loader));

export function start(port: number): void {
  sdk.listen(port, () => {
    logger.info(`⚡️[server]: Server is running at http://localhost:${port}`);
    routes.forEach((router) => {
      logger.info(`⚡️[server]: Router '${router.getName()}' loaded.`);
    });
  });
}

export { sdk, container };
