
import { cast } from "./cast";
import { IsString, isStringMessageBuilder } from "../../decorator/type/is-string";
import { IsMatch } from "../../decorator/string/is-match.decorator";
import { IsNumber } from "../../decorator/type/is-number";
import { SkipIf } from "../../decorator/common/skip-if.decorator";
import { Required, requiredMessageBuilder } from "../../decorator/common/required.decorator";
import { IsEmail, isEmailMessageBuilder } from "../../decorator/string/is-email.decorator";
import { Nullable } from "../../decorator/common/nullable.decorator";
import { Length } from "../../decorator/common/length.decorator";
import { Default } from "../../decorator/common/default.decorator";
import { IsBoolean } from "../../decorator/type/is-boolean";

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

    it("ExampleDTO01 general usage testing, focus on constraint 'iterate' behavior, casting pass.", () => {
        const providedValue = { 
            myEmail: "autor@gmail.com",
            myAge: 30, 
            myId: "12312332", 
            listOfStuff: [1, 2, "123"],
            blah: "blah",
        }
        const expectedValue = providedValue;
        const { messages, resolvedValue } = cast(
            ExampleDTO01, 
            providedValue
        );
        
        expect(messages.length).toEqual(0);
        expect(resolvedValue).toEqual(expectedValue);
    })


    it("ExampleDTO01 general usage testing, focus on constraint 'iterate' behavior, casting fail.", () => {

        const expectedErrMessages = [
            isEmailMessageBuilder({fieldName: 'myEmail', options: {} } as any),
            requiredMessageBuilder({fieldName: 'listOfStuff', options: { iterate: true } } as any),
            requiredMessageBuilder({fieldName: 'blah', options: {} } as any),
        ];

        const { messages, resolvedValue } = cast(
            ExampleDTO01, 
            { 
                myEmail: "autor@gamil.com",
                myAge: 30, 
                myId: "12312332", 
                listOfStuff: [1, undefined, "123"] 
            }
        );
        
        expect(resolvedValue).toBeUndefined();
        expect(messages).toBeDefined();
        expect(messages.length).toEqual(3);
        expectedErrMessages.forEach(msg => expect(messages).toContain(msg));
    })


    class ExampleDTO02 {
        @Required()
        importantMessage: string;

        @Nullable()
        @Required()
        @Length(5, 10)
        dumbMessage: any;

        @SkipIf((v, k, context) => context.firstName === "madona" )
        @IsString() 
        lastName: string;

        @IsString() 
        firstName: string;

    }

    it("ExampleDTO02 general usage testing, focus on Required & Nullable behavior, casting pass.", () => {

        const providedValue = { 
            importantMessage: "cast can make things easier",
            dumbMessage: undefined, 
            lastName: undefined, 
            firstName: "madona"
        }
        const expectedValue = providedValue;

        const { messages, resolvedValue } = cast(
            ExampleDTO02, 
            providedValue
        );
        
        expect(messages.length).toEqual(0);
        expect(resolvedValue).toEqual(expectedValue);
    })

    it("ExampleDTO02 general usage testing, focus on Required & Nullable behavior, casting fail.", () => {
        const expectedErrMessages = [
            isStringMessageBuilder({fieldName: 'lastName', options: {} } as any),
        ];

        const providedValue = { 
            importantMessage: 123,
            dumbMessage: undefined, 
            lastName: undefined, 
            firstName: "kadona"
        };

        const { messages, resolvedValue } = cast(
            ExampleDTO02, 
            providedValue
        );
        
        expect(resolvedValue).toBeUndefined();
        expect(messages).toBeDefined();
        expect(messages.length).toEqual(1);
        expectedErrMessages.forEach(msg => expect(messages).toContain(msg));
    })

    class ExampleDTO03 {
        @Default( ({context}) => context.name )
        nickname: string;

        @Required()
        @Length(5, 10)
        name: any;

        @Default(true)
        @IsBoolean() 
        notifications: boolean;

    }


    it("ExampleDTO03 general usage testing, focus on Default behavior, casting pass.", () => {

        const providedValue = { 
            name: "JohnSmith"
        }
        const expectedValue = {
            nickname: providedValue.name,
            name: providedValue.name,
            notifications: true
        } 

        const { messages, resolvedValue } = cast(
            ExampleDTO03, 
            providedValue
        );
        
        expect(messages.length).toEqual(0);
        expect(resolvedValue).toEqual(expectedValue);
    })

})

