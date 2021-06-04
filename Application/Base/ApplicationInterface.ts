import RequestDto from "../../lib/Transport/Curl/RequestDto";
import {ApplicationInstall} from "../Database/ApplicationInstall";

export interface ApplicationInterface {

    getRequestDto
    (
        applicationInstall: ApplicationInstall,
        method: string,
        url?: string,
        data?: string,
    ): RequestDto;


    setApplicationSettings(applicationInstall: ApplicationInstall, settings: object): ApplicationInstall;

    isAuthorized(applicationInstall: ApplicationInstall): boolean;

    toArray(): object;
}
