import { ApplicationInstall } from '../ApplicationInstall';
import DateTimeUtils, { DATE_TIME } from '../../../Utils/DateTimeUtils';

describe('ApplicationInstall tests', () => {
  const appInstall = new ApplicationInstall();
  it('get encryptedSettings', () => {
    expect(appInstall.getEncryptedSettings()).toEqual('');
  });
  it('get nonEncryptedSettings', () => {
    expect(appInstall.getNonEncryptedSettings()).toEqual({});
  });
  it('get id', () => {
    expect(appInstall.getId()).toEqual('');
  });
  it('get deleted', () => {
    expect(appInstall.getDeleted()).toEqual(false);
  });
  it('get user', () => {
    expect(appInstall.getUser()).toEqual('');
  });
  it('get expires', () => {
    expect(appInstall.getExpires()).toEqual(undefined);
  });
  it('get key', () => {
    expect(appInstall.getKey()).toEqual('');
  });
  it('get toArray', () => {
    const expected = {
      created: DateTimeUtils.getFormattedDate(appInstall.getCreated(), DATE_TIME),
      expires: null,
      id: '',
      key: '',
      nonEncryptedSettings: {},
      settings: {},
      update: DateTimeUtils.getFormattedDate(appInstall.getUpdated(), DATE_TIME),
      user: '',
    };
    expect(appInstall.toArray()).toEqual(expected);
  });
  it('addNonEncryptedSettings', () => {
    const sett = { sett: 'ings' };
    appInstall.addNonEncryptedSettings(sett);
    expect(appInstall.getNonEncryptedSettings()).toEqual(sett);
  });
  it('setSettings', () => {
    const sett = { sett: 'ings' };
    appInstall.setSettings(sett);
    expect(appInstall.getSettings()).toEqual(sett);
  });
  it('setNonEncryptedSettings', () => {
    const sett = { sett: 'ings' };
    appInstall.setNonEncryptedSettings(sett);
    expect(appInstall.getNonEncryptedSettings()).toEqual(sett);
  });
  it('setEncryptedSettings', () => {
    const sett = 'hash123';
    appInstall.setEncryptedSettings(sett);
    expect(appInstall.getEncryptedSettings()).toEqual(sett);
  });
});
