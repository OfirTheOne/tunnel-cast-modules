import { FieldHandler } from '../field-handler';
import { Class } from './../utils/type-helpers'
import { FieldOptionProcessor } from './../field-option-processor';

export class RegisteredTypeProvider {

    typeName: string;
    typeHandlerId: string | symbol;
    handlerClass: Class<FieldHandler>;
    optionsProcessor: FieldOptionProcessor
}