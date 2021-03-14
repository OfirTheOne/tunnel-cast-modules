import { IsString } from "../decorator/type/is-string";
import { IsNumber } from "../decorator/type/is-number";


export class ExampleDTO {

    @IsString()
    myName: string

    @IsNumber()
    myNumber: string
}