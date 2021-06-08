import { Application } from 'express';
import CustomNodeRouter from '../CustomNodeRouter';
import CommonLoader from '../../Commons/CommonLoader';

// Mock Logger module
jest.mock('../../Logger/Logger', () => ({
  error: () => jest.fn(),
  debug: () => jest.fn(),
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Logger: jest.fn().mockImplementation(() => ({})),
}));

describe('Test CustomNodeRouter', () => {
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
    } as never as CommonLoader;

    const router = new CustomNodeRouter(expressMock, loaderMock);
    expect(routeFn).toBeCalledTimes(3);
    expect(getFn).toBeCalledTimes(2);
    expect(postFn).toBeCalledTimes(1);
    expect(router.getName()).toEqual('CustomNodeRouter');
  });
});
