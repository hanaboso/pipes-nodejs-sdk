import { IApplication } from '../../../Application/Base/IApplication';
import { ApplicationInstall } from '../../../Application/Database/ApplicationInstall';
import AuthorizationTypeEnum from '../../AuthorizationTypeEnum';

export interface IBasicApplication extends IApplication {

    setApplicationPassword(
        applicationInstall: ApplicationInstall,
        password: string,
    ): ApplicationInstall

    setApplicationUser(applicationInstall: ApplicationInstall, user: string): ApplicationInstall

    getAuthorizationType(): AuthorizationTypeEnum

}
