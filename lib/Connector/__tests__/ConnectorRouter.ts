// Mock Logger module
import { Application } from 'express';
import CommonNodeLoader from '../../Commons/CommonNodeLoader';
import ConnectorRouter from '../ConnectorRouter';

jest.mock('../../Logger/Logger', () => ({
  error: () => jest.fn(),
  debug: () => jest.fn(),
  Logger: jest.fn().mockImplementation(() => ({})),
}));

describe('Test ConnectorRouter', () => {
  it('test configureRoutes', () => {
    const postFn = jest.fn();
    const getFn = jest.fn();
    const routeMock = {
      post: postFn,
      get: getFn,
    };

    const routeFn = jest.fn().mockReturnValue(routeMock);
    const expressMock = {
      route: routeFn,
      address: jest.fn(),
      listen: jest.fn(),
    } as never as Application;

    const loaderMock = {
      get: jest.fn(),
      getList: jest.fn(),
    } as never as CommonNodeLoader;

    const router = new ConnectorRouter(expressMock, loaderMock);
    expect(routeFn).toBeCalledTimes(5);
    expect(getFn).toBeCalledTimes(3);
    expect(postFn).toBeCalledTimes(2);
    expect(router.getName()).toEqual('ConnectorRouter');
  });
});
