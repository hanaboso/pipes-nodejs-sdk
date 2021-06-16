import {IApplication} from "../../../Application/Base/IApplication";
import {ApplicationInstall} from "../../../Application/Database/ApplicationInstall";

export const CLIENT_ID = 'client_id';
export const CLIENT_SECRET = 'client_secret';
export const FRONTEND_REDIRECT_URL = 'frontend_redirect_url';

export interface IOAuth2Application extends IApplication {
    authorize(applicationInstall: ApplicationInstall): string;

    refreshAuthorization(applicationInstall: ApplicationInstall): Promise<ApplicationInstall>;

    getFrontendRedirectUrl(applicationInstall: ApplicationInstall): string;

    setFrontendRedirectUrl(applicationInstall: ApplicationInstall, redirectUrl: string): IOAuth2Application;

    setAuthorizationToken(applicationInstall: ApplicationInstall, token: string): IOAuth2Application;
}
