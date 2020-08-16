

import { BaseFieldOptions } from './field-options';
import { Class } from '../utils/model';

export interface FieldEmbeddedData {
    fieldKey: string;
    options: BaseFieldOptions;
    handlerArgs?: Array<any>;
    fieldHandlerClass: Class<any>;
}