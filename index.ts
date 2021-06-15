import { listen, container } from './lib/App/app';
import TestConnector from './test/Connector/TestConnector';
import MongoDbClient from './lib/Storage/Mongodb/Client';
import { storageOptions } from './lib/Config/Config';
import CryptManager from './lib/Crypt/CryptManager';
import WindWalkerCrypt from './lib/Crypt/Impl/WindWalkerCrypt';

const cryptManager = new CryptManager([new WindWalkerCrypt('123')]);
const mongoDbClient = new MongoDbClient(storageOptions.dsn, cryptManager);
container.set('mongo', mongoDbClient);

const testConnector = new TestConnector();
container.setConnector(testConnector.getName(), testConnector);

listen();
