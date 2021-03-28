import { deepStrictEqual } from "assert";

import { FieldConstraintProcedureOptions } from "../../models/interfaces/field-constraint-procedure-options";
import { decoratorAdapter } from "../../core/factory/decorator-adapter";
import { FieldConstraintProcedure } from "../../core/field-decorator-procedure/field-constraint.procedure";
import { FieldConstraintFn } from "../../models/interfaces/field-constraint-fn";
import { MessageBuilderFn } from "../../models/interfaces/message-builder-fn";

export const IS_EQUALS = "is-equals";
export const isEquals: FieldConstraintFn<{ value: any, strict: boolean }> = ({ fieldValue, args }) => {
    if(args.strict == false) {
        return args.value == fieldValue
    } else {
        try {
            deepStrictEqual(fieldValue, args.value);
            return true;
        } catch (error) {
            return false;
        }
    }
};
export const isEqualsMessageBuilder: MessageBuilderFn = ({ fieldName, options }) => options.iterate ?
    `Some values in the field ${fieldName} are not a pass assertion.` :
    `The field ${fieldName} is not pass assertion.`;

/**
 * @decorator_type **FieldConstraintProcedure**
 * 
 * @param options 
 */
export function IsEquals(value: any, strict: boolean , options?: FieldConstraintProcedureOptions): PropertyDecorator;
export function IsEquals(value: any, options?: FieldConstraintProcedureOptions): PropertyDecorator;
export function IsEquals(value: any, strictOrOptions: (boolean | FieldConstraintProcedureOptions), options?: FieldConstraintProcedureOptions) {
    
    const strict = typeof strictOrOptions == 'boolean' ? strictOrOptions : true;
    const actualOptions = typeof strictOrOptions == 'boolean' ? options : strictOrOptions  
    const adaptee = new FieldConstraintProcedure(
        IS_EQUALS,
        actualOptions||{},
        { value, strict },
        isEquals,
        isEqualsMessageBuilder
    );
    return decoratorAdapter(adaptee);
}
