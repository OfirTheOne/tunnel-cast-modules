import { Class } from "../../../../utils/model";
import { PrimitiveType } from "../../../../interfaces/inner/primitive-type";
import { BaseFieldOptions } from "../../../../interfaces/public/field-options";

export interface ModelFieldOptions extends BaseFieldOptions{
    modelClass?: Class
}



