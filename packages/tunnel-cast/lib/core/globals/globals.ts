import { EmptyIdentifierFn } from "lib/models/interfaces/empty-identifier-fn";

export class GlobalSetting {

    defaultEmptyIdentifier: EmptyIdentifierFn = ({fieldValue}) => 
        fieldValue == undefined || 
        fieldValue == null || 
        fieldValue == '';

}

export const globalSetting = new GlobalSetting();