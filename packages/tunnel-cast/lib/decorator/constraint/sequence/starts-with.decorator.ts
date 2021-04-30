import { FieldConstraintProcedureOptions } from "../../../models/interfaces/field-constraint-procedure-options";
import { decoratorAdapter } from "../../../core/factory/decorator-adapter";
import { FieldConstraintProcedure } from "../../../core/field-decorator-procedure/field-constraint.procedure";
import { FieldConstraintFn } from "../../../models/interfaces/field-constraint-fn";

export const STARTS_WITH = "startsWith";

const arrayStartsWithItems = (array: Array<any>, prefixItems: Array<any>) =>
    array.length >= prefixItems.length ? prefixItems.every((item, i) => array[i] === item) : false;

export const startsWith: FieldConstraintFn<{ value: Array<any> | string | any }> = ({ fieldValue, args }) => {
    if (typeof fieldValue == "string") {
        return fieldValue.startsWith(args.value);
    } else if (Array.isArray(fieldValue)) {
        return Array.isArray(args.value)
            ? arrayStartsWithItems(fieldValue, args.value)
            : fieldValue.indexOf(args.value) == 0;
    } else {
        return false;
    }
};
export const startsWithMessageBuilder = ({ fieldName }) =>
    `The field ${fieldName} dose not start with the provided value.`;

export function StartsWith(value: Array<any> | string | any, options?: FieldConstraintProcedureOptions) {
    const adaptee = new FieldConstraintProcedure(STARTS_WITH, options, { value }, startsWith, startsWithMessageBuilder);
    return decoratorAdapter(adaptee);
}
