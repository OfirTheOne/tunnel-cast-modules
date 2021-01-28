
import { INestApplication, RequestMethod, Type } from '@nestjs/common';
import { METHOD_METADATA, MODULE_PATH, PATH_METADATA } from '@nestjs/common/constants';
import { NestContainer } from '@nestjs/core/injector/container';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { Module } from '@nestjs/core/injector/module';


interface ControllerRoutesInspectionData {
    httpMethod: string,
    path: string,
    reqMethodName: string,
    reqMethodRef: Function
}

interface ControllerInspectionData {
    controllerTypeRef: Function | Type<any>,
    controllerInstanceRef: any,
    controllerPath: string,
    controllerRoutes: Array<ControllerRoutesInspectionData>
}

interface ApplicationInspectionData {
    routes: Map<string, ControllerInspectionData>;
    globalPrefix: string
}


function reflectModulePath(metatype: Type<any>) {
    return Reflect.getMetadata(MODULE_PATH, metatype)
}
function reflectControllerPath(metatype: Type<unknown>): string {
    return Reflect.getMetadata(PATH_METADATA, metatype);
}
function reflectMethodRoute(method: Function): string {
    return Reflect.getMetadata(PATH_METADATA, method);
}
function reflectRequestMethod(method: Function): RequestMethod {
    return Reflect.getMetadata(METHOD_METADATA,method);
}


function extractAppGlobalPrefix(app: INestApplication): string {
    const { config } = app as any;
    return config?.getGlobalPrefix() || '';
  }

function extractControllerRequestHandlers /* paths & methods*/(
    method: Function,
) {
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
            .map(classMethodName => {
                const classMethod = prototype[classMethodName];
                const reqHandlerMetadata = extractControllerRequestHandlers(classMethod);
                if (reqHandlerMetadata) {
                    const { method: httpMethod, path } = reqHandlerMetadata;
                    return { httpMethod, path, reqMethodName: classMethodName, reqMethodRef: classMethod }
                }
            })
            .filter(md => md != undefined)

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

export function routesDataToJson({ routes , globalPrefix }: ApplicationInspectionData) {

    const routesAsList = Array.from(routes.entries())
        .map(([ctrlName, ctrlData]) => ({
            name: ctrlName,
            path: ctrlData.controllerPath,
            endpoints: ctrlData.controllerRoutes.map(({ reqMethodName, path }) => ({ name: reqMethodName, path }) )
        }))
    return {
        globalPrefix,
        routes: routesAsList
    };
}
