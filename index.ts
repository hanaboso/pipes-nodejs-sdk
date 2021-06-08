import { listen, container } from './lib/App/app';
import TestConnector from './test/Connector/TestConnector';
import MongoDbClient from './lib/Storage/Mongodb/Client';
import { storageOptions } from './lib/Config/Config';

const mongoDbClient = new MongoDbClient(storageOptions.dsn);
container.set('mongo', mongoDbClient);

const testConnector = new TestConnector();
container.setConnector(testConnector.getName(), testConnector);

listen();
