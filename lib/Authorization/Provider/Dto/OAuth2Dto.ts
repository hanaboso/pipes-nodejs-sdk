import {IOAuth2Dto} from "./IOAuth2Dto";
import {ApplicationInstall} from "../../../Application/Database/ApplicationInstall";
import {AUTHORIZATION_SETTINGS} from "../../../Application/Base/ApplicationAbstract";
import {CLIENT_ID, CLIENT_SECRET} from "../../Type/OAuth2/IOAuth2Application";

export class OAuth2Dto implements IOAuth2Dto {

    private clientId: string = '';
    private clientSecret: string = '';
    private redirectUrl: string = '';
    private user: string = '';
    private applicationName: string = '';

    constructor(authorization: ApplicationInstall, private authorizeUrl: string, private tokenUrl: string) {
        this.clientId = authorization.settings[AUTHORIZATION_SETTINGS][CLIENT_ID] ?? '';
        this.clientSecret = authorization.settings[AUTHORIZATION_SETTINGS][CLIENT_SECRET] ?? '';
    }


    public getApplicationKey(): string {
        return this.applicationName;
    }

    public getAuthorizationUrl(): string {
        return this.authorizeUrl;
    }

    public getClientId(): string {
        return this.clientId;
    }

    public getClientSecret(): string {
        return this.clientSecret;
    }

    public getRedirectUrl(): string {
        return this.redirectUrl;
    }

    public getTokenUrl(): string {
        return this.tokenUrl;
    }

    public getUser(): string {
        return this.user;
    }

    public isCustomApp(): boolean {
        return (!!this.user && !!this.applicationName);
    }

    public isRedirectUrl(): boolean {
        return !!this.redirectUrl;
    }

    public setCustomAppDependencies(user: string, applicationName: string): void {
        this.user = user;
        this.applicationName = applicationName;
    }

    public setRedirectUrl(redirectUrl: string): IOAuth2Dto {
        this.redirectUrl = redirectUrl;
        return this;
    }

}
