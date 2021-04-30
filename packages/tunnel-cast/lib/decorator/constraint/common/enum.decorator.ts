import { FieldConstraintProcedureOptions } from "../../../models/interfaces/field-constraint-procedure-options";
import { decoratorAdapter } from "../../../core/factory/decorator-adapter";
import { FieldConstraintProcedure } from "../../../core/field-decorator-procedure/field-constraint.procedure";
import { FieldConstraintFn } from "../../../models/interfaces/field-constraint-fn";
import { MessageBuilderFn } from "../../../models/interfaces/message-builder-fn";

export const IS_ENUM = "is-enum";
export const isEnum: FieldConstraintFn<{ enumOrList: Array<string> | Object }> = ({ fieldValue, args, context }) => {
    return Array.isArray(args.enumOrList)
        ? args.enumOrList.includes(fieldValue)
        : Object.values(args.enumOrList).includes(fieldValue);
};
export const isEnumMessageBuilder: MessageBuilderFn = ({ fieldName, options }) =>
    options.iterate
        ? `Some values in the field ${fieldName} are not a valid enum.`
        : `The field ${fieldName} is not a valid enum.`;

/**
 * @decorator_type **FieldConstraintProcedure**
 *
 * @param mapper
 * @param options
 */
export function IsEnum(list: Array<string>, options?: FieldConstraintProcedureOptions): PropertyDecorator;
export function IsEnum(enumObj: Object, options?: FieldConstraintProcedureOptions): PropertyDecorator;
export function IsEnum(enumOrList: Array<string> | Object, options?: FieldConstraintProcedureOptions) {
    const adaptee = new FieldConstraintProcedure(IS_ENUM, options || {}, { enumOrList }, isEnum, isEnumMessageBuilder);
    return decoratorAdapter(adaptee);
}
