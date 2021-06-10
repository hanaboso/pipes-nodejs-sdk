import { ApplicationInstall, IApplicationSettings } from '../Database/ApplicationInstall';
import AuthorizationTypeEnum from '../../Authorization/AuthorizationTypeEnum';
import RequestDto from '../../Transport/Curl/RequestDto';
import { IApplicationArray } from './ApplicationAbstract';

export interface IApplication {

    getRequestDto
    (
        applicationInstall: ApplicationInstall,
        method: string,
        url?: string,
        data?: string,
    ): RequestDto;

    getAuthorizationType(): AuthorizationTypeEnum;

    setApplicationSettings(applicationInstall: ApplicationInstall, settings: IApplicationSettings): ApplicationInstall;

    isAuthorized(applicationInstall: ApplicationInstall): boolean;

    toArray(): IApplicationArray;
}
