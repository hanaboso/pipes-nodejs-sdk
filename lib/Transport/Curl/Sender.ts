import fetch, { RequestInit, Response } from 'node-fetch';
import RequestDto from './RequestDto';
import logger, { Logger } from '../../Logger/Logger';
import ResponseDto from './ResponseDto';
import {
  getCurrentMetrics, getTimes, IStartMetrics, sendCurlMetrics,
} from '../../Metrics/Metrics';
import {
  APPLICATION, CORRELATION_ID, NODE_ID, USER,
} from '../../Utils/Headers';
import Severity from '../../Logger/Severity';

function createInitFromDto(dto: RequestDto): RequestInit {
  return {
    method: dto.getMethod(),
    headers: dto.getHeaders(),
    body: dto.getBody(),
    timeout: dto.getTimeout(),
  };
}

function log(req: RequestDto, res: Response, level: string, body?: string): void {
  let message = 'Request success.';
  if (res.status !== 200) {
    message = 'Request failed.';
  }

  const debugInfo = req.getDebugInfo();
  logger.log(
    level,
    `${message}
       Code: ${res.status},
       Message: ${body ?? 'Empty response'},
       Reason: ${res.statusText}`,
    debugInfo ? Logger.ctxFromDto(debugInfo) : undefined,
  );
}

function sendMetrics(dto: RequestDto, startTimes: IStartMetrics): void {
  const info = dto.getDebugInfo();
  try {
    if (info) {
      const times = getTimes(startTimes);
      sendCurlMetrics(
        times,
        info.getHeader(NODE_ID),
        info.getHeader(CORRELATION_ID),
        info.getHeader(USER),
        info.getHeader(APPLICATION),
      );
    }
  } catch (e) {
    logger.error(e, info ? Logger.ctxFromDto(info) : undefined);
  }
}

async function send(dto: RequestDto): Promise<ResponseDto> {
  const startTime = getCurrentMetrics();
  return fetch(dto.getUrl(), createInitFromDto(dto))
    .then(async (response) => {
      sendMetrics(dto, startTime);
      const body = await response.text();
      if (!response.ok) {
        log(dto, response, Severity.ERROR, body);
      } else {
        log(dto, response, Severity.DEBUG, body);
      }

      return { response, body };
    },
    async (reason) => {
      sendMetrics(dto, startTime);
      logger.error(reason);
      return Promise.reject(reason);
    })
    .then(
      ({ response, body }) => new ResponseDto(body, response.status, response.statusText),
    );
}

export default send;
