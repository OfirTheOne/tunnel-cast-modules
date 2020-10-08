import { Number, String } from 'tunnel-cast/lib/common' 


export class QueryTest01 {
    @Number()
    skip: number;

    @Number()
    limit: number;

    @String()
    name: string;
}


export class QueryTest02 {
    @Number({
        min: 0,
        max: 50
    })
    skip: number;

    @Number({
        min: 0,
        max: 50
    })
    limit: number;

    @String()
    name: string;
}