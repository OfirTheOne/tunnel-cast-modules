import { FieldProcedureType } from "../../models/enums/field-procedure-type.enum";
import { FieldProcedure } from "../../models/interfaces/field-procedure";
import { executeCastProcedures } from "./execute-cast-procedures";
import { FieldConstraintProcedure } from "../../core/field-decorator-procedure/field-constraint.procedure";
import { FieldDefaultAssignmentProcedure } from "../../core/field-decorator-procedure/field-default-assignment.procedure";

import * as IsStringModule from "../../decorator/type/is-string";
import * as requiredModule from "../../decorator/common/required.decorator";
import * as defaultModule from "../../decorator/common/default.decorator";

describe("executeCastProcedures", () => {

    it("should run executeCastProcedures with constraints only, on target object and pass all of them.", () => {

        const fieldName: string = "some-field-name";
        const fieldValue: string = "hello";
        const target: any = { [fieldName]: fieldValue };
        const projectedContext: any = {};
        const options: any = {};

        const constraintProcedureList = [
            new FieldConstraintProcedure(IsStringModule.IS_STRING, {}, {}, IsStringModule.isString, IsStringModule.isStringMessageBuilder),
            new FieldConstraintProcedure(requiredModule.REQUIRED, {}, {}, requiredModule.required, requiredModule.requiredMessageBuilder),
        ];
        constraintProcedureList.forEach(cons => { cons.contextRef = target; cons.fieldName = fieldName; });

        const isStringSpy = jest.spyOn(constraintProcedureList[0], 'constraint');
        const isStringMessageBuilderSpy = jest.spyOn(constraintProcedureList[0], 'messageBuilder' as any);
        const requiredSpy = jest.spyOn(constraintProcedureList[1], 'constraint');
        const requiredMessageBuilderSpy = jest.spyOn(constraintProcedureList[1], 'messageBuilder' as any);

        const procedures: Partial<Record<FieldProcedureType, FieldProcedure[]>> = {
            [FieldProcedureType.ConditionalHandling]: [],
            [FieldProcedureType.DefaultAssignment]: [],
            [FieldProcedureType.Constraint]: constraintProcedureList
        };

        const result = executeCastProcedures(fieldName, procedures, target, projectedContext, options);

        expect(isStringSpy).toBeCalledTimes(1);
        expect(isStringSpy).toBeCalledWith({ args: {}, options: {}, fieldValue, fieldName, path: fieldName });
        expect(isStringMessageBuilderSpy).toBeCalledTimes(0);
        expect(requiredSpy).toBeCalledTimes(1);
        expect(requiredSpy).toBeCalledWith({ args: {}, options: {}, fieldValue, fieldName, path: fieldName });
        expect(requiredMessageBuilderSpy).toBeCalledTimes(0);

        expect(
            result.map(res => res.constraintPass).every(pass => pass == true)
        ).toBeTruthy()
    })

    it("should run executeCastProcedures with constraints only, on target object and fail some of them.", () => {

        const fieldName: string = "some-field-name";
        const fieldValue = 123;
        const target: any = { [fieldName]: fieldValue };
        const projectedContext: any = {};
        const options: any = {};

        const constraintProcedureList = [
            new FieldConstraintProcedure(IsStringModule.IS_STRING, {}, {}, IsStringModule.isString, IsStringModule.isStringMessageBuilder),
            new FieldConstraintProcedure(requiredModule.REQUIRED, {}, {}, requiredModule.required, requiredModule.requiredMessageBuilder),
        ];
        constraintProcedureList.forEach(cons => { cons.contextRef = target; cons.fieldName = fieldName; });

        const isStringSpy = jest.spyOn(constraintProcedureList[0], 'constraint');
        const isStringMessageBuilderSpy = jest.spyOn(constraintProcedureList[0], 'messageBuilder' as any);
        const requiredSpy = jest.spyOn(constraintProcedureList[1], 'constraint');
        const requiredMessageBuilderSpy = jest.spyOn(constraintProcedureList[1], 'messageBuilder' as any);

        const procedures: Partial<Record<FieldProcedureType, FieldProcedure[]>> = {
            [FieldProcedureType.ConditionalHandling]: [],
            [FieldProcedureType.DefaultAssignment]: [],
            [FieldProcedureType.Constraint]: constraintProcedureList,
        };

        const result = executeCastProcedures(fieldName, procedures, target, projectedContext, options);
        const resultMessages = result.map(res => res.message);

        expect(resultMessages.length).toEqual(1);
        expect(resultMessages).toContain(isStringMessageBuilderSpy.mock.results[0].value);
        expect(isStringSpy).toBeCalledTimes(1);
        expect(isStringSpy).toBeCalledWith({ args: {}, options: {}, fieldValue, fieldName, path: fieldName });
        expect(isStringMessageBuilderSpy).toBeCalledTimes(1);
        expect(isStringMessageBuilderSpy).toBeCalledWith({ args: {}, options: {}, fieldValue, fieldName, path: fieldName });
        expect(requiredSpy).toBeCalledTimes(1);
        expect(requiredSpy).toBeCalledWith({ args: {}, options: {}, fieldValue, fieldName, path: fieldName });
        expect(requiredMessageBuilderSpy).toBeCalledTimes(0);
    })

    it("should run executeCastProcedures with multiple defaultAssignment, run only the first one and skip all constraints.", () => {

        const fieldName: string = "some-field-name";
        const fieldValue = undefined;
        const expectedDefaultValue = "hello"
        const target: any = { [fieldName]: fieldValue };
        const projectedContext: any = {};
        const options: any = {};

        const constraintProcedureList = [
            new FieldConstraintProcedure(IsStringModule.IS_STRING, {}, {}, IsStringModule.isString, IsStringModule.isStringMessageBuilder),
            new FieldConstraintProcedure(requiredModule.REQUIRED, {}, {}, requiredModule.required, requiredModule.requiredMessageBuilder),
        ];
        constraintProcedureList.forEach(cons => { cons.contextRef = target; cons.fieldName = fieldName; });
        const defaultAssignmentProcedure = [
            new FieldDefaultAssignmentProcedure(defaultModule.DEFAULT, {}, { valueOrFactory: expectedDefaultValue }, defaultModule.defaultAssigner),
            new FieldDefaultAssignmentProcedure(defaultModule.DEFAULT, {}, { valueOrFactory: 123 }, defaultModule.defaultAssigner)
        ];
        defaultAssignmentProcedure.forEach(cons => { cons.contextRef = target; cons.fieldName = fieldName; });

        const isStringSpy = jest.spyOn(constraintProcedureList[0], 'constraint');
        const isStringMessageBuilderSpy = jest.spyOn(constraintProcedureList[0], 'messageBuilder' as any);
        const requiredSpy = jest.spyOn(constraintProcedureList[1], 'constraint');
        const requiredMessageBuilderSpy = jest.spyOn(constraintProcedureList[1], 'messageBuilder' as any);
        const fstDefaultWithSpy = jest.spyOn(defaultAssignmentProcedure[0], 'defaultWith' as any);
        const SecDefaultWithSpy = jest.spyOn(defaultAssignmentProcedure[1], 'defaultWith' as any);

        const procedures: Partial<Record<FieldProcedureType, FieldProcedure[]>> = {
            [FieldProcedureType.ConditionalHandling]: [],
            [FieldProcedureType.DefaultAssignment]: defaultAssignmentProcedure,
            [FieldProcedureType.Constraint]: constraintProcedureList,
        };

        const result = executeCastProcedures(fieldName, procedures, target, projectedContext, options);
        const resultMessages = result.map(res => res.message);

        expect(resultMessages.length).toEqual(0);
        expect(fstDefaultWithSpy).toBeCalledTimes(1);
        expect(fstDefaultWithSpy).toBeCalledWith({ args: { valueOrFactory: expectedDefaultValue }, fieldValue, fieldName, path: fieldName, context: target});
        expect(SecDefaultWithSpy).toBeCalledTimes(0);
        expect(isStringSpy).toBeCalledTimes(0);
        expect(isStringMessageBuilderSpy).toBeCalledTimes(0);
        expect(requiredSpy).toBeCalledTimes(0);
        expect(requiredMessageBuilderSpy).toBeCalledTimes(0);
    });

    afterEach(() => jest.resetAllMocks())

})