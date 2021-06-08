import { isPromise } from 'util/types';
import { ITimesMetrics, sendCurlMetrics, sendProcessMetrics } from '../Metrics';

// Mock Logger module
jest.mock('../../Logger/Logger', () => ({
  error: () => jest.fn(),
  debug: () => jest.fn(),
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Logger: jest.fn().mockImplementation(() => ({})),
}));

jest.mock('metrics-sender/dist/lib/metrics/Metrics', () => ({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Metrics: jest.fn().mockImplementation(() => ({})),
}));

const mockITimesMetrics: ITimesMetrics = {
  requestDuration: BigInt(9907199254740999),
  userTime: 5,
  kernelTime: 5,
};

describe('Test metrics', () => {
  it('sendCurlMetrics', () => {
    const curlMetrics = sendCurlMetrics(
      mockITimesMetrics,
    );
    expect(curlMetrics).toBeDefined();
    expect(isPromise(curlMetrics)).toBeTruthy();
  });

  it('sendProcessMetrics', () => {
    const processMetric = sendProcessMetrics(
      mockITimesMetrics,
    );
    expect(processMetric).toBeDefined();
    expect(isPromise(processMetric)).toBeTruthy();
  });
});
