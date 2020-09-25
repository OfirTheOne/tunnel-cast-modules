

import { parsing } from './../field-options/option-wrapper';
import { functionsRepo } from './function-repo';

export const jsonStringify = parsing(functionsRepo['json-stringify']);

export const jsonParse = parsing(functionsRepo['json-parse']);