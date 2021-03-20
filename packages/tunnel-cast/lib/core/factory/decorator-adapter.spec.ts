import "reflect-metadata"



import { CAST_FIELD_METADATA, CAST_DECORATED_FIELDS_LIST } from "../../constants";
import { FieldProcedure } from "../../models/interfaces/field-procedure";


import { decoratorAdapter } from "./decorator-adapter";

describe("decoratorAdapter", () => {

    it("should call decoratorAdapter and create decorator function, behave as expected. ", () => {
        
        const mockProcedure = { fieldName: undefined } as FieldProcedure;
        const target = {};
        const propertyKey = "decoratedPropertyName"
        const hasMetadataSpy = jest.spyOn(Reflect, "hasMetadata")
        const getMetadataSpy = jest.spyOn(Reflect, "getMetadata")
        const defineMetadataSpy = jest.spyOn(Reflect, "defineMetadata")

        const decorator = decoratorAdapter(mockProcedure);
        decorator(target, propertyKey);

        expect(hasMetadataSpy).toBeCalledTimes(2);
        expect(hasMetadataSpy).nthCalledWith(1, CAST_FIELD_METADATA, target, propertyKey);
        expect(hasMetadataSpy).nthCalledWith(2, CAST_DECORATED_FIELDS_LIST, target);
        expect(mockProcedure.fieldName).toEqual(propertyKey);

        expect(defineMetadataSpy).toBeCalledTimes(2);
        expect(defineMetadataSpy).nthCalledWith(1, CAST_FIELD_METADATA, [mockProcedure], target, propertyKey);
        expect(defineMetadataSpy).nthCalledWith(2, CAST_DECORATED_FIELDS_LIST, new Map([[propertyKey, 1]]), target);

    })
})