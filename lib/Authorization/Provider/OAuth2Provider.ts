import {OAuthProviderAbstract} from "./OAuthProviderAbstract";
import {IOAuth2Provider} from "./IOAuth2Provider";
import {IOAuth2Dto} from "./Dto/IOAuth2Dto";
import {OAuth2Dto} from "./Dto/OAuth2Dto";
import {AuthorizationCode} from 'simple-oauth2';

export const REFRESH_TOKEN = 'refresh_token';
export const ACCESS_TOKEN = 'access_token';
export const EXPIRES = 'expires';
export const RESOURCE_OWNER_ID = 'resource_owner_id';
export const ACCESS_TYPE = 'access_type';
export const STATE = 'state';

export interface IToken {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

export const COMMA = ',';
export const SPACE = ' ';

export class OAuth2Provider extends OAuthProviderAbstract implements IOAuth2Provider {
    public authorize(dto: OAuth2Dto, scopes: string[], separator: string = COMMA): string {
        let state = '';
        if (dto.isCustomApp()) {
            state = OAuth2Provider.stateEncode(dto);
        }

        const client = this._createClient(dto);
        const authUrl = client.authorizeURL({
            redirect_uri: dto.getRedirectUrl(),
            scope: scopes.join(separator),
            state: state,
        });
        return `${authUrl}&access_type=offline`;
    }

    public async getAccessToken(dto: IOAuth2Dto, code: string): Promise<IToken> {
        const tokenParams = {
            code: code,
            redirect_uri: dto.getRedirectUrl(),
        };

        const client = this._createClient(dto)
        const accessToken = await client.getToken(tokenParams);
        return accessToken.token;
        //TODO format token
    }

    public async refreshAccessToken(dto: OAuth2Dto, token: IToken): Promise<IToken> {
        if (Object.prototype.hasOwnProperty.call(token, REFRESH_TOKEN)) {
            this.throwException('Refresh token not found! Refresh is not possible.', 205);
        }
        const client = this._createClient(dto);
        const accessToken = client.createToken(token);
        const newAccessToken = await accessToken.refresh();
        //TODO convert to token

        return newAccessToken.token;
        //TODO format token
    }

    public static stateEncode(dto: IOAuth2Dto): string {
        return Buffer.from(`${dto.getUser()}:${dto.getApplicationKey()}`).toString('base64url');
    }


    private _createClient(dto: IOAuth2Dto): AuthorizationCode {
        const config = {
            client: {
                id: dto.getClientId(),
                secret: dto.getClientSecret(),
            },
            auth: {
                tokenHost: dto.getTokenUrl(),
            }
        };

        return new AuthorizationCode(config);
    }
}
