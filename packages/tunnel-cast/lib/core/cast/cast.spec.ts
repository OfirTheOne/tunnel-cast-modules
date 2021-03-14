
import { cast } from "./cast";
import { IsString } from "../../decorator/type/is-string";
import { IsMatch } from "../../decorator/common/is-match.decorator";
import { IsNumber } from "../../decorator/type/is-number";

import { SkipIf } from "../../decorator/common/skip-if.decorator";
import { Required } from "../../decorator/common/required.decorator";

class Demo {
    @SkipIf(({fieldValue}) => fieldValue == "32")
    @IsNumber()
    myAge: number;

    @IsMatch(/Bob-\d{2}/)
    @IsString()
    myName: string

    @Required()
    blah: string


}

describe("cast", () => {


    it("try", () => {

        const result = cast(Demo, { myName: "Bob-3", myAge: "32" });
        console.log(result);
    })

})

