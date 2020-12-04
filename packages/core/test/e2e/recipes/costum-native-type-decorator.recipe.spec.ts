import { FieldNativeTypeDecoratorFactory } from "../../../lib/decorator-factory/field-native-type.decorator-factory";
import { FieldHandler } from "./../../../lib/field-handler";
import { FieldOptionProcessor } from "./../../../lib/field-option-processor";
import { BaseFieldOptions } from "./../../../lib/interfaces/field-options";
import { NativeValidationDict } from "./../../../lib/interfaces/native-validation-dict";
import { TypeProviderBaseFieldEmbeddedData } from "./../../../lib/interfaces/field-embedded-data";
import { extractRootRepo } from "./../../../lib/utils/model-metadata/extract-metadata";

enum ePermissionsLevel {
    MANAGER = "MANAGER",
    ADMIN = "ADMIN",
    USER = "USER",
    GUEST = "GUEST",
}

/*
    The following are the arguments for native-type decorator factory
    to create the decorator define 
        * TypeHandlerId
        * TypeName
        * TypeHandler
 */
const PermissionsLevelTypeHandlerId = Symbol("PermissionsLevel");
const PermissionsLevelTypeName = "PermissionsLevel";
class PermissionsLevelTypeHandler extends FieldHandler {
    public nativeValidations: NativeValidationDict<BaseFieldOptions> = {};
    public typeName = PermissionsLevelTypeName;
    public typeCondition(): boolean {
        return typeof this.originValue == "string" && Object.keys(ePermissionsLevel).includes(this.originValue);
    }
}

/*
    Creating decorator type using the factory 
 */
const PermissionsLevel = FieldNativeTypeDecoratorFactory(
    {}, // no predefined options
    {
        handlerClass: PermissionsLevelTypeHandler,
        typeHandlerId: PermissionsLevelTypeHandlerId,
        typeName: PermissionsLevelTypeName,
        optionsProcessor: new FieldOptionProcessor(), // use the basic option processor
    },
);

class MyStructureModel {
    @PermissionsLevel
    perm: ePermissionsLevel;
}

describe(`Custom Native Type Decorator - Recipe`, () => {
    it("should embed all relevant data using PermissionsLevel Decorator.", () => {
        const repo = extractRootRepo(MyStructureModel);

        const permKey = "perm";
        const permValue = repo.get(permKey);

        const embeddedData = permValue[0] as TypeProviderBaseFieldEmbeddedData;
        const { handlerClass, typeHandlerId, typeName, optionsProcessor } = embeddedData.provider;

        expect(handlerClass).toEqual(PermissionsLevelTypeHandler);
        expect(typeHandlerId).toEqual(PermissionsLevelTypeHandlerId);
        expect(typeName).toEqual(PermissionsLevelTypeName);
        expect(optionsProcessor).toBeInstanceOf(FieldOptionProcessor);
    });
});
