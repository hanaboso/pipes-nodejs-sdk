import RequestDto from "../../lib/Transport/Curl/RequestDto";
import HttpMethods from "../../lib/Transport/HttpMethods";
import {BasicApplicationAbstract} from "../../lib/Authorization/Type/Basic/BasicApplicationAbstract";
import Form from "../../lib/Application/Model/Form/Form";
import FieldType from "../../lib/Application/Model/Form/FieldType";
import {ApplicationInstall} from "../../lib/Application/Database/ApplicationInstall";
import Field from "../../lib/Application/Model/Form/Field";

export default class TestBasicApplication extends BasicApplicationAbstract {

    syncTestSyncMethod(): string {
        return JSON.stringify({
            param1: 'p1',
            param2: 'p2',
        })
    }

    getDescription(): string {
        return "Test description";
    }

    getName(): string {
        return "test";
    }

    getPublicName(): string {
        return "Test application";
    }

    getSettingsForm(): Form {
        const type = FieldType.PASSWORD;
        const key = 'testKey';
        const label = 'testLabel';
        const fieldText = new Field(FieldType.TEXT, 'person', label);
        const field = new Field(type, key, label);

        const form = new Form();
        form.addField(field);
        form.addField(fieldText);
        return form;
    }

    getRequestDto(applicationInstall: ApplicationInstall, method: HttpMethods, url?: string, data?: string):
        RequestDto {
        return new RequestDto(url ?? '', method, data);
    }

}
