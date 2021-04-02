import { IsString } from "../decorator/constraint/type/is-string";
import { IsNumber } from "../decorator/constraint/type/is-number";


export class ExampleDTO {

    @IsString()
    myName: string

    @IsNumber()
    myNumber: string
}