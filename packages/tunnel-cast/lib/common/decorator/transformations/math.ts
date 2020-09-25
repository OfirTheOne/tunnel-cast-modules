

// import { FieldTransformationsDecoratorFactory } from './factory';
import { parsing } from './../field-options/option-wrapper';
import { functionsRepo } from './function-repo';


export const mathFloor = parsing(functionsRepo['math-floor']);

export const mathCeil = parsing(functionsRepo['math-ceil']);