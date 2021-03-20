
import { globalSetting } from "../../core/globals/globals";
import { decoratorAdapter } from "../../core/factory/decorator-adapter";
import { FieldConstraintProcedure } from "../../core/field-decorator-procedure/field-constraint.procedure";
import { FieldConstraintProcedureOptions } from "../../models/interfaces/field-constraint-procedure-options";
import { MessageBuilderFn } from "../../models/interfaces/message-builder-fn";

export const REQUIRED = "required";
export const required = ({ fieldValue }) => !globalSetting.defaultEmptyIdentifier({fieldValue} as any);
export const requiredMessageBuilder: MessageBuilderFn = ({ fieldName, options }) => options.iterate ?
    `Each value in the field ${fieldName} is required.` :
    `The field ${fieldName} is required.`;

export function Required(options?: FieldConstraintProcedureOptions) {
    const adaptee = new FieldConstraintProcedure(
        REQUIRED,
        options||{},
        {},
        required,
        requiredMessageBuilder
    );
    return decoratorAdapter(adaptee);
}
