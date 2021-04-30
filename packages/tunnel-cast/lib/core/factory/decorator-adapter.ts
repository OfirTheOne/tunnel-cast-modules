import "reflect-metadata";
import { CAST_FIELD_METADATA, CAST_DECORATED_FIELDS_LIST } from "../../constants";
import { FieldProcedure } from "../../models/interfaces/field-procedure";

export function decoratorAdapter(fieldProcedure: FieldProcedure): PropertyDecorator {
    return function (target: any, propertyKey: string) {
        return defineFieldDecoratorMetadata(fieldProcedure, target, propertyKey);
    };
}

function defineFieldDecoratorMetadata(fieldProcedure: FieldProcedure, target: any, propertyKey: string): void {
    let fieldMetadata: Array<any> = [];
    let fieldsList: Map<string, number> = new Map();
    if (Reflect.hasMetadata(CAST_FIELD_METADATA, target, propertyKey)) {
        fieldMetadata = Reflect.getMetadata(CAST_FIELD_METADATA, target, propertyKey);
    }
    if (Reflect.hasMetadata(CAST_DECORATED_FIELDS_LIST, target)) {
        fieldsList = Reflect.getMetadata(CAST_DECORATED_FIELDS_LIST, target);
    }

    fieldProcedure.fieldName = propertyKey;
    fieldMetadata.push(fieldProcedure);
    Reflect.defineMetadata(CAST_FIELD_METADATA, fieldMetadata, target, propertyKey);

    !fieldsList.has(propertyKey) ? fieldsList.set(propertyKey, fieldsList.size + 1) : 0;
    Reflect.defineMetadata(CAST_DECORATED_FIELDS_LIST, fieldsList, target);
}
