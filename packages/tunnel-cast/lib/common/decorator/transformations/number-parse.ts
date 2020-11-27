
import { Transformations } from './../field-options/option-wrapper/transformations.decorator';
import { functionsRepo } from './function-repo';



export const parseInt = Transformations(functionsRepo['parse-int']);

export const parseFloat = Transformations(functionsRepo['parse-float']);