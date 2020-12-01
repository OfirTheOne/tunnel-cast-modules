import { Class } from "@tunnel-cast/core/utils/type-helpers";
import { PrimitiveType } from "@tunnel-cast/core/interfaces/primitive-type";
import { BaseFieldOptions } from "@tunnel-cast/core/interfaces/field-options";

export interface ModelFieldOptions extends BaseFieldOptions {
    modelClass?: Class;
}
