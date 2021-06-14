import { id } from 'mongodb-typescript';
import DateTimeUtils, { DATE_TIME } from '../../Utils/DateTimeUtils';

export interface IApplicationSettings {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

export interface IApplicationInstallArray {
    id: string,
    user: string,
    key: string,
    settings: IApplicationSettings,
    nonEncryptedSettings: IApplicationSettings,
    created: string,
    update: string,
    expires: string | null,
}

export class ApplicationInstall {
    @id
    private _id = '';

    private _deleted = false;

    private _user = '';

    private _key = '';

    private readonly _created: Date;

    private readonly _updated: Date;

    private _expires?: Date;

    private _settings: IApplicationSettings = {};

    private _encryptedSettings = '';

    private _nonEncryptedSettings: IApplicationSettings = {};

    public constructor() {
      this._created = DateTimeUtils.utcDate;
      this._updated = DateTimeUtils.utcDate;
    }

    get settings(): IApplicationSettings {
      return this._settings;
    }

    get encryptedSettings(): string {
      return this._encryptedSettings;
    }

    get nonEncryptedSettings(): IApplicationSettings {
      return this._nonEncryptedSettings;
    }

    get id(): string {
      return this._id;
    }

    get created(): Date {
      return this._created;
    }

    get updated(): Date {
      return this._updated;
    }

    get deleted(): boolean {
      return this._deleted;
    }

    get user(): string {
      return this._user;
    }

    get expires(): Date | undefined {
      return this._expires;
    }

    get key(): string {
      return this._key;
    }

    get toArray(): IApplicationInstallArray {
      return {
        id: this.id,
        user: this.user,
        key: this.key,
        settings: this.settings,
        nonEncryptedSettings: this.nonEncryptedSettings,
        created: DateTimeUtils.getFormattedDate(this.created, DATE_TIME),
        update: DateTimeUtils.getFormattedDate(this.updated, DATE_TIME),
        expires: this.expires ? DateTimeUtils.getFormattedDate(this.expires, DATE_TIME) : null,
      };
    }

    setSettings(settings: IApplicationSettings): ApplicationInstall {
      this._settings = settings;
      return this;
    }

    setNonEncryptedSettings(nonEncryptedSettings: IApplicationSettings): ApplicationInstall {
      this._nonEncryptedSettings = nonEncryptedSettings;
      return this;
    }

    setEncryptedSettings(encryptedSettings: string): ApplicationInstall {
      this._encryptedSettings = encryptedSettings;
      return this;
    }

    addSettings(setting: IApplicationSettings): ApplicationInstall {
      this._settings = { ...this._settings, ...setting };
      return this;
    }

    addNonEncryptedSettings(nonEncryptedSettings: IApplicationSettings): ApplicationInstall {
      this._nonEncryptedSettings = { ...this._nonEncryptedSettings, ...nonEncryptedSettings };
      return this;
    }

    public static getCollection(): string {
      return 'ApplicationInstall';
    }
}
