



import { decoratorAdapter } from "../../../core/factory/decorator-adapter";
import { FieldConstraintProcedure } from "../../../core/field-decorator-procedure/field-constraint.procedure";
import { FieldConstraintProcedureOptions } from "../../../models/interfaces/field-constraint-procedure-options";
import {  FieldConstraintFn} from "../../../models/interfaces/field-constraint-fn";
import { escapeRegex } from "../../../utils/escape-regex";


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
export const isEmail: FieldConstraintFn<{domains?: Array<string>}> = 
    ({ fieldValue, args }) => {
        let usedEmailRegex = emailRegex;
        if(args?.domains?.length > 0) {
            usedEmailRegex = buildDomainSpecificEmailRegex(args.domains)
        }
        return typeof fieldValue == 'string' && usedEmailRegex.test(fieldValue);
    };


export const isEmailMessageBuilder = ({ fieldName }) => `The field ${fieldName} is a valid email`;

export function IsEmail(domains: Array<string> ,options?: FieldConstraintProcedureOptions): PropertyDecorator;
export function IsEmail(options?: FieldConstraintProcedureOptions): PropertyDecorator;
export function IsEmail(domainsOrOps?: (Array<string> | FieldConstraintProcedureOptions) ,options?: FieldConstraintProcedureOptions) {
    const domains = (arguments.length == 1 && Array.isArray(domainsOrOps)) ? domainsOrOps : [];
    const actualOptions = 
        (arguments.length == 2) ? options : 
        (arguments.length == 1 && typeof domainsOrOps == 'object') ? 
            domainsOrOps : undefined;

    const adaptee = new FieldConstraintProcedure(
        IS_EMAIL,
        actualOptions as FieldConstraintProcedureOptions,
        { domains },
        isEmail,
        isEmailMessageBuilder
    );
    return decoratorAdapter(adaptee);
}
