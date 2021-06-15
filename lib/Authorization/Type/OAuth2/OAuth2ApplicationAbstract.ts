import {COMMA} from "../../../Utils/ScopeFormatter";
import {CLIENT_ID, CLIENT_SECRET, FRONTEND_REDIRECT_URL, IOAuth2Application} from "./IOAuth2Application";
import ApplicationAbstract, {AUTHORIZATION_SETTINGS, FORM} from "../../../Application/Base/ApplicationAbstract";
import {ACCESS_TOKEN, EXPIRES, IToken, OAuth2Provider} from "../../Provider/OAuth2Provider";
import AuthorizationTypeEnum from "../../AuthorizationTypeEnum";
import {ApplicationInstall, IApplicationSettings} from "../../../Application/Database/ApplicationInstall";
import {TOKEN} from "../Basic/BasicApplicationAbstract";
import Field, {IFieldArray} from "../../../Application/Model/Form/Field";
import FieldType from "../../../Application/Model/Form/FieldType";
import {OAuth2Dto} from "../../Provider/Dto/OAuth2Dto";


const SCOPE_SEPARATOR = COMMA;
const CREDENTIALS = [
    CLIENT_ID,
    CLIENT_SECRET,
];

export abstract class OAuth2ApplicationAbstract extends ApplicationAbstract implements IOAuth2Application {

    constructor(private provider: OAuth2Provider) {
        super();
    }

    abstract get authUrl(): string;

    abstract get tokenUrl(): string;

    get authorizationType(): string {
        return AuthorizationTypeEnum.OAUTH2;
    }

    authorize(applicationInstall: ApplicationInstall): string {
        return this.provider.authorize(this.createDto(applicationInstall), [], SCOPE_SEPARATOR);
    }

    isAuthorized(applicationInstall: ApplicationInstall): boolean {
        return !!applicationInstall.settings[AUTHORIZATION_SETTINGS][TOKEN][ACCESS_TOKEN];
    }

    getApplicationForm(applicationInstall: ApplicationInstall): IFieldArray[] {
        let formFields = super.getApplicationForm(applicationInstall);

        const redirectField = new Field(
            FieldType.TEXT,
            FRONTEND_REDIRECT_URL,
            'Redirect URL',
            this.provider.getRedirectUri(),
        ).setReadOnly(true).toArray;

        formFields.push(redirectField);

        return formFields;
    }

    getFrontendRedirectUrl(applicationInstall: ApplicationInstall): string {
        return applicationInstall.settings[AUTHORIZATION_SETTINGS][FRONTEND_REDIRECT_URL];
    }

    refreshAuthorization(applicationInstall: ApplicationInstall): ApplicationInstall {
        const token = this.provider.refreshAccessToken(
            this.createDto(applicationInstall),
            this.getTokens(applicationInstall),
        );

        if (Object.prototype.hasOwnProperty.call(token, EXPIRES) && typeof token[EXPIRES] !== 'undefined') {
            applicationInstall.setExpires(token[EXPIRES]);
        }

        let settings = applicationInstall.settings;
        settings[AUTHORIZATION_SETTINGS][TOKEN] = token;
        return applicationInstall;
    }

    setAuthorizationToken(applicationInstall: ApplicationInstall, token: string): IOAuth2Application {
        const tokenFromProvider = this.provider.getAccessToken(this.createDto(applicationInstall), token);
        if (Object.prototype.hasOwnProperty.call(tokenFromProvider, 'expires')) {
            applicationInstall.key
        }

        const settings = applicationInstall.settings;
        settings[AUTHORIZATION_SETTINGS][TOKEN] = tokenFromProvider;
        applicationInstall.addSettings(settings);

        return this;
    }

    setFrontendRedirectUrl(applicationInstall: ApplicationInstall, redirectUrl: string): IOAuth2Application {
        let settings = applicationInstall.settings;
        settings[AUTHORIZATION_SETTINGS][FRONTEND_REDIRECT_URL] = redirectUrl;
        return this;
    }

    getAccessToken(applicationInstall: ApplicationInstall): string {
        if (applicationInstall.settings[AUTHORIZATION_SETTINGS][TOKEN][ACCESS_TOKEN]) {
            return applicationInstall.settings[AUTHORIZATION_SETTINGS][TOKEN][ACCESS_TOKEN];
        } else {
            throw new Error('There is no access token');
        }
    }

    setApplicationSettings(applicationInstall: ApplicationInstall, settings: IApplicationSettings): ApplicationInstall {
        let appInstall = super.setApplicationSettings(applicationInstall, settings);
        for (const [key, value] of appInstall.settings[FORM] ?? []) {
            if (CREDENTIALS.includes(key)) {
                let sett = appInstall.settings;
                sett[AUTHORIZATION_SETTINGS][key] = value;
                appInstall.addSettings(sett);
            }
        }
        return applicationInstall;
    }

    createDto(applicationInstall: ApplicationInstall, redirectUrl: string = ''): OAuth2Dto {
        let dto = new OAuth2Dto(applicationInstall, this.authUrl, this.tokenUrl);
        dto.setCustomAppDependencies(applicationInstall.user, applicationInstall.key);

        if (redirectUrl) {
            dto.setRedirectUrl(redirectUrl);
        }
        return dto;
    }

    getTokens(applicationInstall: ApplicationInstall): IToken {
        return applicationInstall.settings[AUTHORIZATION_SETTINGS][TOKEN];
    }
}
