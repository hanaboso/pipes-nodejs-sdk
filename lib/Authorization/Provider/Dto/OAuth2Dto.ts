import {IOAuth2Dto} from "./IOAuth2Dto";
import {ApplicationInstall} from "../../../Application/Database/ApplicationInstall";
import {AUTHORIZATION_SETTINGS} from "../../../Application/Base/ApplicationAbstract";
import {CLIENT_ID, CLIENT_SECRET} from "../../Type/Basic/OAuth2/IOAuth2Application";

export class OAuth2Dto implements IOAuth2Dto {

    private clientId: string = '';
    private clientSecret: string = '';
    private redirectUrl: string = '';
    private user: string = '';
    private applicationKey: string = '';

    constructor(authorization: ApplicationInstall, private authorizeUrl: string, private tokenUrl: string) {
        this.clientId = authorization.settings[AUTHORIZATION_SETTINGS][CLIENT_ID] ?? '';
        this.clientSecret = authorization.settings[AUTHORIZATION_SETTINGS][CLIENT_SECRET] ?? '';
    }


    getApplicationKey(): string {
        return this.applicationKey;
    }

    getAuthorizationUrl(): string {
        return this.authorizeUrl;
    }

    getClientId(): string {
        return this.clientId;
    }

    getClientSecret(): string {
        return this.clientSecret;
    }

    getRedirectUrl(): string {
        return this.redirectUrl;
    }

    getTokenUrl(): string {
        return this.tokenUrl;
    }

    getUser(): string {
        return this.user;
    }

    isCustomApp(): boolean {
        return (!!this.user && !!this.applicationKey);
    }

    isRedirectUrl(): boolean {
        return !!this.redirectUrl;
    }

    setCustomAppDependencies(user: string, applicationKey: string): void {
        this.user = user;
        this.applicationKey = applicationKey;
    }

    setRedirectUrl(redirectUrl: string): IOAuth2Dto {
        this.redirectUrl = redirectUrl;
        return this;
    }

}
