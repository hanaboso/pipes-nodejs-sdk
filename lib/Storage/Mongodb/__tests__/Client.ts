import MongoDbClient from '../Client';
import { storageOptions } from '../../../Config/Config';
import CryptManager from '../../../Crypt/CryptManager';
import WindWalkerCrypt from '../../../Crypt/Impl/WindWalkerCrypt';

// Mock Logger module
jest.mock('../../../Logger/Logger', () => ({
  error: () => jest.fn(),
  info: () => jest.fn(),
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Logger: jest.fn().mockImplementation(() => ({})),
}));

describe('Test MongoDb Storage', () => {
  const cryptManager = new CryptManager([new WindWalkerCrypt('123')]);
  const dbClient = new MongoDbClient(storageOptions.dsn, cryptManager);

  afterAll(async () => {
    await dbClient.down();
  });

  it('IsConnected', async () => {
    dbClient.reconnect();
    await dbClient.waitOnConnect();
    expect(dbClient.isConnected()).toBeTruthy();
  }, 200);
});
