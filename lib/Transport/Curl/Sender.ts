import fetch, { RequestInit, Response } from 'node-fetch';
import RequestDto from './RequestDto';
import logger, { Logger } from '../../Logger/Logger';
import ResponseDto from './ResponseDto';

function createInitFromDto(dto: RequestDto): RequestInit {
  return {
    method: dto.getMethod(),
    headers: dto.getHeaders(),
    body: dto.getBody(),
    timeout: dto.getTimeout(),
  };
}

async function log(req: RequestDto, res: Response, level: string): Promise<void> {
  // TODO: optimization reading of response text
  logger.log(
    level,
    `Request failed. 
       Code: ${res.status},
       Message: ${await res.text()},
       Reason: ${res.statusText}`,
    Logger.ctxFromDto(req.getDebugInfo()),
  );
}

async function send(dto: RequestDto): Promise<ResponseDto> {
  // TODO: metrics
  return fetch(dto.getUrl(), createInitFromDto(dto))
    .then((response) => {
      if (!response.ok) {
        log(dto, response.clone(), 'error');
      } else {
        log(dto, response.clone(), 'debug');
      }

      return response;
    },
    (reason) => {
      logger.error(reason);
      return Promise.reject(reason);
    })
    .then(async (response) => {
      const responseDto = new ResponseDto('', response.status, response.statusText);

      if (response.body !== null) {
        responseDto.setBody(await response.text());
      }

      return responseDto;
    });
}

export default send;
