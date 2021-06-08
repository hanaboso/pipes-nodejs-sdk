import { isPromise } from 'util/types';
import {
  getCurrentMetrics,
  getTimes,
  IStartMetrics,
  ITimesMetrics,
  sendCurlMetrics,
  sendProcessMetrics,
} from '../Metrics';
import { ICpuTimes } from '../../Utils/SystemUsage';

// Mock Logger module
jest.mock('../../Logger/Logger', () => ({
  error: () => jest.fn(),
  debug: () => jest.fn(),
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Logger: jest.fn().mockImplementation(() => ({})),
}));

const mockCpuTimes: ICpuTimes = {
  cpuUserCodeTime: 1,
  cpuKernelCodeTime: 1,
  cpuStartTime: 1,
};

const mockIStartMetrics: IStartMetrics = {
  timestamp: BigInt(9007199254740991),
  cpu: mockCpuTimes,
};

const mockITimesMetrics: ITimesMetrics = {
  requestDuration: BigInt(9907199254740999),
  userTime: 5,
  kernelTime: 5,
};

describe('Test metrics', () => {
  it('getTimes', () => {
    const times = getTimes(mockIStartMetrics);
    expect(times).toHaveProperty('requestDuration');
    expect(typeof times.requestDuration).toEqual('bigint');
    expect(times).toHaveProperty('userTime');
    expect(typeof times.userTime).toEqual('number');
    expect(times).toHaveProperty('kernelTime');
    expect(typeof times.kernelTime).toEqual('number');
  });

  it('getCurrentMetrics', () => {
    const currentMetrics = getCurrentMetrics();

    expect(currentMetrics).toHaveProperty('timestamp');
    expect(typeof currentMetrics.timestamp).toEqual('bigint');
    expect(currentMetrics).toHaveProperty('cpu');

    const { cpu } = currentMetrics;
    expect(cpu).toHaveProperty('cpuUserCodeTime');
    expect(typeof cpu.cpuUserCodeTime).toEqual('number');
    expect(cpu).toHaveProperty('cpuKernelCodeTime');
    expect(typeof cpu.cpuKernelCodeTime).toEqual('number');
    expect(cpu).toHaveProperty('cpuStartTime');
    expect(typeof cpu.cpuStartTime).toEqual('number');
  });

  it('sendCurlMetrics', () => {
    const curlMetrics = sendCurlMetrics(
      mockITimesMetrics,
      'randomNodeId',
      'randomCorrelationId',
      'randomUser',
      'randomAppKey',
    );
    expect(curlMetrics).toBeDefined();
    expect(isPromise(curlMetrics)).toBeTruthy();
  });

  it('sendProcessMetrics', () => {
    const processMetric = sendProcessMetrics(
      mockITimesMetrics,
      'randomTopologyId',
      'randomNodeId',
      'randomCorrelationId',
    );
    expect(processMetric).toBeDefined();
    expect(isPromise(processMetric)).toBeTruthy();
  });
});
