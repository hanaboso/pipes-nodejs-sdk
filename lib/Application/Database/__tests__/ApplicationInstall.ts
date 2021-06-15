import { ApplicationInstall } from '../ApplicationInstall';
import DateTimeUtils, { DATE_TIME } from '../../../Utils/DateTimeUtils';
import exp from "constants";

describe('ApplicationInstall tests', () => {
  const appInstall = new ApplicationInstall();
  it('get encryptedSettings', () => {
    expect(appInstall.encryptedSettings).toEqual('');
  });
  it('get nonEncryptedSettings', () => {
    expect(appInstall.nonEncryptedSettings).toEqual({});
  });
  it('get id', () => {
    expect(appInstall.id).toEqual('');
  });
  it('get deleted', () => {
    expect(appInstall.deleted).toEqual(false);
  });
  it('get user', () => {
    expect(appInstall.user).toEqual('');
  });
  it('get expires', () => {
    expect(appInstall.expires).toEqual(undefined);
  });
  it('get key', () => {
    expect(appInstall.key).toEqual('');
  });
  it('get toArray', () => {
    const expected = {
      created: DateTimeUtils.getFormattedDate(appInstall.created, DATE_TIME),
      expires: null,
      id: '',
      key: '',
      nonEncryptedSettings: {},
      settings: {},
      update: DateTimeUtils.getFormattedDate(appInstall.updated, DATE_TIME),
      user: '',
    };
    expect(appInstall.toArray).toEqual(expected);
  });
  it('addNonEncryptedSettings', () => {
    const sett = { nastaveni: 'nastaveni' };
    appInstall.addNonEncryptedSettings(sett);
    expect(appInstall.nonEncryptedSettings).toEqual(sett);
  });
  it('setSettings', () => {
    const sett = { nastaveni: 'nastaveni' };
    appInstall.setSettings(sett);
    expect(appInstall.settings).toEqual(sett);
  });
  it('setNonEncryptedSettings', () => {
    const sett = { nastaveni: 'nastaveni' };
    appInstall.setNonEncryptedSettings(sett);
    expect(appInstall.nonEncryptedSettings).toEqual(sett);
  });
  it('setEncryptedSettings', () => {
    const sett = 'hash123';
    appInstall.setEncryptedSettings(sett);
    expect(appInstall.encryptedSettings).toEqual(sett);
  });
  it('setExpires', function () {
    const date = DateTimeUtils.utcDate;
    appInstall.setExpires(date);
    expect(appInstall.expires).toEqual(date);
  });
});
