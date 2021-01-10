import { HeaderInit } from 'node-fetch';
import { IRequestDto } from '../IRequestDto';
import ProcessDTO from '../../Utils/ProcessDTO';
import HttpMethods from '../HttpMethods';

export default class RequestDto implements IRequestDto {
    private url: string;

    private method: HttpMethods;

    private body: string | undefined;

    private headers: HeaderInit | undefined;

    private timeout: number;

    private debugInfo: ProcessDTO;

    constructor(url: string, method: HttpMethods, debugInfo: ProcessDTO, body?: string, headers?: HeaderInit) {
      this.url = url;
      this.method = method;
      this.debugInfo = debugInfo;
      this.body = body;
      this.headers = headers;
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
