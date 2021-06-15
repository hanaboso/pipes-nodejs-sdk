import {OAuth2Provider} from "../OAuth2Provider";
import {OAuth2Dto} from "../Dto/OAuth2Dto";
import {ApplicationInstall} from "../../../Application/Database/ApplicationInstall";
import {AUTHORIZATION_SETTINGS} from "../../../Application/Base/ApplicationAbstract";
import {CLIENT_ID, CLIENT_SECRET} from "../../Type/OAuth2/IOAuth2Application";

describe('OAuth2Provider tests', () => {
    it('authorize ', function () {
        let ff = new OAuth2Provider('testBackend');
        let appInstall = new ApplicationInstall();
        appInstall.addSettings({[AUTHORIZATION_SETTINGS]: {[CLIENT_SECRET]: 'testSecret', [CLIENT_ID] : 'testId'}});
        let dto = new OAuth2Dto(appInstall, 'https://www.googleapis.com/auth/cloud-platform', 'https://www.googleapis.com/auth/cloud-platform');
        ff.authorize(dto, []);
    });
})
