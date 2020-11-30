

import { BaseFieldOptions } from './field-options';

export interface FieldEmbeddedData {
    fieldKey: string;
    options: BaseFieldOptions;
    typeHandlerId: string | symbol;
    handlerArgs?: Array<any>;
}