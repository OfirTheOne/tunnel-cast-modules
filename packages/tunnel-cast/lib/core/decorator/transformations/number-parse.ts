

import { FieldTransformationsDecoratorFactory } from './factory';
import { functionsRepo } from './function-repo';

export const parseInt = FieldTransformationsDecoratorFactory(functionsRepo['parse-int']);

export const parseFloat = FieldTransformationsDecoratorFactory(functionsRepo['parse-float']);