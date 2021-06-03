import {Form} from "../Form";
import {Field} from "../Field";
import FieldType from "../FieldType";

describe('Test form', () => {
    it('getFields', function () {
        const form = new Form();
        expect(form.fields).toEqual([]);
    });
    it('addField', function () {
        const form = new Form();
        const field = new Field(FieldType.TEXT, 'testKey', 'testLabel');
        form.addField(field);
        expect(form.fields).toEqual([field]);
    });

    it('toArray', function () {

        const form = new Form();
        const field = new Field(FieldType.TEXT, 'testKey', 'testLabel');
        form.addField(field);
        const fieldsArray = form.toArray();
        const params = [
            'type', 'key', 'value', 'label', 'description', 'required', 'readOnly', 'disabled', 'choices'
        ];
        params.forEach(element => {
            expect(fieldsArray[0].hasOwnProperty(element)).toBeTruthy();
        });

    });

})
