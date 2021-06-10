import { HeaderInit } from 'node-fetch';
import ProcessDTO from '../Utils/ProcessDTO';
import HttpMethods from './HttpMethods';

export interface IRequestDto {
    setUrl(url: string): void;
    setMethod(method: HttpMethods): void;
    setBody(body: string): void;
    setHeaders(headers: HeaderInit): void;
    setTimeout(ms: number): void;
    setDebugInfo(dto: ProcessDTO): void;

    getUrl(): string;
    getMethod(): HttpMethods;
    getBody(): string|undefined;
    getHeaders(): HeaderInit|undefined;
    getTimeout(): number;
    getDebugInfo(): ProcessDTO|undefined;
}
