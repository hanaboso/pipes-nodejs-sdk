import MongoDbClient from '../Client';
import { storageOptions } from '../../../Config/Config';

// Mock Logger module
jest.mock('../../../Logger/Logger', () => ({
  error: () => jest.fn(),
  info: () => jest.fn(),
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Logger: jest.fn().mockImplementation(() => ({})),
}));

describe('Test MongoDb Storage', () => {
  const dbClient = new MongoDbClient(storageOptions.dsn);
  beforeAll(async () => {
    await dbClient.waitOnConnect();
  });

  afterAll(async () => {
    await dbClient.down();
  });

  it('IsConnected', () => {
    expect(dbClient.isConnected()).toBeTruthy();
  }, 200);
});
