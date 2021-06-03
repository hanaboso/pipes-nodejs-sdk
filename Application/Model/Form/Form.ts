import {Field} from "./Field";

export class Form {
    private _fields: Array<Field> = [];

    public addField(field: Field): Form {
        this.fields.push(field);
        return this;
    }

    public get fields() {
        return this._fields;
    }

    public toArray(): Array<any> {
        let fieldsArray: Array<any> = [];
        this.fields.forEach(element => {
            fieldsArray.push(element.toArray);
        });

        return fieldsArray;
    }

}
