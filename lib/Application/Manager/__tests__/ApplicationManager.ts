import { Request } from 'express';
import ApplicationManager from '../ApplicationManager';
import MongoDbClient from '../../../Storage/Mongodb/Client';
import { storageOptions } from '../../../Config/Config';
import DIContainer from '../../../DIContainer/Container';
import CommonLoader from '../../../Commons/CommonLoader';
import TestBasicApplication from '../../../../test/Application/TestBasicApplication';
import { ApplicationInstall } from '../../Database/ApplicationInstall';

let appManager: ApplicationManager;
let dbClient: MongoDbClient;
let appInstall: ApplicationInstall;

// Mock Logger module
jest.mock('../../../Logger/Logger', () => ({
  error: () => jest.fn(),
  debug: () => jest.fn(),
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Logger: jest.fn().mockImplementation(() => ({})),
}));

describe('ApplicationManager tests', () => {
  // Mock Request/Response of Express
  const mockedRequest = () => ({
    headers: { 'pf-node-id': '123' },
    body: '{"body": "aaa"}',
  });

  function mockRequest(): Request {
    return mockedRequest() as unknown as Request;
  }

  beforeEach(async () => {
    dbClient = new MongoDbClient(storageOptions.dsn);
    const container = new DIContainer();
    const app = new TestBasicApplication();
    container.setApplication(app.getName(), app);
    const loader = new CommonLoader(container);
    appManager = new ApplicationManager(dbClient, loader);

    appInstall = new ApplicationInstall();
    appInstall.setUser('user').setKey('test');

    await dbClient.getRepository(ApplicationInstall).insert(appInstall);
  });

  afterEach(() => {
    dbClient.getRepository(ApplicationInstall).remove(appInstall);
    dbClient.down();
  });

  it('applications', () => {
    expect(appManager.applications).toEqual(['test']);
  });
  it('getApplication', () => {
    expect(appManager.getApplication('test')).toBeInstanceOf(TestBasicApplication);
  });
  it('getSynchronousActions', () => {
    expect(appManager.getSynchronousActions('test')).toEqual(['testSyncMethod']);
  });
  it('runSynchronousAction', () => {
    expect(appManager.runSynchronousAction('test', 'testSyncMethod',
      mockRequest())).toEqual('{"param1":"p1","param2":"p2"}');
  });
  it('saveApplicationSettings', async () => {
    const appSettings = {
      param1: 'p1',
    };
    const dbInstall = await appManager.saveApplicationSettings('test', 'user', appSettings);

    expect(dbInstall.getId() !== '').toBeTruthy();
    expect(dbInstall.getSettings()).toEqual({});
  });
  it('saveApplicationPassword', async () => {
    const dbInstall = await appManager.saveApplicationPassword('test', 'user', 'passs');
    // eslint-disable-next-line @typescript-eslint/naming-convention
    expect(dbInstall.getSettings()).toEqual({ authorization_settings: { password: 'passs' } });
  });
  xit('authorizationApplication', async () => {
    // TODO: otestovat na OAuth2 Applikaci
    const dbInstall = await appManager.authorizationApplication('test', 'user', 'http://testRedirect.com');
    expect(dbInstall).toEqual('');
  });
  xit('saveAuthorizationToken', async () => {
    // TODO: otestovat na OAuth2 Applikaci
    const dbInstall = await appManager.saveAuthorizationToken('test', 'user', 'testToken');
    // eslint-disable-next-line @typescript-eslint/naming-convention
    expect(dbInstall).toEqual({ redirect_url: 'aa' });
  });
});
