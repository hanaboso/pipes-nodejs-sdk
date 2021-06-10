import Field, { IFieldArray } from './Field';

export default class Form {
    private _fields: Array<Field> = [];

    public addField(field: Field): Form {
      this.fields.push(field);
      return this;
    }

    public get fields(): Array<Field> {
      return this._fields;
    }

    public toArray(): Array<IFieldArray> {
      const fieldsArray: Array<IFieldArray> = [];
      this.fields.forEach((element) => {
        fieldsArray.push(element.toArray);
      });

      return fieldsArray;
    }
}
