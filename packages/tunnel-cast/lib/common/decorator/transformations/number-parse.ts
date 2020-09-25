

// import { FieldTransformationsDecoratorFactory } from './factory';
import { transformations } from './../field-options/option-wrapper';
import { functionsRepo } from './function-repo';



export const parseInt = transformations(functionsRepo['parse-int']);

export const parseFloat = transformations(functionsRepo['parse-float']);