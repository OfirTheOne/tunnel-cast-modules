



import { decoratorAdapter } from "../../core/factory/decorator-adapter";
import { FieldConstraintProcedure } from "../../core/field-decorator-procedure/field-constraint.procedure";
import { FieldConstraintProcedureOptions } from "../../models/interfaces/field-constraint-procedure-options";
import {  FieldConstraintFn} from "../../models/interfaces/field-constraint-fn";
import { escapeRegex } from "../../utils/escape-regex";


export const IS_EMAIL = "is_email";

const emailRegex = /^[a-z0-9!#$%&'*+=?^_‘{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_‘{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
const buildDomainSpecificEmailRegex = (domains: Array<string>) => new RegExp(
    "^[a-z0-9!#$%&'*+=?^_‘{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_‘{|}~-]+)*@(" +
    domains.map(dom => `(${escapeRegex(dom)})`).join('|') +
    ")?$");


/**
 * @decorator_type **FieldConstraintProcedure**
 * 
 * @param param0 
 */
export const isEmail: FieldConstraintFn<{isEmailOps?: {domains?: Array<string>}}> = 
    ({ fieldValue, args }) => {
        let usedEmailRegex = emailRegex;
        if(args?.isEmailOps?.domains?.length > 0) {
            usedEmailRegex = buildDomainSpecificEmailRegex(args.isEmailOps.domains)
        }
        return typeof fieldValue == 'string' && usedEmailRegex.test(fieldValue);
    };


export const isEmailMessageBuilder = ({ fieldName }) => `The field ${fieldName} is a valid email`;

export function IsEmail(isEmailOps?: {domains: Array<string>} ,options?: FieldConstraintProcedureOptions) {
    const adaptee = new FieldConstraintProcedure(
        IS_EMAIL,
        options,
        { isEmailOps },
        isEmail,
        isEmailMessageBuilder
    );
    return decoratorAdapter(adaptee);
}
