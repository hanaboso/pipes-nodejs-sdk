import {ApplicationInterface} from "./ApplicationInterface";
import RequestDto from "../../lib/Transport/Curl/RequestDto";
import {Form} from "../Model/Form/Form";
import {ApplicationInstall, IApplicationSettings} from "../Database/ApplicationInstall";
import FieldType from "../Model/Form/FieldType";
import ApplicationTypeEnum from "./ApplicationTypeEnum";


export abstract class ApplicationAbstract implements ApplicationInterface {

    readonly FORM = 'form';

    protected _authorizationType: string = '';
    protected _key: string = '';
    protected _name: string = '';
    protected _description: string = '';
    protected _settingsForm: Form = new Form();

    get authorizationType() {
        return this._authorizationType;
    };

    get applicationType() {
        return ApplicationTypeEnum.CRON;
    };

    get key() {
        return this._key;
    }

    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }

    get settingsForm() {
        return this._settingsForm;
    }

    abstract isAuthorized(applicationInstall: ApplicationInstall): boolean;

    abstract getRequestDto(
        applicationInstall: ApplicationInstall,
        method: string,
        url?: string,
        data?: string
    ): RequestDto;

    getApplicationForm(applicationInstall: ApplicationInstall): object {

        const settings = applicationInstall.settings[this.FORM] ?? [];
        let form = this.settingsForm;

        form.fields.forEach(field => {
            if (settings.includes(field.key)) {
                if (field.type === FieldType.PASSWORD) {
                    field.setValue(true);
                }
            }

        })

        return form.toArray();
    }

    setApplicationSettings(applicationInstall: ApplicationInstall, settings: IApplicationSettings): ApplicationInstall {
        let preparedSettings: IApplicationSettings = {};
        this.settingsForm.fields.forEach(field => {
            if (settings.hasOwnProperty(field.key)) {
                preparedSettings[field.key] = settings[field.key];
            }

        });
        applicationInstall.addSettings(preparedSettings);
        return applicationInstall;
    }

    getUri(url?: string): URL {
        return new URL(url ?? '');
    }

    toArray(): object {
        return {
            name: this.name,
            authorization_type: this.authorizationType,
            application_type: this.applicationType,
            key: this.key,
            description: this.description,

        }
    }
}
