
import { INestApplication, RequestMethod, Type } from '@nestjs/common';
import { METHOD_METADATA, MODULE_PATH, PATH_METADATA } from '@nestjs/common/constants';
import { NestContainer } from '@nestjs/core/injector/container';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { Module } from '@nestjs/core/injector/module';
import { CAST_HTTP_PAYLOAD_TYPE_LIST } from '@tunnel-cast/nestjs/constants';
import { HttpPayloadArgumentMetadata } from '@tunnel-cast/nestjs/interfaces/http-payload-argument-metadata';
import { HttpPayloadType } from '@tunnel-cast/nestjs/enums';
import {
    ControllerRoutesHttpPayloadArg,
    ControllerRoutesInspectionData,
    ControllerInspectionData,
    ApplicationInspectionData
 } from '../models';


function reflectControllerPath(metatype: Type<unknown>): string {
    return Reflect.getMetadata(PATH_METADATA, metatype);
}
function reflectMethodRoute(method: Function): string {
    return Reflect.getMetadata(PATH_METADATA, method);
}
function reflectMethodHttpPayload(metatype: Type<unknown>, method: string): Array<HttpPayloadArgumentMetadata> {
    return Reflect.getMetadata(CAST_HTTP_PAYLOAD_TYPE_LIST, metatype.prototype, method);
}
function reflectRequestMethod(method: Function): RequestMethod {
    return Reflect.getMetadata(METHOD_METADATA, method);
}

/**
 * 
 * @param app Nest application 
 * @returns {string} the app global prefix, in not exists return empty string. 
 */
function extractAppGlobalPrefix(app: INestApplication): string {
    const { config } = app as any;
    return config?.getGlobalPrefix() || '';
}

/**
 * 
 * @param ctrlClass controller class
 * @param method controller class method
 * @returns {Array<ControllerRoutesHttpPayloadArg>} list of the controller-method's parameters metadata - payload-http-type & model-class. 
 */
function extractControllerRequestHandlersHttpPayload(
    ctrlClass: any,
    method: Function,
): Array<ControllerRoutesHttpPayloadArg> {
    let argPayloadList = reflectMethodHttpPayload(ctrlClass, method.name);
    if (argPayloadList == undefined) { // if undefined the method is not a request handler
        return [];
    }

    argPayloadList = argPayloadList.sort((a, b) => a.argumentIndex - b.argumentIndex)
    const paramTypes: Array<any> = Reflect.getMetadata('design:paramtypes', ctrlClass.prototype, method.name)

    return argPayloadList.map((arg, i) => ({
        httpPayloadType: HttpPayloadType[arg.payloadType].toLowerCase(),
        argumentIndex: arg.argumentIndex,
        model: paramTypes?.[i]
    }));
}

/**
 * 
 * @param method controller class method
 * @returns controller-method's http-method-type & relative path from parent controller.
 */
function extractControllerRequestHandlers /* paths & methods*/(
    method: Function,
): { method: string, path: string } {
    const routePath = reflectMethodRoute(method);
    if (routePath == undefined) { // if undefined the method is not a request handler
        return undefined;
    }
    const requestMethod = reflectRequestMethod(method)

    // const fullPath = routePath; //this.validateRoutePath(routePath);
    return {
        method: RequestMethod[requestMethod].toLowerCase(),
        path: routePath === '' ? '/' : routePath,
    };
}

/**
 * 
 * @param module 
 * @param containerRef 
 */
function extractModuleControllers(module: Module, containerRef: NestContainer): Map<string, InstanceWrapper<object>> {
    const { routes, metatype, relatedModules } = module;
    let allRoutes = new Map(routes);

    // only load submodules routes if asked
    const isGlobal = (module: Type<any>) => !containerRef.isGlobalModule(module);

    Array.from(relatedModules.values())
        .filter(isGlobal as any)
        .map(({ routes: relatedModuleRoutes }) => relatedModuleRoutes)
        .forEach((relatedModuleRoutes) => {
            allRoutes = new Map([...allRoutes, ...relatedModuleRoutes]);
        });

    return allRoutes;
}

/**
 * 
 * @param controllersWrapperMap 
 */
function scanModuleRoutes(
    controllersWrapperMap: Map<string, InstanceWrapper>,
) {
    const controllersMetadataMap = new Map<string, ControllerInspectionData>();

    for (let ctrl of (controllersWrapperMap.values())) {
        const { instance, metatype } = ctrl;
        const prototype = Object.getPrototypeOf(instance);
        const classMethodNameList = Object.getOwnPropertyNames(prototype);
        const ctrlPath = reflectControllerPath(metatype as Type<any>)
        const controllerRoutes = classMethodNameList
            .filter(classMethodName => classMethodName != 'constructor')
            .map<ControllerRoutesInspectionData>(classMethodName => {
                const classMethod = prototype[classMethodName];
                const reqHandlerMetadata = extractControllerRequestHandlers(classMethod);
                const httpPayloadArgs = extractControllerRequestHandlersHttpPayload(metatype, classMethod)
                if (reqHandlerMetadata) {
                    const { method: httpMethod, path } = reqHandlerMetadata;
                    return { httpMethod, path, reqMethodName: classMethodName, reqMethodRef: classMethod, httpPayloadArgs };
                }
            })
            .filter(md => md != undefined);

        controllersMetadataMap.set(ctrl.name, {
            controllerTypeRef: metatype,
            controllerInstanceRef: instance,
            controllerPath: ctrlPath,
            controllerRoutes
        });
    }

    return controllersMetadataMap;
}


////////////////////////////////////////////////////////////////////////////////


export function scanApplication(app: INestApplication): ApplicationInspectionData {
    const container: NestContainer = (app as any).container;
    const globalPrefix = extractAppGlobalPrefix(app);
    const modules: Module[] = [...container.getModules().values()];

    const collectiveRoutes = modules.map((module) => {
        const allRoutes = extractModuleControllers(module, container)
        // const { metatype } = module;
        // const path = metatype? reflectModulePath(metatype): '';
        return scanModuleRoutes(allRoutes);
    });

    const uniqueCollectiveRoutes = collectiveRoutes
        .reduce((uniqueMap, routeMap) =>
            Array
                .from(routeMap.entries())
                .reduce((map, [k, v]) => map.has(k) ? map : map.set(k, v), uniqueMap),
            new Map<string, ControllerInspectionData>()
        );

    return {
        routes: uniqueCollectiveRoutes,
        globalPrefix
    };

}

export function routesDataToJson({ routes, globalPrefix }: ApplicationInspectionData) {

    const routesAsList = Array.from(routes.entries())
        .map(([ctrlName, ctrlData]) => ({
            name: ctrlName,
            path: ctrlData.controllerPath,
            endpoints: ctrlData.controllerRoutes
                .map(({ reqMethodName, path, httpMethod, httpPayloadArgs = [] }) => (
                    { 
                        name: reqMethodName, path, 
                        method: httpMethod, 
                        payload: httpPayloadArgs?.map(
                            ({httpPayloadType, model}) => ({ type: httpPayloadType, schemeName: model?.name })
                        ) 
                    }
                ))
        }))
    return {
        globalPrefix,
        routes: routesAsList
    };
}
