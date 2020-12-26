import { String, Number, Required, Default, Parsing } from '@tunnel-cast/common';


export namespace SearchBirds {

    export class Query {

        @String.MinLength(1)
        @String.MaxLength(30)
        @String.Format(/[A-Za-z\s]/)
        @Required(true)
        @String()
        searchTerm: string;

        @Number.Min(1)
        @Number.Max(15)
        @Parsing(global.Number)
        @Required(false)
        @Default(10)
        @Number()
        limit: number;

        @Number.Min(0)
        @Parsing(global.Number)
        @Required(false)
        @Default(0)
        @Number()
        skip: number;        
    }

}
export namespace GetBirdsByType {

    export class Params {
        @String.StartsWith('flying_')
        @Required(true)
        @String()
        type: string;
    }
}