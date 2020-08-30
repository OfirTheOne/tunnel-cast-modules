

import { FieldParsingDecoratorFactory } from './factory';
import { functionsRepo } from './function-repo';

export const jsonStringify = FieldParsingDecoratorFactory(functionsRepo['json-stringify']);

export const jsonParse = FieldParsingDecoratorFactory(functionsRepo['json-parse']);