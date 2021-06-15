import {IOAuthProvider} from "./IOAuthProvider";
import {IOAuth2Dto} from "./Dto/IOAuth2Dto";
import {OAuth2Dto} from "./Dto/OAuth2Dto";
import {IToken} from "./OAuth2Provider";

export interface IOAuth2Provider  extends IOAuthProvider{

    authorize(dto: IOAuth2Dto, scopes: string[]): string;

    getAccessToken(dto: OAuth2Dto, code: string): IToken;

    refreshAccessToken(dto: OAuth2Dto, token: IToken): IToken;
}
