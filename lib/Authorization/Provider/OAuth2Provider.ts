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


export class OAuth2Provider extends OAuthProviderAbstract implements IOAuth2Provider {
    authorize(dto: IOAuth2Dto, scopes: string[], separator: string = COMMA): string {
        const client = this.createClient(dto);
        //TODO
    }

    getAccessToken(dto: IOAuth2Dto, code: string): unknown[] {

        return this.getTokenByGrant(dto, 'authorization_code', code);
    }

    refreshAccessToken(dto: OAuth2Dto, token: string): string {
        return [];
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
    createClient(dto: IOAuth2Dto, callback: VerifyFunction): PassportStatic {
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

    getTokenByGrant(dto: IOAuth2Dto, grant: string, data: string = ''): any[] {
        const client = this.createClient(dto,);
        let token = [];
        try {
            token = client.getAccessToken(grant, data);
        } catch (e) {
            const message = util.format('OAuth2 Error: %s', e.message);
            logger.error(message,e);

            this.throwException(message, 205);
        }
        return token;
    }
}
