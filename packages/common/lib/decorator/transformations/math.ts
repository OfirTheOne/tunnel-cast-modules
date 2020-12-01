// import { FieldTransformationsDecoratorFactory } from './factory';
import { Transformations } from "./../field-options/option-wrapper/transformations.decorator";
import { functionsRepo } from "./function-repo";

export const mathFloor = Transformations(functionsRepo["math-floor"]);

export const mathCeil = Transformations(functionsRepo["math-ceil"]);
