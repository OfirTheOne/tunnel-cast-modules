

import { Parsing } from './../field-options/option-wrapper/parsing.decorator';
import { functionsRepo } from './function-repo';

export const jsonStringify = Parsing(functionsRepo['json-stringify']);

export const jsonParse = Parsing(functionsRepo['json-parse']);