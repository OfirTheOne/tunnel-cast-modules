import { ErrorCode } from "@tunnel-cast/core/enums/error-code.enum";

import { cast } from "../../../../cast";
import { number } from "./number.decorator";

describe("number Decorator", () => {
    it("should validate the target field value with no errors", () => {
        class TestClass {
            @number()
            num: number;
        }

        const value = { num: 120 };
        const result = cast(TestClass, value);

        expect(result.errors).toBeUndefined();
        expect(result.value).toEqual(value);
    });

    it("should validate the target field value with TypeConditionError", () => {
        class TestClass {
            @number()
            num: number;
        }

        const value = { num: "120" };
        const result = cast(TestClass, value);

        expect(result.errors.length).toEqual(1);
        expect(result.errors[0].fieldName).toEqual("num");
        expect((result.errors[0].errors[0] as any).code).toEqual(ErrorCode.TypeConditionError);
    });
});
