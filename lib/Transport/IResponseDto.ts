export interface IResponseDto {
    getBody(): string;
    getJsonBody(): unknown;
    getResponseCode(): number;
    getReason(): string|undefined;

    setBody(body: string): void;
}
