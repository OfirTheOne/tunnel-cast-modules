
import { globalSetting } from "../../core/globals/globals";
import { decoratorAdapter } from "../../core/factory/decorator-adapter";
import { FieldConstraintProcedure } from "../../core/field-decorator-procedure/field-constraint.procedure";

export const REQUIRED = "required";

export const required = ({ fieldValue, fieldName ,args }) => !globalSetting.defaultEmptyIdentifier({fieldValue} as any);

export function Required() {
    const adaptee = new FieldConstraintProcedure(
        REQUIRED,
        {},
        [],
        required,
        ({ fieldName }) => `The field ${fieldName} is required.`

    );
    return decoratorAdapter(adaptee);
}
