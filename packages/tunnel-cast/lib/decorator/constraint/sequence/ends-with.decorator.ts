import { FieldConstraintProcedureOptions } from "../../../models/interfaces/field-constraint-procedure-options";
import { decoratorAdapter } from "../../../core/factory/decorator-adapter";
import { FieldConstraintProcedure } from "../../../core/field-decorator-procedure/field-constraint.procedure";
import { FieldConstraintFn } from "../../../models/interfaces/field-constraint-fn";

export const ENDS_WITH = "endsWith";

const arrayEndsWithItems = (array: Array<any>, prefixItems: Array<any>) => {
    if (array.length >= prefixItems.length) {
        const skippedItems = array.length - prefixItems.length;
        return prefixItems.every((item, i) => array[i + skippedItems] === item);
    } else {
        return false;
    }
};

export const endsWith: FieldConstraintFn<{ value: Array<any> | string | any }> = ({ fieldValue, args }) => {
    if (typeof fieldValue == "string") {
        return fieldValue.endsWith(args.value);
    } else if (Array.isArray(fieldValue)) {
        return Array.isArray(args.value)
            ? arrayEndsWithItems(fieldValue, args.value)
            : fieldValue.lastIndexOf(args.value) == fieldValue.length - 1;
    } else {
        return false;
    }
};
export const endsWithMessageBuilder = ({ fieldName }) => `The field ${fieldName} dose not end with the provided value.`;

export function EndsWith(value: Array<any> | string | any, options?: FieldConstraintProcedureOptions) {
    const adaptee = new FieldConstraintProcedure(ENDS_WITH, options, { value }, endsWith, endsWithMessageBuilder);
    return decoratorAdapter(adaptee);
}
