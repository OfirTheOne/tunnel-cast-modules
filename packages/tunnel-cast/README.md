

# Tunnel-Cast/tunnel-cast

<br>

## Cast

<br>

### `cast`
```ts
function cast<T>(model: (new (...args: any[]) => T), target: any, options?: CastOptions): CastResult<T>
```

+ Description : <br>
Apply the rules embedded in the model class on the target, and in case of success return the `resolvedValue`, and in case of failure return the `messages` list.

<br>
<br>


### `castOrReject`
```ts
function castOrReject<T=any>(model: new (...args: any[]) => T, target: any, options?: CastOptions): T
```

+ Description : <br>
Dose the same as `cast` (invoke it internally), but in case of failure throw the `messages` list, and in case of success return the `resolvedValue` directly (not wrapped in an object).

<br>
<br>


## Decorators / constraint / common

<br>


### `IsEnum`
```ts
function IsEnum(list: Array<string>, options?: FieldConstraintProcedureOptions);
function IsEnum(enumObj: Object, options?: FieldConstraintProcedureOptions);
```
+ Description : <br>

<br>

+ Arguments : 
  + `list` - 
  + `enumObj` - 
  + `options` - constraint options object.

<br>
<br>

### `IsEquals`
```ts
function IsEquals(value: any, strict: boolean , options?: FieldConstraintProcedureOptions);
function IsEquals(value: any, options?: FieldConstraintProcedureOptions);
```
+ Description : <br>
validate (assert) the value of the field against the argument `value`. 

<br>

+ Arguments : 
  + `value` - the value to assert to.
  + `strict` - if true, the assertion is done using `assert.deepStrictEqual`, else the assertion is done using `==`.
  + `options` - constraint options object.

<br>
<br>

### `Length`
```ts
function Length(len: number, options?: FieldConstraintProcedureOptions);
function Length(min: number, max: number, options?: FieldConstraintProcedureOptions);
```
+ Description : <br>
validate that the expected value has the property `length` and it's value - exact or the range, commonly used to validate length of string or array, but technically is could validate a property name `length` of any object.

<br>

+ Arguments : 
  + `len` - the exact length of the expect string or array value.
  + `min` - the min (gte) length of the expect string or array value.
  + `max` - the max (lte) length of the expect string or array value.
  + `options` - constraint options object.

<br>
<br>

### `Required`
```ts
function Required(options?: FieldConstraintProcedureOptions);
```
+ Description : <br>
validate that the expected value isn't equal to the values `null`, `undefined` of `''`.

<br>

+ Arguments : 
  + `options` - constraint options object.

<br>
<br>

## Decorators / constraint / sequence

### `EndsWith`
```ts
function EndsWith(value: (Array<any> | string | any), options?: FieldConstraintProcedureOptions);
```
+ Description : <br>
validate that the expected field value end with the provided `value` argument (array of values of single), if the field value is an array the constrain will pass if it's end with the `value` argument an item(s), if the field value is a string the constrain will pass if it's end with the `value` argument as a substring.
<br>

+ Arguments : 
  + `value` - the value(s) that the field value to be end with. 
  + `options` - constraint options object.

<br>
<br>

### `StartsWith`
```ts
function StartsWith(value: (Array<any> | string | any), options?: FieldConstraintProcedureOptions);
```
+ Description : <br>
validate that the expected field value start with the provided `value` argument (array of values of single), if the field value is an array the constrain will pass if it's start with the `value` argument an item(s), if the field value is a string the constrain will pass if it's start with the `value` argument as a substring.
<br>

+ Arguments : 
  + `value` - the value(s) that the field value to be start with. 
  + `options` - constraint options object.

<br>
<br>

### `Includes`
```ts
function Includes(value: any, options?: FieldConstraintProcedureOptions);
```
+ Description : <br>
validate that the expected field value includes the provided `value` argument, if the field value is an array the constrain will pass if the `value` argument includes in it as an item, if the field value is a string the constrain will pass if the `value` argument includes in it as a substring.

<br>

+ Arguments : 
  + `value` - the value to be included in the field value. 
  + `options` - constraint options object.

<br>
<br>


## Decorators / constraint / string

### `IsDateString`
```ts
function IsDateString(options? : FieldConstraintProcedureOptions);
```
+ Description : <br>

<br>

+ Arguments : 
  + `options` - constraint options object.

<br>
<br>

### `IsEmail`
```ts
function IsEmail(domains: Array<string> ,options?: FieldConstraintProcedureOptions);
function IsEmail(options?: FieldConstraintProcedureOptions);
```
+ Description : <br>

<br>

+ Arguments : 
  + `domains` - expectable email domains list.
  + `options` - constraint options object.

<br>
<br>

### `IsISODate`
```ts
function IsISODate(options? : FieldConstraintProcedureOptions);
```
+ Description : <br>

<br>

+ Arguments : 
  + `options` - constraint options object.

<br>
<br>

### `IsNumberString`
```ts
function IsNumberString(options? : FieldConstraintProcedureOptions);
```
+ Description : <br>

<br>

+ Arguments : 
  + `options` - constraint options object.

<br>
<br>

### `IsUUID`
```ts
function IsUUID(options? : FieldConstraintProcedureOptions);
```
+ Description : <br>

<br>

+ Arguments : 
  + `options` - constraint options object.

<br>
<br>

### `Matches`
```ts
function Matches(pattern: RegExp, options?: FieldConstraintProcedureOptions);
```
+ Description : <br>

<br>

+ Arguments : 
  + `pattern` - pattern to metch the againt the field value.
  + `options` - constraint options object.

<br>
<br>

## Decorators / constraint / type

### `IsArray`
```ts
function IsArray(options? : FieldConstraintProcedureOptions);
```
+ Description : <br>

<br>

+ Arguments : 
  + `options` - constraint options object.

<br>
<br>

### `IsBoolean`
```ts
function IsBoolean(options? : FieldConstraintProcedureOptions);
```
+ Description : <br>

<br>

+ Arguments : 
  + `options` - constraint options object.

<br>
<br>

### `IsInstanceOf`
```ts
function IsInstanceOf(instanceofType: any, options?: FieldConstraintProcedureOptions);
```
+ Description : <br>

<br>

+ Arguments : 
  + `options` - constraint options object.

<br>
<br>

### `IsNumber`
```ts
function IsNumber(options? : FieldConstraintProcedureOptions);
```
+ Description : <br>

<br>

+ Arguments : 
  + `options` - constraint options object.

<br>
<br>

### `IsObject`
```ts
function IsObject(options? : FieldConstraintProcedureOptions);
```
+ Description : <br>

<br>

+ Arguments : 
  + `options` - constraint options object.

<br>
<br>

### `IsString`
```ts
function IsString(options? : FieldConstraintProcedureOptions);
```
+ Description : <br>

<br>

+ Arguments : 
  + `options` - constraint options object.

<br>
<br>

### `IsTypeOf`
```ts
function IsTypeOf(typeofString: string, options?: FieldConstraintProcedureOptions);
```
+ Description : <br>

<br>

+ Arguments : 
  + `options` - constraint options object.

<br>
<br>



## Decorators / conditional

### `Nullable`
```ts
function Nullable(options? : FieldConditionalHandlingProcedureOptions);
```
+ Description : <br>

<br>

+ Arguments : 
  + `options` - constraint options object.

<br>
<br>

### `SkipIf`
```ts
function SkipIf(cond: ((value, name, context) => boolean), options?: FieldConditionalHandlingProcedureOptions);
```
+ Description : <br>

<br>

+ Arguments : 
  + `cond` - the  
  + `options` - constraint options object.

<br>
<br>





## Internal api

<br>

### `decoratorAdapter`
```ts
function decoratorAdapter(fieldProcedure: FieldProcedure): PropertyDecorator;
```

<br>
<br>

### Field-Procedure

All the decorators are internally define a cast procedure over the field they decorating, the procedure can be looked as the decorator type. <br>
The procedure define the nature of the decorator it's purpose and part it takes in the cast process. <br>
Technically, a procedure class is a simple wrapper for the metadata needed be the cast process to apply is on the handled value. <br>

 Field-procedure classes : 
   * `FieldConstraintProcedure`
   * `FieldConditionalHandlingProcedure`
   * `FieldDefaultAssignmentProcedure`
   * `FieldParserProcedure`
   * `FieldTransformerProcedure`