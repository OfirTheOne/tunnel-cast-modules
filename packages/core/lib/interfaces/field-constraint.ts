export abstract class FieldConstraint {

    public abstract constraintName: string;

    /**
     * 
     */
    public abstract validation(options: any): boolean;
    public abstract validation(arg1: any, options: any): boolean;
    public abstract validation(arg1: any, arg2: any, options: any): boolean;
    public abstract validation(arg1: any, arg2: any, arg3: any, options: any): boolean;
    public abstract validation(arg1: any, arg2: any, arg3: any, arg4: any, options: any): boolean;

    /**
     * 
     */
    public errorMessage: string | ((fieldName: string, value: any, parent?: string) => string);

    /**
     * 
     * @param fieldName 
     * @param value 
     * @param parent 
     */
    public getErrorMessage(fieldName: string, value: any, parent?: string): string {
        return typeof this.errorMessage == 'string' ? this.errorMessage : this.errorMessage(fieldName, value, parent);
    }
}