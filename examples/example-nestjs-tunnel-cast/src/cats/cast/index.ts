import { String, Number, Required, Default, Parsing } from '@tunnel-cast/common';


export namespace GetAllCats {

    export class Query {
        @Required(false)
        @Default(10)
        @Number.Min(1)
        @Number.Max(15)
        @Parsing(global.Number)
        @Number()
        limit: number;

        @Required(false)
        @Default(0)
        @Number.Min(0)
        @Parsing(global.Number)
        @Number()
        skip: number;        
    }

}
export namespace GetCatsByType {

    export class Params {
        @Required(true)
        @String.Enums(['hose_cat', 'bobcat', 'tiger'])
        @String()
        type: string;
    }
}