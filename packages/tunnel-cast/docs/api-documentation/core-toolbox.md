## Core ToolBox

The core API used to build the public API of this module (all the decorators), and can be used to extend and customize the existing API.




### FieldModelTypeDecoratorFactory
```ts
function FieldModelTypeDecoratorFactory(
    typeHandlerId: string | symbol ,options?: BaseFieldOptions, model?: Class
): PropertyDecorator
```
<br>

### FieldNativeTypeDecoratorFactory
```ts
function FieldNativeTypeDecoratorFactory<FO extends BaseFieldOptions>( 
    options: FO,  typeHandlerId: string|symbol, ...args: Array<any>
): PropertyDecorator
```
<br>

### FieldOptionSetterDecoratorFactory
```ts
function FieldOptionSetterDecoratorFactory(
    optionKey: string, value: any, handlerAsArray: boolean = false
): PropertyDecorator
```