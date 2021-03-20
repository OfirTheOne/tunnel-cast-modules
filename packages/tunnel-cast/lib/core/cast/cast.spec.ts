
import { cast } from "./cast";
import { IsString } from "../../decorator/type/is-string";
import { IsMatch } from "../../decorator/common/is-match.decorator";
import { IsNumber } from "../../decorator/type/is-number";

import { SkipIf } from "../../decorator/common/skip-if.decorator";
import { Required, requiredMessageBuilder } from "../../decorator/common/required.decorator";
import { IsEmail } from "../../decorator/common/is-email.decorator";
import { Nullable } from "../../decorator/common/nullable.decorator";


test.todo("cast test on SkipIf & Nullable");
test.todo("cast test on Default");
test.todo("cast test on common application usage");

describe("cast high level expected behavior.", () => {
    
    class ExampleDTO01 {

        @Nullable()
        @Required()
        emptyField: any;

        @IsNumber()
        myAge: number;
    
        @IsMatch(/\d/, { iterate: true })
        @IsString()
        myId: string;
    
        @IsEmail({ domains: ['gmail.com'] })
        myEmail: string;

        @Required()
        blah: string;

        @Required({ iterate: true })
        listOfStuff: Array<any>;
    }

    it("ExampleDTO01 general usage testing, focus on constraint 'iterate'", () => {

        const expectedErrMessages = [
            requiredMessageBuilder({fieldName: 'listOfStuff', options: { iterate: true } } as any),
            requiredMessageBuilder({fieldName: 'blah', options: {} } as any),
        ]

        const { messages, resolvedValue } = cast(
            ExampleDTO01, 
            { 
                myEmail: "autor@gmail.com",
                myAge: 30, 
                myId: "12312332", 
                listOfStuff: [1, undefined, "123"] 
            }
        );
        
        expect(resolvedValue).toBeUndefined();
        expect(messages).toBeDefined();
        expect(messages.length).toEqual(2);
        expectedErrMessages.forEach(msg => expect(messages).toContain(msg));
    })

})

