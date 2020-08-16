

import { getFieldDefinitionFromScheme } from "../../model-metadata/extract-metadata";


export function FieldTransformationsDecoratorFactory(transformations: Function) {

    return function(prototype: any, key: string) {
        const embedData = getFieldDefinitionFromScheme(
            prototype,
            key,
        );

        if(embedData) {
            embedData[0].options['transformations'] ? 
                embedData[0].options['transformations'].push(transformations) : 
                embedData[0].options['transformations'] = [transformations]
        }
    };

}
