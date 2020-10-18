

export function transformLeanError(errors: Array<any>) {
    
    if(errors?.every(e => e.code != undefined)) {
        return errors.map(({code}) => ({code}));
    } else if(errors?.every(e => e.fieldName != undefined)) {
        return errors.map(e => {
            return {
                fieldName: e.fieldName, 
                errors: transformLeanError(e.errors)
            }
        })
    }
}