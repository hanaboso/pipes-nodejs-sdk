import {OAuthProviderAbstract} from "./OAuthProviderAbstract";
import {IOAuth2Provider} from "./IOAuth2Provider";
import {IOAuth2Dto} from "./Dto/IOAuth2Dto";
import {COMMA, ScopeFormatter} from "../../Utils/ScopeFormatter";
import {OAuth2Dto} from "./Dto/OAuth2Dto";
import * as util from "util";
import * as QueryString from "querystring";
import OAuth2Strategy, {VerifyFunction} from "passport-oauth2";
import passport, {PassportStatic} from "passport";
import logger from "../../Logger/Logger";

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

export class OAuth2Provider extends OAuthProviderAbstract implements IOAuth2Provider {
    authorize(dto: OAuth2Dto, scopes: string[], separator: string = COMMA): string {
        const client = this.createClient(dto, (a: string, b: string) => console.log(a, b));
        const responsee = client.authorize('oauth2', (a, b) => console.log(a, b));
        const ee = responsee();
        return '';
        //TODO
    }

    getAccessToken(dto: IOAuth2Dto, code: string): IToken {
        return this.getTokenByGrant(dto, 'authorization_code', code);
    }

    refreshAccessToken(dto: OAuth2Dto, token: IToken): IToken {
        if (Object.prototype.hasOwnProperty.call(token, REFRESH_TOKEN)) {
            this.throwException('Refresh token not found! Refresh is not possible.', 205)
        }

        let oldRefreshToken = token[REFRESH_TOKEN];
        let accessToken = this.getTokenByGrant(dto, REFRESH_TOKEN, oldRefreshToken);

        let opts: IToken = {};
        if (Object.prototype.hasOwnProperty.call(token, REFRESH_TOKEN)) {
            opts = {...opts, ...{[REFRESH_TOKEN]: oldRefreshToken}};
            opts = {...opts, ...{[ACCESS_TOKEN]: accessToken[ACCESS_TOKEN] ?? null}};
            opts = {...opts, ...{[EXPIRES]: accessToken[EXPIRES] ?? null}};
            opts = {...opts, ...{[RESOURCE_OWNER_ID]: accessToken[RESOURCE_OWNER_ID] ?? null}};
            accessToken = {...accessToken, ...opts};
        }

        return accessToken;
    }

    stateEncode(dto: IOAuth2Dto): string {
        return btoa(util.format('%s:%s', dto.getUser(), dto.getApplicationKey()))
    }

    stateDecoder(state: string): string[] {
        const params = atob(state).split(':');
        return [params[0] ?? '', params[1] ?? ''];
    }


    /**
     * -------------------------------------------- HELPERS --------------------------------------
     */

     testOAuth(){
        const config = {
            client: {
                id: '<client-id>',
                secret: '<client-secret>'
            },
            auth: {
                tokenHost: 'https://api.oauth.com'
            }
        };

        const { ClientCredentials, ResourceOwnerPassword, AuthorizationCode } = require('simple-oauth2');

        const client = new AuthorizationCode(config);

        const authorizationUri = client.authorizeURL({
            redirect_uri: 'http://localhost:3000/callback',
            scope: '<scope>',
            state: '<state>'
        });

        // Redirect example using Express (see http://expressjs.com/api.html#res.redirect)
        //res.redirect(authorizationUri);

        const tokenParams = {
            code: '<code>',
            redirect_uri: 'http://localhost:3000/callback',
            scope: '<scope>',
        };

        try {
            const accessToken = client.getToken(tokenParams);
        } catch (error) {
            console.log('Access Token Error', error.message);
        }
    }

    createClient(dto: IOAuth2Dto, callback: VerifyFunction): PassportStatic {
        this.testOAuth();
        return passport.use(new OAuth2Strategy({
                authorizationURL: dto.getAuthorizationUrl(),
                tokenURL: dto.getTokenUrl(),
                clientID: dto.getClientId(),
                clientSecret: dto.getClientSecret(),
                callbackURL: dto.getRedirectUrl(),
            },
            callback
        ));
    }

    getAuthorizeUrl(
        dto: IOAuth2Dto,
        authorizeUrl: string,
        inputScopes: string[],
        separator: string = COMMA,
    ): string {
        let state;
        if (dto.isCustomApp()) {
            state = this.stateEncode(dto);
        }

        const scopes = ScopeFormatter.getScopes(inputScopes, separator);
        const url = `${authorizeUrl}${scopes}`
        const query = QueryString.parse(url);

        //TODO check how to add atributes
        query[ACCESS_TYPE] = 'offline';
        if (state) {
            query[STATE] = state;
        }
        return QueryString.stringify(query);
    }

    getTokenByGrant(dto: IOAuth2Dto, grant: string, data: string = ''): IToken {
        const client = this.createClient(dto, (a: string, b: string) => {
            console.log(a, b)
        });
        let token: IToken = [];
        try {
            client.authenticate('oauth2', (a, b) => {
                console.log(a, b)
            });
        } catch (e) {
            const message = util.format('OAuth2 Error: %s', e.message);
            logger.error(message, e);

            this.throwException(message, 205);
        }
        return token;
    }
}
