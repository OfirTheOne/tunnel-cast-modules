import * as OPS from '../../../../../interfaces/public/field-options'

import { FieldOptionProcessor } from './../../../../../core/toolbox/field-option-processor';


export class StringFieldOptionProcessor extends FieldOptionProcessor {
    process(options: OPS.StringFieldOptions, fieldName: string) {
        const baseOptions = super.process(options, fieldName);
        return { ...options, ...baseOptions }
    }
}