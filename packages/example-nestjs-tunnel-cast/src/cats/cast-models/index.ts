import * as castType from 'tunnel-cast/dist/lib/common/decorator/field-type';
import * as castOps from 'tunnel-cast/dist/lib/common/decorator/field-options';


export namespace GetAllCats {

    export class Query {
        @castOps.Required(false)
        @castType.Number()
        limit: number;

        @castType.Number()
        skip: number;
        
    }
}