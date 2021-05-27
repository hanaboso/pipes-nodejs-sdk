import { listen, container } from './lib/App/app';
import TestConnector from './test/Connector/TestConnector';

const testConnector = new TestConnector();
container.setConnector(testConnector.getName(), testConnector);

listen();
