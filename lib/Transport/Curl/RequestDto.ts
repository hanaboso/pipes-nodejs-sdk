import { HeaderInit } from 'node-fetch';
import { IRequestDto } from '../IRequestDto';
import ProcessDTO from '../../Utils/ProcessDTO';
import HttpMethods from '../HttpMethods';

export default class RequestDto implements IRequestDto {
    private timeout: number;

    constructor(
        private url: string,
        private method: HttpMethods,
        private debugInfo: ProcessDTO,
        private body?: string,
        private headers?: HeaderInit,
    ) {
      this.timeout = 10000; // 10sec as a default timeout
    }

    getBody(): string | undefined {
      return this.body;
    }

    getHeaders(): HeaderInit | undefined {
      return this.headers;
    }

    getMethod(): HttpMethods {
      return this.method;
    }

    getUrl(): string {
      return this.url;
    }

    setBody(body: string): void {
      this.body = body;
    }

    setHeaders(headers: HeaderInit): void {
      this.headers = headers;
    }

    setMethod(method: HttpMethods): void {
      this.method = method;
    }

    setUrl(url: string): void {
      this.url = url;
    }

    setTimeout(ms: number): void {
      this.timeout = ms;
    }

    getTimeout(): number {
      return this.timeout;
    }

    getDebugInfo(): ProcessDTO {
      return this.debugInfo;
    }

    setDebugInfo(dto: ProcessDTO): void {
      this.debugInfo = dto;
    }
}
