import { FieldConstraintProcedureOptions } from "../../models/interfaces/field-constraint-procedure-options";
import { decoratorAdapter } from "../../core/factory/decorator-adapter";
import { FieldConstraintProcedure } from "../../core/field-decorator-procedure/field-constraint.procedure";
import { FieldConstraintFn } from "../../models/interfaces/field-constraint-fn";

export const LENGTH = "length";
export const length: FieldConstraintFn<{len: number, min: number, max: number}> = ({ fieldValue, args }) => {
    return ('length' in fieldValue && typeof fieldValue.length == 'number') ?
        ( args.len != undefined ?
            args.len == fieldValue :
            ((args.max == undefined || args.min <= fieldValue) && (args.max == undefined || args.max >= fieldValue))
        ) : false;
};
export const lengthMessageBuilder = ({ fieldName }) => `The length of the field ${fieldName} dose not match the length constraint.`;


/**
 * @decorator_type **FieldConstraintProcedure**
 * 
 * @param len 
 * @param options 
 */
export function Length(len: number, options?: FieldConstraintProcedureOptions): PropertyDecorator;
/**
 * @decorator_type **FieldConstraintProcedure**
 *
 * @param min 
 * @param max 
 * @param options 
 */
export function Length(min: number, max: number, options?: FieldConstraintProcedureOptions): PropertyDecorator;
/**
 * @decorator_type **FieldConstraintProcedure**
 * 
 * @param min 
 * @param maxOrOptions 
 * @param options 
 */
export function Length(min: number, maxOrOptions?: number | FieldConstraintProcedureOptions, options?: FieldConstraintProcedureOptions) {
    const constraintArgs = (maxOrOptions == undefined ? { len: min } : {min, max: maxOrOptions}) as {min: number, max: number, len: number};
    const constraintOptions = maxOrOptions != undefined && typeof maxOrOptions == 'object' ? maxOrOptions : options;
    const adaptee = new FieldConstraintProcedure(
        LENGTH,
        constraintOptions,
        constraintArgs,
        length,
        lengthMessageBuilder
    );
    return decoratorAdapter(adaptee);
}
