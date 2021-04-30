import { IsString } from "../decorator/constraint/type/is-string.decorator";
import { IsNumber } from "../decorator/constraint/type/is-number.decorator";

export class ExampleDTO {
    @IsString()
    myName: string;

    @IsNumber()
    myNumber: string;
}
