import { Request } from 'express';
import ApplicationManager from '../ApplicationManager';
import MongoDbClient from '../../../Storage/Mongodb/Client';
import { storageOptions } from '../../../Config/Config';
import DIContainer from '../../../DIContainer/Container';
import CommonLoader from '../../../Commons/CommonLoader';
import TestBasicApplication from '../../../../test/Application/TestBasicApplication';
import { IApplicationSettings } from '../../Database/ApplicationInstall';

let appManager: ApplicationManager;

describe('ApplicationManager tests', () => {
  // Mock Request/Response of Express
  const mockedRequest = () => ({
    headers: { 'pf-node-id': '123' },
    body: '{"body": "aaa"}',
  });

  function mockRequest(): Request {
    return mockedRequest() as unknown as Request;
  }

  beforeEach(() => {
    const dbClient = new MongoDbClient(storageOptions.dsn);
    const container = new DIContainer();
    const app = new TestBasicApplication();
    container.setApplication(app.getName(), app);
    const loader = new CommonLoader(container);
    appManager = new ApplicationManager(dbClient, loader);
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
  xit('saveApplicationSettings', () => {
    const appSettings: IApplicationSettings = {
      param1: 'p1',
    };
    // TODO check return value
    expect(appManager.saveApplicationSettings('test', 'hokus', appSettings)).toEqual('');
  });
  xit('saveApplicationPassword', () => {
    expect(appManager.saveApplicationPassword('test', 'hokus', 'passs')).toEqual('');
  });
  xit('authorizationApplication', () => {
    expect(appManager.authorizationApplication('test', 'hokus', 'http://testRedirect.com')).toEqual('');
  });
  xit('saveAuthorizationToken', () => {
    expect(appManager.saveAuthorizationToken('test', 'hokus', 'testToken')).toEqual('');
  });
});
