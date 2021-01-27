import 'reflect-metadata';


const ACTION_NAME = 'sdk:action-name';
const ACTION_PATH = 'sdk:action-path';
const ACTION_METHOD = 'sdk:action-method';

const RequestMapping = (metadata) => {
    const pathMetadata = metadata[constants_1.PATH_METADATA];
    const path = pathMetadata && pathMetadata.length ? pathMetadata : '/';
    const requestMethod = metadata[constants_1.METHOD_METADATA] || request_method_enum_1.RequestMethod.GET;
    return (target, key, descriptor) => {
        Reflect.defineMetadata(constants_1.PATH_METADATA, path, descriptor.value);
        Reflect.defineMetadata(constants_1.METHOD_METADATA, requestMethod, descriptor.value);
        return descriptor;
    };
};
exports.RequestMapping = RequestMapping;
const createMappingDecorator = (method) => (path) => {
    return exports.RequestMapping({
        [constants_1.PATH_METADATA]: path,
        [constants_1.METHOD_METADATA]: method,
    });
};

export const Action = () => {
    return (target, key, descriptor) => {
        Reflect.defineMetadata(constants_1.PATH_METADATA, path, descriptor.value);
        Reflect.defineMetadata(constants_1.METHOD_METADATA, requestMethod, descriptor.value);
        return descriptor;
    };
}