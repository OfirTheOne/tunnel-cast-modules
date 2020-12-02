import { BaseFieldOptions } from "../interfaces/field-options";
import { RegisteredTypeProvider } from "../type-registry";
import { embedFieldTypeMetadata } from "./embed-field-type-metadata";

export function FieldNativeTypeDecoratorFactory<FP extends BaseFieldOptions>(
    options: FP,
    typeHandlerIdOrProvider: string | symbol | RegisteredTypeProvider,
    ...args: Array<any>
): PropertyDecorator {
    return function (prototype: any, key: string) {
        return embedFieldTypeMetadata(prototype, key, typeHandlerIdOrProvider, options, args);
    };
}
