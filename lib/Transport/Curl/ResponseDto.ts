import { IResponseDto } from '../IResponseDto';

export default class ResponseDto implements IResponseDto {
    private body: string;

    private readonly code: number;

    private readonly reason: string|undefined;

    constructor(body: string, code: number, reason?:string) {
      this.body = body;
      this.code = code;
      this.reason = reason;
    }

    getBody(): string {
      return this.body;
    }

    getJsonBody(): unknown {
      return JSON.parse(this.body);
    }

    getReason(): string|undefined {
      return this.reason;
    }

    getResponseCode(): number {
      return this.code;
    }

    setBody(body: string): void {
      this.body = body;
    }
}
