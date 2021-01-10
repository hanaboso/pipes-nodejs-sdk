import { IncomingHttpHeaders } from 'http';

const PREFIX = 'pf-';

// Framework headers
export const CORRELATION_ID = 'correlation-id';
export const PROCESS_ID = 'process-id';
export const PARENT_ID = 'parent-id';
export const SEQUENCE_ID = 'sequence-id';
export const NODE_ID = 'node-id';
export const NODE_NAME = 'node-name';
export const TOPOLOGY_ID = 'topology-id';
export const TOPOLOGY_NAME = 'topology-name';
export const APPLICATION = 'application';
export const USER = 'user';

// Result headers
export const RESULT_CODE = 'result-code';
export const RESULT_MESSAGE = 'result-message';
export const RESULT_DETAIL = 'result-detail';

// Repeater headers
export const REPEAT_QUEUE = 'repeat-queue';
export const REPEAT_INTERVAL = 'repeat-interval';
export const REPEAT_MAX_HOPS = 'repeat-max-hops';
export const REPEAT_HOPS = 'repeat-hops';

// Limiter headers
export const LIMIT_KEY = 'limit-key';
export const LIMIT_TIME = 'limit-time';
export const LIMIT_VALUE = 'limit-value';
export const LIMIT_LAST_UPDATED = 'limit-last-update';

const WHITE_LIST = ['content-type'];

function existPrefix(key: string): boolean {
  return key.startsWith(PREFIX);
}

export function createKey(key: string): string {
  return `${PREFIX}${key}`.toLowerCase();
}

export function get(key: string, headers: IncomingHttpHeaders): string | undefined {
  if (headers[createKey(key)]) {
    return String(headers[createKey(CORRELATION_ID)]);
  }

  return undefined;
}

export function clear(headers: IncomingHttpHeaders): IncomingHttpHeaders {
  const res : IncomingHttpHeaders = {};
  Object.entries(headers).forEach(
    ([key, value]) => {
      if (WHITE_LIST.includes(key.toLowerCase()) || existPrefix(key.toLowerCase())) {
        res[key] = value;
      }
    },
  );
  return res;
}

export function getCorrelationId(headers: IncomingHttpHeaders): string | undefined {
  return get(CORRELATION_ID, headers);
}

export function getNodeId(headers: IncomingHttpHeaders): string | undefined {
  return get(NODE_ID, headers);
}

export function getProcessId(headers: IncomingHttpHeaders): string | undefined {
  return get(PROCESS_ID, headers);
}

export function getParentId(headers: IncomingHttpHeaders): string | undefined {
  return get(PARENT_ID, headers);
}

export function getSequenceId(headers: IncomingHttpHeaders): number {
  return parseInt(get(SEQUENCE_ID, headers) || '0', 10);
}
