import TestBasicApplication from "../TestBasicApplication";
import HttpMethods from "../../../lib/Transport/HttpMethods";
import RequestDto from "../../../lib/Transport/Curl/RequestDto";
import ApplicationTypeEnum from "../../../lib/Application/Base/ApplicationTypeEnum";
import AuthorizationTypeEnum from "../../../lib/Authorization/AuthorizationTypeEnum";
import {ApplicationInstall} from "../../../lib/Application/Database/ApplicationInstall";

describe('Test application', () => {
    const user = 'Jakub';
    const pass = 'passs';
    const token = 'tokenn'

    it('getDescription', function () {
        const app = new TestBasicApplication();
        expect(app.getDescription()).toEqual('Test description');
    });
    it('getKey', function () {
        const app = new TestBasicApplication();
        expect(app.getKey()).toEqual('test');
    });
    it('getName', function () {
        const app = new TestBasicApplication();
        expect(app.getName()).toEqual('Test');
    });
    it('toArray', function () {
        const app = new TestBasicApplication();
        expect(app.toArray()).toEqual({
            'application_type': ApplicationTypeEnum.CRON,
            'authorization_type': AuthorizationTypeEnum.BASIC,
            'description': 'Test description',
            'key': 'test',
            'name': 'Test',
        });
    });
    it('getSettingsForm', function () {
        const app = new TestBasicApplication();
        const expected = {
            "_fields": [
                {
                    "_choices": [],
                    "_description": "",
                    "_key": "testKey",
                    "_label": "testLabel",
                    "_type": "password",
                    "_value": null,
                    "_disabled": false,
                    "_readOnly": false,
                    "_required": false
                },
                {
                    "_choices": [],
                    "_description": "",
                    "_key": "person",
                    "_label": "testLabel",
                    "_type": "text",
                    "_value": null,
                    "_disabled": false,
                    "_readOnly": false,
                    "_required": false
                }
            ]
        };
        expect(app.getSettingsForm()).toEqual(expected);
    });
    it('setApplicationSettings', function () {
        const app = new TestBasicApplication();
        const appInstall = new ApplicationInstall();
        const expected = {
            "_created": appInstall.created,
            "_deleted": false,
            "_encryptedSettings": "",
            "_id": "",
            "_key": "",
            "_nonEncryptedSettings": {},
            "_settings": {
                "authorization_settings": {
                    "password": pass,
                    "token": token,
                    "user": user
                }
            },
            "_updated": appInstall.updated,
            "_user": ""
        };
        expect(app.setApplicationSettings(appInstall,
            {form: {user: user, password: pass, token: token}})).toEqual(expected);
    });
    it('setApplicationSettingsAddPerson', function () {
        const app = new TestBasicApplication();
        const appInstall = new ApplicationInstall();
        const expected = {
            "_created": appInstall.created,
            "_deleted": false,
            "_encryptedSettings": "",
            "_id": "",
            "_key": "",
            "_nonEncryptedSettings": {},
            "_settings": {
                "form": {
                    "person": "test"
                }
            },
            "_updated": appInstall.updated,
            "_user": ""
        };
        expect(app.setApplicationSettings(appInstall, {person: 'test'})).toEqual(expected);
    });
    it('getApplicationForm', function () {
        const app = new TestBasicApplication();
        const appInstall = new ApplicationInstall();
        const sett = {form: {user: user, password: pass, token: token}};
        const result = app.setApplicationSettings(appInstall, sett);
        expect(result).toBeInstanceOf(ApplicationInstall);
        const resultSett = result.settings;
        expect(resultSett.hasOwnProperty('authorization_settings')).toBeTruthy();
        expect(result.settings['authorization_settings']['user']).toEqual(user);
        expect(result.settings['authorization_settings']['password']).toEqual(pass);
        expect(result.settings['authorization_settings']['token']).toEqual(token);
    });
    it('getUri', function () {
        const app = new TestBasicApplication();
        expect(app.getUri('https://www.google.com')).toBeInstanceOf(URL);
    });
    it('getRequestDto', function () {3
        const app = new TestBasicApplication();
        const urlValue = 'http://www.google.com';
        const data = JSON.stringify({test: 'testData'});
        const method = HttpMethods.POST;
        const requestDto = app.getRequestDto(new ApplicationInstall(), method, urlValue, data);
        expect(requestDto).toBeInstanceOf(RequestDto);
        expect(requestDto).toHaveProperty('_url', urlValue);
        expect(requestDto).toHaveProperty('_method', method);
        expect(requestDto).toHaveProperty('_body', data);

        const requestDtoWithoutUrl = app.getRequestDto(new ApplicationInstall(), method);
        expect(requestDtoWithoutUrl).toHaveProperty('_url', '');
    });
    it('getApplicationForm', function () {
        const app = new TestBasicApplication();
        const appInstall = new ApplicationInstall();
        const sett = {form: {user: user, password: pass, token: token}};
        appInstall.addSettings(sett);
        app.getApplicationForm(appInstall);
    });
})
