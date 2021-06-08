import { HeaderInit } from 'node-fetch';
import { IRequestDto } from '../IRequestDto';
import ProcessDTO from '../../Utils/ProcessDTO';
import HttpMethods from '../HttpMethods';

export default class RequestDto implements IRequestDto {
    private _timeout: number;

    constructor(
        private _url: string,
        private _method: HttpMethods,
        private _debugInfo: ProcessDTO,
        private _body?: string,
        private _headers?: HeaderInit,
    ) {
      this._timeout = 10000; // 10sec as a default timeout
    }

    getBody(): string | undefined {
      return this._body;
    }

    getHeaders(): HeaderInit | undefined {
      return this._headers;
    }

    getMethod(): HttpMethods {
      return this._method;
    }

    getUrl(): string {
      return this._url;
    }

    setBody(body: string): void {
      this._body = body;
    }

    setHeaders(headers: HeaderInit): void {
      this._headers = headers;
    }

    setMethod(method: HttpMethods): void {
      this._method = method;
    }

    setUrl(url: string): void {
      this._url = url;
    }

    setTimeout(ms: number): void {
      this._timeout = ms;
    }

    getTimeout(): number {
      return this._timeout;
    }

    getDebugInfo(): ProcessDTO {
      return this._debugInfo;
    }

    setDebugInfo(dto: ProcessDTO): void {
      this._debugInfo = dto;
    }
}
