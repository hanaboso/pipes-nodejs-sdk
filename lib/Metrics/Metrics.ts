import { ITagsMap, Metrics } from 'metrics-sender/dist/lib/metrics/Metrics';
import { ICpuTimes, getCpuTimes, getCurrentTimestamp } from '../Utils/SystemUsage';
import { metricsOptions } from '../Config/Config';
import logger from '../Logger/Logger';

export interface IStartMetrics {
    timestamp: bigint,
    cpu: ICpuTimes,
}

export interface ITimesMetrics {
    requestDuration: bigint,
    userTime: number,
    kernelTime: number,
}

export async function sendProcessMetrics(
  timeData: ITimesMetrics,
  topologyId?: string,
  nodeId?: string,
  correlationId?: string,
): Promise<void> {
  const tags: ITagsMap = {};
  if (topologyId) {
    tags.topology_id = topologyId;
  }
  if (nodeId) {
    tags.node_id = nodeId;
  }
  if (correlationId) {
    tags.correlation_id = correlationId;
  }

  const fields: ITagsMap = {
    fpm_request_total_duration: String(timeData.requestDuration),
    fpm_cpu_user_time: String(timeData.userTime),
    fpm_cpu_kernel_time: String(timeData.kernelTime),
  };

  try {
    await new Metrics(metricsOptions.processMeasurement, tags, metricsOptions.server, metricsOptions.port).send(fields);
  } catch (e) {
    logger.error(e);
  }
}

export async function sendCurlMetrics(
  timeData: ITimesMetrics,
  nodeId?: string,
  correlationId?: string,
  user?: string,
  appKey?: string,
): Promise<void> {
  const tags: ITagsMap = {};
  if (user) {
    tags.user_id = user;
  }
  if (appKey) {
    tags.application_id = appKey;
  }
  if (nodeId) {
    tags.node_id = nodeId;
  }
  if (correlationId) {
    tags.correlation_id = correlationId;
  }

  const fields: ITagsMap = {
    user_id: user ?? '',
    application_id: appKey ?? '',
    sent_request_total_duration: String(timeData.requestDuration),
  };

  try {
    await new Metrics(metricsOptions.curlMeasurement, tags, metricsOptions.server, metricsOptions.port).send(fields);
  } catch (e) {
    logger.error(e);
  }
}

export function getCurrentMetrics(): IStartMetrics {
  return {
    timestamp: getCurrentTimestamp(),
    cpu: getCpuTimes(),
  };
}

export function getTimes(startMetrics: IStartMetrics): ITimesMetrics {
  const endMetrics = getCurrentMetrics();

  return {
    requestDuration: endMetrics.timestamp - startMetrics.timestamp,
    userTime: endMetrics.cpu.cpuUserCodeTime - startMetrics.cpu.cpuUserCodeTime,
    kernelTime: endMetrics.cpu.cpuKernelCodeTime - startMetrics.cpu.cpuKernelCodeTime,
  };
}
