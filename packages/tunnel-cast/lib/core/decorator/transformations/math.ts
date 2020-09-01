

import { FieldTransformationsDecoratorFactory } from './factory';
import { functionsRepo } from './function-repo';

export const mathFloor = FieldTransformationsDecoratorFactory(functionsRepo['math-floor']);

export const mathCeil = FieldTransformationsDecoratorFactory(functionsRepo['math-ceil']);