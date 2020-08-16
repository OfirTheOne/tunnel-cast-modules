

import { FieldParsingDecoratorFactory } from './factory'

export const jsonStringify = FieldParsingDecoratorFactory((value) => JSON.stringify(value));

export const jsonParse = FieldParsingDecoratorFactory((value) => JSON.parse(value));