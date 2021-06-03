import FieldType from "./FieldType";

export class Field {

    private _description: string = '';
    private readOnly: boolean = false;
    private disabled: boolean = false;
    private _choices: Array<any> = [];

    public constructor(
        private _type: FieldType,
        private _key: string,
        private _label: string,
        private _value: any = null,
        private required: boolean = false,
    ) {
        if (!this.types.includes(_type)) {
            //TODO exception
        }
    }

    public get type() {
        return this._type;
    }

    public get key() {
        return this._key;
    }

    public get value() {
        return this._value;
    }

    public get label() {
        return this._label;
    }

    public get description() {
        return this._description;
    }

    public get choices() {
        return this._choices;
    }

    public get isRequired() {
        return this.required;
    }

    public get isReadOnly() {
        return this.readOnly;
    }

    public get isDisabled() {
        return this.disabled;
    }

    public get types() {
        return Object.values(FieldType);
    }

    public get toArray() {

        return {
            'type': this.type,
            'key': this.key,
            'value': this.value,
            'label': this.label,
            'description': this.description,
            'required': this.isRequired,
            'readOnly': this.isReadOnly,
            'disabled': this.isDisabled,
            'choices': this.choices,
        };
    }

    public setLabel(label: string): Field {
        this._label = label;
        return this;
    }

    public setDescription(description: string): Field {
        this._description = description;
        return this;
    }

    public setRequired(required: boolean): Field {
        this.required = required;
        return this;
    }

    public setReadOnly(readOnly: boolean): Field {
        this.readOnly = readOnly;
        return this;
    }

    public setDisabled(disabled: boolean): Field {
        this.disabled = disabled;
        return this;
    }

    public setChoices(choices: Array<any>): Field {
        this._choices = choices;
        return this;
    }

}
