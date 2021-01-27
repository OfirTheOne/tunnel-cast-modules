import { generate } from './interface.template'


describe('interface.template', () => {

    it('generate interface single field', () => {

        const ctx = {
            name: 'student', 
            fields: [
                { name: 'age', type: 'number' }
            ]
        };

        const expected = 
        `\n`+
        `export interface student {\n`+
        `\n`+
        `    age: number;\n` +
        `\n`+
        `}\n`;
        
        const actual = generate(ctx, undefined);

        expect(actual).toEqual(expected);
    })

    it('generate interface camel case the name', () => {

        const ctx = {
            name: 'student', 
            fields: [
                { name: 'age', type: 'number' }
            ]
        };

        const expected = 
        `\n`+
        `export interface Student {\n`+
        `\n`+
        `    age: number;\n` +
        `\n`+
        `}\n`;
        
        const actual = generate(ctx, { interfaceNameCamelCase : true });

        expect(actual).toEqual(expected);
    })

    it('generate interface multiple field', () => {

        const ctx = {
            name: 'student', 
            fields: [
                { name: 'age', type: 'number' },
                { name: 'grades', type: 'Array<number>' }
            ]
        };

        const expected = 
        `\n`+
        `export interface student {\n`+
        `\n`+
        `    age: number;\n` +
        `\n`+
        `    grades: Array<number>;\n` +
        `\n`+
        `}\n`;
        
        const actual = generate(ctx, undefined);

        expect(actual).toEqual(expected);
    })

    it('generate interface no field', () => {

        const ctx = {
            name: 'student', 
            fields: []
        };

        const expected = 
        `\n`+
        `export interface student {\n`+
        `\n`+
        `}\n`;
        
        const actual = generate(ctx, undefined);

        expect(actual).toEqual(expected);
    })
})

