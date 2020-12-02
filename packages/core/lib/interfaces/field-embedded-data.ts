import { RegisteredTypeProvider } from "../type-registry/registered-type-provider";
import { BaseFieldOptions } from "./field-options";

export interface BaseFieldEmbeddedData {
    fieldKey: string;
    options: BaseFieldOptions;
    handlerArgs?: Array<any>;
}

export interface TypeHandlerIdBaseFieldEmbeddedData extends BaseFieldEmbeddedData {
    typeHandlerId: string | symbol;
}
export interface TypeProviderBaseFieldEmbeddedData extends BaseFieldEmbeddedData {
    provider: RegisteredTypeProvider;
}

export type FieldEmbeddedData = TypeProviderBaseFieldEmbeddedData | TypeHandlerIdBaseFieldEmbeddedData;
