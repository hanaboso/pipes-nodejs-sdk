import express from 'express';
import DIContainer from '../DIContainer/Container';
import CommonLoader from '../Commons/CommonLoader';
import ConnectorRouter from '../Connector/ConnectorRouter';
import CommonRouter from '../Commons/CommonRouter';
import logger from '../Logger/Logger';
import CustomNodeRouter from '../CustomNode/CustomNodeRouter';
import { appOptions } from '../Config/Config';
import errorHandler from '../Middleware/ErrorHandler';
import metricsHandler from '../Middleware/MetricsHandler';

export const routes: CommonRouter[] = [];

const sdk: express.Application = express();

sdk.use(metricsHandler);
const container = new DIContainer();
const loader = new CommonLoader(container);
routes.push(new ConnectorRouter(sdk, loader));
routes.push(new CustomNodeRouter(sdk, loader));

export function listen(): void {
  sdk.disable('x-powered-by');
  sdk.use(errorHandler);
  sdk.listen(appOptions.port, () => {
    logger.info(`⚡️[server]: Server is running at http://localhost:${appOptions.port}`);
    routes.forEach((router) => {
      logger.info(`⚡️[server]: Router '${router.getName()}' loaded.`);
    });
  });
}

export { sdk, container };
