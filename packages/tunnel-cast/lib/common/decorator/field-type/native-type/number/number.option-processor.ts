import * as OPS from '../../../../../interfaces/public/field-options'

import { FieldOptionProcessor } from '../../../../../core/toolbox/field-option-processor';


export class NumberFieldOptionProcessor extends FieldOptionProcessor<OPS.NumberFieldOptions> {
    
    process(options: OPS.NumberFieldOptions, fieldName: string) {
        const baseOptions = super.process(options, fieldName);
        return { ...options, ...baseOptions }
    }
}
