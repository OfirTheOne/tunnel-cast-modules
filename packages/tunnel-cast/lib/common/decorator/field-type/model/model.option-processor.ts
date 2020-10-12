import * as OPS from '../../../../interfaces/public/field-options'

import { FieldOptionProcessor } from './../../../../core/toolbox/field-option-processor';


export class ModelFieldOptionProcessor extends FieldOptionProcessor {
    process(options: OPS.ModelFieldOptions, fieldName: string) {
        const baseOptions = super.process(options, fieldName);
        return { ...options, ...baseOptions }
    }
}