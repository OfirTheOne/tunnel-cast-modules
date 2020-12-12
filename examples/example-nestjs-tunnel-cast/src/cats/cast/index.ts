import { Number, Required } from '@tunnel-cast/common';


export namespace GetAllCats {

    export class Query {
        @Required(false)
        @Number()
        @Number.Max(30)
        limit: number;

        @Number()
        skip: number;
        
    }
}