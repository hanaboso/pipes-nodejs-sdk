import fetch, { RequestInit } from 'node-fetch';
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

async function send(dto: RequestDto): Promise<ResponseDto> {
  // TODO: metrics
  const response = await fetch(dto.getUrl(), createInitFromDto(dto));
  const responseDto = new ResponseDto('', response.status, response.statusText);

  if (response.body !== null) {
    responseDto.setBody(await response.text());
  }

  if (!response.ok) {
    logger.error(
      `Request failed. 
       Code: ${responseDto.getResponseCode()},
       Message: ${responseDto.getBody()},
       Reason: ${responseDto.getReason()}`,
      Logger.ctxFromDto(dto.getDebugInfo()),
    );
  } else {
    logger.debug(
      `Request success. 
       Code: ${responseDto.getResponseCode()},
       Message: ${responseDto.getBody()},
       Reason: ${responseDto.getReason()}`,
      Logger.ctxFromDto(dto.getDebugInfo()),
    );
  }

  return Promise.resolve(responseDto);
}

export default send;
