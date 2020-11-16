export function extractValue<T = any>(obj: any, path: string): T {
    if(obj == undefined || typeof obj != 'object') {
        return undefined;
    }
    const pathParts = path.split('.');
    let extractionObject = obj;
    for(let pathPart of pathParts) {
        if(extractionObject[pathPart] == undefined) {
            return extractionObject[pathPart];
        }
        extractionObject = extractionObject[pathPart]
    }
    return extractionObject as T;
}