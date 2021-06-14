import {IOAuthProvider} from "./IOAuthProvider";
import * as util from "util";
import logger from "../../Logger/Logger";

export class OAuthProviderAbstract implements IOAuthProvider {

    constructor(private backend: string) {
    }

    getRedirectUri(): string {
        return util.format(
            '%s/%s',
            this.backend.replace('/', ''),
            this.getRedirectUri().replace('/', ''),
        );
    }

    throwException(message: string, code: number): void {
        logger.error(message);
        throw new Error('Message: ' + message + ' code: ' + code);
    }

}
