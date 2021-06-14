import {IOAuthProvider} from "./IOAuthProvider";
import {IOAuth2Dto} from "./Dto/IOAuth2Dto";

export interface IOAuth2Provider  extends IOAuthProvider{

    authorize(dto: IOAuth2Dto, scopes: string[]): string;

    getAccessToken(dto: IOAuth2Provider, request: unknown[]): unknown[]

    refreshAccessToken(dto: IOAuth2Provider, token: unknown[]): unknown[];
}
