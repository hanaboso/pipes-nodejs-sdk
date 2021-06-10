import TestBasicApplication from "../TestBasicApplication";
import {ApplicationInstall} from "../../../lib/Application/Database/ApplicationInstall";

describe('Application authorize tests', () => {
    it('isAuthorized', function () {
        const basicApp = new TestBasicApplication();
        let appInstall = new ApplicationInstall();
        appInstall.addSettings({'authorization_settings': []});
        basicApp.setApplicationUser(appInstall, 'Jakub');
        basicApp.setApplicationPassword(appInstall, 'passs');
        expect(basicApp.isAuthorized(appInstall)).toEqual(true);
    });
    it('isNotAuthorized', function () {
        const basicApp = new TestBasicApplication();
        let appInstall = new ApplicationInstall();
        appInstall.addSettings({'authorization_settings': []});
        expect(basicApp.isAuthorized(appInstall)).toEqual(false);
    });
    it('setApplicationToken', function () {
        const basicApp = new TestBasicApplication();
        let appInstall = new ApplicationInstall();
        appInstall.addSettings({'authorization_settings': []});
        expect(basicApp.setApplicationToken(appInstall, 'token')).toBeInstanceOf(ApplicationInstall);
    });
    it('setApplicationSettings', function () {
        const basicApp = new TestBasicApplication();
        let appInstall = new ApplicationInstall();
        appInstall.addSettings({'authorization_settings': []});
        appInstall.addSettings({'form': []});
        const sett = {user:'Jakub',password: 'pass',token: 'token'};
        expect(basicApp.setApplicationSettings(appInstall, sett)).toBeInstanceOf(ApplicationInstall);
    });
})
