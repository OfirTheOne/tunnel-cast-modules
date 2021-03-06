import { Type } from '@nestjs/common';

export interface ControllerRoutesHttpPayloadArg {
    httpPayloadType: string;
    argumentIndex: number;
    model: any;
}


export interface ControllerRoutesInspectionData {
    httpMethod: string,
    path: string,
    reqMethodName: string,
    reqMethodRef: Function
    httpPayloadArgs?: Array<ControllerRoutesHttpPayloadArg>
}

export interface ControllerInspectionData {
    controllerTypeRef: Function | Type<any>,
    controllerInstanceRef: any,
    controllerPath: string,
    controllerRoutes: Array<ControllerRoutesInspectionData>
}

export interface ApplicationInspectionData {
    routes: Map<string, ControllerInspectionData>;
    globalPrefix: string
}

