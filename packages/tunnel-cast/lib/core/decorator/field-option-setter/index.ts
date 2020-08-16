import { BaseFieldOptions } from "../../../model/field-options";
import { getFieldDefinitionFromScheme } from "../../model-metadata/extract-metadata";





export function FieldOptionSetterDecoratorFactory<OP extends BaseFieldOptions>(
    optionsKey: keyof OP, 
    optionsValue: OP[keyof OP]
) {
    return function(prototype: any, key: string) {
        // const embedData = getFieldDefinitionFromScheme(
        //     prototype,
        //     key,
        // );

        // if(embedData) {
        //     embedData[0].options
        // }
        // embedMetadataOptions(
        //     optionsKey as string,
        //     optionsValue
        // );
    };
}

