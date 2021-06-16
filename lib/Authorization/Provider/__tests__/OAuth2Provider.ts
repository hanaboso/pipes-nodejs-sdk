import {OAuth2Provider} from "../OAuth2Provider";
import {OAuth2Dto} from "../Dto/OAuth2Dto";
import {ApplicationInstall} from "../../../Application/Database/ApplicationInstall";
import {AUTHORIZATION_SETTINGS} from "../../../Application/Base/ApplicationAbstract";
import {CLIENT_ID, CLIENT_SECRET} from "../../Type/OAuth2/IOAuth2Application";
import url from 'url';

describe('OAuth2Provider tests', () => {
    it('authorize ', function () {
        const authUrl = 'https://www.googleapis.com/auth/cloud-platform';
        const redirectUrl = 'https://www.example.com';
        const user = 'testUser';
        const app = 'testApp';
        const scope = ['admin','user'];
        const clientId = 'testId';

        let oauth2Provider = new OAuth2Provider('testBackend');
        let appInstall = new ApplicationInstall();
        appInstall.addSettings({[AUTHORIZATION_SETTINGS]: {[CLIENT_SECRET]: 'testSecret', [CLIENT_ID]: clientId}});
        let dto = new OAuth2Dto(appInstall, authUrl, 'https://www.googleapis.com/auth/cloud-platform');
        dto.setRedirectUrl(redirectUrl);
        dto.setCustomAppDependencies(user, app);
        const a = oauth2Provider.authorize(dto, scope);
        const myUrl = url.parse(a, true);
        const queryParams = ['response_type', 'client_id', 'redirect_uri', 'scope', 'state', 'access_type'];

        queryParams.forEach(queryElement => {
            expect(Object.prototype.hasOwnProperty.call(myUrl.query, queryElement)).toBeTruthy();
            const query = myUrl.query[queryElement];
            expect(!!query).toBeTruthy();
            switch (query) {
                case 'response_type':
                    expect(query).toEqual('code');
                    break;
                case 'client_id':
                    expect(query).toEqual('code');
                    break;
                case 'redirect_uri':
                    expect(query).toEqual(redirectUrl);
                    break;
                case 'scope':
                    expect(query).toEqual(scope);
                    break;
                case 'state':
                    expect(query).toEqual('dGVzdFVzZXI6dGVzdEFwcA');
                    break;
                case 'access_type':
                    expect(query).toEqual('offline');
                    break;
            }
        });
    });
})
