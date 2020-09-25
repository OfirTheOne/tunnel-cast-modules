

import { getFieldDefinitionFromPrototype } from "../../../internal/model-metadata/extract-metadata";


/**
 * @deprecated
 */
export function FieldParsingDecoratorFactory(parser: Function) {

    return function(prototype: any, key: string) {
        const embedData = getFieldDefinitionFromPrototype(
            prototype,
            key,
        );

        if(embedData) {
            embedData[0].options['parsing'] ? 
                embedData[0].options['parsing'].push(parser) : 
                embedData[0].options['parsing'] = [parser]
        }
    };

}
