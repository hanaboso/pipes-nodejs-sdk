import { IResponseDto } from '../IResponseDto';

export default class ResponseDto implements IResponseDto {
  // eslint-disable-next-line no-useless-constructor
  constructor(private body: string, private code: number, private reason?:string) {
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
