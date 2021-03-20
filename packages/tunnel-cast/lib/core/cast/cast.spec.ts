
import { cast } from "./cast";
import { IsString } from "../../decorator/type/is-string";
import { IsMatch } from "../../decorator/common/is-match.decorator";
import { IsNumber } from "../../decorator/type/is-number";

import { SkipIf } from "../../decorator/common/skip-if.decorator";
import { Required, requiredMessageBuilder } from "../../decorator/common/required.decorator";


describe("cast", () => {
    
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

    it("try", () => {

        const expectedErrMessage = requiredMessageBuilder({fieldName: 'blah'});

        const { messages, resolvedValue } = cast(Demo, { myName: "Bob-3", myAge: "32" });
        
        expect(resolvedValue).toBeUndefined()
        expect(messages).toBeDefined()
        expect(messages.length).toEqual(1)
        expect(messages).toContain(expectedErrMessage);
    })

})

