import { cast } from "./cast";
import { IsString, isStringMessageBuilder } from "../../decorator/constraint/type/is-string.decorator";
import { Matches } from "../../decorator/constraint/string/matches.decorator";
import { IsNumber } from "../../decorator/constraint/type/is-number.decorator";
import { SkipIf } from "../../decorator/conditional/skip-if.decorator";
import { Required, requiredMessageBuilder } from "../../decorator/constraint/common/required.decorator";
import { IsEmail, isEmailMessageBuilder } from "../../decorator/constraint/string/is-email.decorator";
import { Nullable } from "../../decorator/conditional/nullable.decorator";
import { Length, lengthMessageBuilder } from "../../decorator/constraint/common/length.decorator";
import { Default } from "../../decorator/default-assignment/default.decorator";
import { IsBoolean, isBooleanMessageBuilder } from "../../decorator/constraint/type/is-boolean.decorator";
import { Map } from "../../decorator/transformer/map.decorator";
import { IsEquals } from "../../decorator/constraint/common/is-equals.decorator";

describe("[ExampleDTO01] cast high level behavior, focus on constraint 'iterate' behavior.", () => {
    class ExampleDTO01 {
        @Nullable()
        @Required()
        emptyField: any;

        @IsNumber()
        myAge: number;

        @Matches(/\d/, { iterate: true })
        @IsString()
        myId: string;

        @IsEmail({ domains: ["gmail.com"] })
        myEmail: string;

        @Required()
        blah: string;

        @Required({ iterate: true })
        listOfStuff: Array<any>;
    }

    it("casting pass.", () => {
        const providedValue = {
            myEmail: "autor@gmail.com",
            myAge: 30,
            myId: "12312332",
            listOfStuff: [1, 2, "123"],
            blah: "blah",
        };
        const expectedValue = providedValue;
        const { messages, resolvedValue } = cast(ExampleDTO01, providedValue);

        expect(messages.length).toEqual(0);
        expect(resolvedValue).toEqual(expectedValue);
    });

    it("casting fail.", () => {
        const expectedErrMessages = [
            isEmailMessageBuilder({ fieldName: "myEmail", options: {} } as any),
            requiredMessageBuilder({ fieldName: "listOfStuff", options: { iterate: true } } as any),
            requiredMessageBuilder({ fieldName: "blah", options: {} } as any),
        ];

        const { messages, resolvedValue } = cast(ExampleDTO01, {
            myEmail: "autor@gamil.com",
            myAge: 30,
            myId: "12312332",
            listOfStuff: [1, undefined, "123"],
        });

        expect(resolvedValue).toBeUndefined();
        expect(messages).toBeDefined();
        expect(messages.length).toEqual(3);
        expectedErrMessages.forEach((msg) => expect(messages).toContain(msg));
    });
});

describe("[ExampleDTO02] cast high level behavior, focus on Required & Nullable behavior.", () => {
    class ExampleDTO02 {
        @Required()
        importantMessage: string;

        @Nullable()
        @Required()
        @Length(5, 10)
        dumbMessage: any;

        @SkipIf((v, k, context) => context.firstName === "madona")
        @IsString()
        lastName: string;

        @IsString()
        firstName: string;
    }

    it("casting pass.", () => {
        const providedValue = {
            importantMessage: "cast can make things easier",
            dumbMessage: undefined,
            lastName: undefined,
            firstName: "madona",
        };
        const expectedValue = providedValue;

        const { messages, resolvedValue } = cast(ExampleDTO02, providedValue);

        expect(messages.length).toEqual(0);
        expect(resolvedValue).toEqual(expectedValue);
    });

    it("casting fail.", () => {
        const expectedErrMessages = [isStringMessageBuilder({ fieldName: "lastName", options: {} } as any)];

        const providedValue = {
            importantMessage: 123,
            dumbMessage: undefined,
            lastName: undefined,
            firstName: "kadona",
        };

        const { messages, resolvedValue } = cast(ExampleDTO02, providedValue);

        expect(resolvedValue).toBeUndefined();
        expect(messages).toBeDefined();
        expect(messages.length).toEqual(1);
        expectedErrMessages.forEach((msg) => expect(messages).toContain(msg));
    });
});

describe("[ExampleDTO03] cast high level behavior, focus on Default behavior.", () => {
    class ExampleDTO03 {
        @Default(({ context }) => context.name)
        nickname: string;

        @Required()
        @Length(5, 10)
        name: any;

        @Default(true)
        @IsBoolean()
        notifications: boolean;
    }

    it("missing values, casting pass.", () => {
        const providedValue = {
            name: "JohnSmith",
        };
        const expectedValue = {
            nickname: providedValue.name,
            name: providedValue.name,
            notifications: true,
        };

        const { messages, resolvedValue } = cast(ExampleDTO03, providedValue);

        expect(messages.length).toEqual(0);
        expect(resolvedValue).toEqual(expectedValue);
    });

    it("providing values, casting pass.", () => {
        const providedValue = {
            name: "JohnSmith",
            nickname: "Johny",
            notifications: false,
        };
        const expectedValue = providedValue;

        const { messages, resolvedValue } = cast(ExampleDTO03, providedValue);

        expect(messages.length).toEqual(0);
        expect(resolvedValue).toEqual(expectedValue);
    });

    it("casting fail.", () => {
        const expectedErrMessages = [
            lengthMessageBuilder({ fieldName: "name", options: {} } as any),
            isBooleanMessageBuilder({ fieldName: "notifications", options: {} } as any),
        ];

        const providedValue = {
            name: "bob",
            nickname: "Johny",
            notifications: 10,
        };

        const { messages, resolvedValue } = cast(ExampleDTO03, providedValue);

        expect(resolvedValue).toBeUndefined();
        expect(messages).toBeDefined();
        expect(messages.length).toEqual(2);
        expectedErrMessages.forEach((msg) => expect(messages).toContain(msg));
    });
});

describe("[ExampleDTO04] cast high level behavior, focus on Parsing.", () => {
    class ExampleDTO04 {
        @Map((v) => `${v}_mapped`)
        @Required()
        list: Array<string>;
    }

    it("casting pass.", () => {
        const providedValue = {
            list: ["a", "b"],
        };
        const expectedValue = {
            list: ["a_mapped", "b_mapped"],
        };

        const { messages, resolvedValue } = cast(ExampleDTO04, providedValue);

        expect(messages.length).toEqual(0);
        expect(resolvedValue).toEqual(expectedValue);
    });
});

describe("[ExampleDTO05] cast high level behavior, focus on tags.", () => {
    enum PermissionsEnum {
        ADMIN = "ADMIN",
        USER = "USER",
    }

    class ExampleDTO05 {
        @IsEmail()
        @IsString()
        email: string;

        @IsEquals(PermissionsEnum.ADMIN, { tags: ["admin"] })
        @IsEquals(PermissionsEnum.USER, { tags: ["user"] })
        permission: PermissionsEnum;

        @Nullable({ tags: ["user"] })
        @IsString({ tags: ["admin"] })
        department: string;
    }

    it("casting pass, using admin tag.", () => {
        const providedValue = {
            email: "someadmin@gmail.com",
            permission: PermissionsEnum.ADMIN,
            department: "sales",
        };
        const expectedValue = providedValue;

        const { messages, resolvedValue } = cast(ExampleDTO05, providedValue, { tags: ["admin"] });

        expect(messages.length).toEqual(0);
        expect(resolvedValue).toEqual(expectedValue);
    });

    it("casting fail, using admin tag.", () => {
        const providedValue = {
            email: "someadmin@gmail.com",
            permission: PermissionsEnum.USER,
            department: undefined,
        };
        // const expectedValue = providedValue;

        const { messages, resolvedValue } = cast(ExampleDTO05, providedValue, { tags: ["admin"] });

        expect(messages.length).toEqual(2);
        expect(resolvedValue).toBeUndefined();
    });

    it("casting pass, using user tag.", () => {
        const providedValue = {
            email: "someadmin@gmail.com",
            permission: PermissionsEnum.USER,
        };
        const expectedValue = providedValue;

        const { messages, resolvedValue } = cast(ExampleDTO05, providedValue, { tags: ["user"] });

        expect(messages.length).toEqual(0);
        expect(resolvedValue).toEqual(expectedValue);
    });

    it("casting fail, using user tag.", () => {
        const providedValue = {
            email: "someadmin@gmail.com",
            permission: PermissionsEnum.ADMIN,
        };
        // const expectedValue = providedValue;

        const { messages, resolvedValue } = cast(ExampleDTO05, providedValue, { tags: ["user"] });

        expect(messages.length).toEqual(1);
        expect(resolvedValue).toBeUndefined();
    });

    // it("casting pass, using no tags.", () => {

    //     const providedValue = {
    //         email: "someadmin@gmail.com",
    //         permission: PermissionsEnum.ADMIN
    //     }
    //     const expectedValue = providedValue;

    //     const { messages, resolvedValue } = cast(
    //         ExampleDTO05,
    //         providedValue,
    //     );

    //     expect(messages).toBeUndefined();
    //     expect(messages.length).toEqual(0);
    //     expect(resolvedValue).toEqual(expectedValue);
    // })
});
