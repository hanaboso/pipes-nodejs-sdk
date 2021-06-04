import DateTimeUtils from "../../lib/Utils/DateTimeUtils";

export interface IApplicationSettings {
    [key: string]: string;
}

export class ApplicationInstall {

    private _id: string = '';
    private _deleted: boolean = false;

    private _user: string = '';
    private _key: string = '';
    private readonly _created: Date;
    private readonly _updated: Date;
    private _expires?: Date;
    private _settings: IApplicationSettings = {};
    private _encryptedSettings: string = '';
    private _nonEncryptedSettings: IApplicationSettings = {};


    public constructor() {
        this._created = DateTimeUtils.utcDate;
        this._updated = DateTimeUtils.utcDate;
    }

    get settings() {
        return this._settings;
    }

    get encryptedSettings() {
        return this._encryptedSettings;
    }

    get nonEncryptedSettings() {
        return this._nonEncryptedSettings;
    }

    get id() {
        return this._id;
    }

    get created() {
        return this._created;
    }

    get updated() {
        return this._updated;
    }

    get deleted() {
        return this._deleted;
    }

    get user() {
        return this._user;
    }

    get expires() {
        return this._expires;
    }

    get key() {
        return this._key;
    }

    get toArray() {
        const expires = this.expires;

        return {
            id: this.id,
            user: this.user,
            key: this.key,
            settings: this.settings,
            nonEncryptedSettings: this.nonEncryptedSettings,
            created: DateTimeUtils.getFormatedDate(this.created, DateTimeUtils.DATE_TIME),
            update: DateTimeUtils.getFormatedDate(this.updated, DateTimeUtils.DATE_TIME),
            expires: expires ? DateTimeUtils.getFormatedDate(expires, DateTimeUtils.DATE_TIME) : null,
        };
    }

    setSettings(settings: IApplicationSettings): ApplicationInstall {
        this._settings = settings;
        return this;
    }

    setNonEncryptedSettings(nonEncryptedSettings: IApplicationSettings): ApplicationInstall {
        this._nonEncryptedSettings = nonEncryptedSettings
        return this;
    }

    setEncryptedSettings(encryptedSettings: string): ApplicationInstall {
        this._encryptedSettings = encryptedSettings;
        return this;
    }

    addSettings(setting: IApplicationSettings): ApplicationInstall {
        this._settings = {...this._settings, ...setting};
        return this;
    }

    addNonEncryptedSettings(nonEncryptedSettings: IApplicationSettings) {
        this._nonEncryptedSettings = {...this._nonEncryptedSettings, ...nonEncryptedSettings};
        return this;
    }
}
