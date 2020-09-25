

import { BaseFieldOptions } from '../public/field-options';
import { Class } from '../../utils/model';

export interface FieldEmbeddedData {
    fieldKey: string;
    options: BaseFieldOptions;
    fieldTypeId: string | symbol;
    handlerArgs?: Array<any>;
    fieldHandlerClass: Class<any>;
}