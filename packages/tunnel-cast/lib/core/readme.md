# Steps for adding type decorators

1. **field-handler** - 
    * create an handler class for the cast process .
    * name `<TYPE>-field-handler.ts` .
    * locate in core/field-handler) .
2. **field-options-interface** - 
    * create an options interface for the new type .
    * name `<TYPE>-field-options.ts` .
    * locate in model/field-options) .
3.  **field-options-processor** -
    * create an options processor class for the new type 
    * name `<TYPE>-field-option-processor.ts` .
    * locate in core/field-option-processor) .
4. **field-decorator** -
    * create a decorator function for the new type 
    * name `<TYPE>.ts` .
    * locate in core/decorator/*) .
    * using `FieldDefinitionDecoratorFactory`.