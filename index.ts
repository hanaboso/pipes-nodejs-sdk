import { listen, container } from './lib/App/app';
import TestConnector from './test/Connector/TestConnector';
import { CONNECTOR_PREFIX } from './lib/Connector/ConnectorRouter';

const testConnector = new TestConnector();
container.set(`${CONNECTOR_PREFIX}.${testConnector.getName()}`, testConnector);

listen();
