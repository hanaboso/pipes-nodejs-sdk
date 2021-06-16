import TestConnector from './Connector/TestConnector';
import { container, listen } from '../lib';

const testConnector = new TestConnector();
container.setConnector(testConnector.getName(), testConnector);

listen();
