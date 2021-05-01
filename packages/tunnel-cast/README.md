

# Tunnel-Cast/tunnel-cast

tunnel-cast is an extensive decorator based modal (DTO) library.

<br>
<br>

## Overview

tunnel-cast is an extensive decorator based modal (DTO) library. <br>
On top of data validation; the data handling that proceed the validation and the transformation that may come after, can also be embedded in the model class. <br>

The way (order) that cast-process execute the field-procedures is a key feature in this module. <br>
each field-procedures have a type that indicate in what order it will be execute in relation to others. <br>

<br>

<u> *Field-procedures types :* </u>

  * Conditional Handling - implemented using `FieldConditionalHandlingProcedure` class.
  * Default Assignment - implemented using `FieldDefaultAssignmentProcedure` class.
  * Parser - implemented using `FieldParserProcedure` class.
  * Constraint - implemented using `FieldConstraintProcedure` class.
  * Transformer - implemented using `FieldTransformerProcedure` class.

Multiple field-procedures of the same type are, by default, executed in the order that they are decorated the processed fields. <br>

<br>

<u> *Quick flow review :* </u>

1. **`[Conditional Handling]`** - run each conditional-handling, if all resolved ⟶ **`(2)`**, else ⟶ **`(done)`**.
2. **`[Default Assignment]`** - run first default-assignment, if the field found to not be existed the default value is assigned ⟶ **`(done)`**, else ⟶ **`(3)`**.
3. **`[Parser]`** - run each parser ⟶ **`(4)`**.
4. **`[Constraint]`** - run each constraint, if all passed ⟶ **`(5)`**, else ⟶ **`(done with error)`**.
5. **`[Transformer]`** - run each transformer ⟶ **`(done)`**.

<br>

<u> *Example :* </u>

```ts
class ExampleModel {
  package: string;

  @SkipIf((v, k, ctx) => v === "" )               // A - Conditional Handling
  @SkipIf((v, k, ctx) => ctx.package === "HBO" )  // B - Conditional Handling
  @Default("00001")                               // C - Default Assignment
  @IsString()                                     // D - Constraint
  @Length(5)                                      // E - Constraint
  @IsNumberString()                               // F - Constraint
  serial: string;
}

const { messages, resolvedValue } = cast(
    ExampleModel, 
    { serial: "30010", package: "DTV" }
);

console.log(messages)       // undefined
console.log(resolvedValue)  // { serial: "30010", package: "DTV" }

``` 

Lets review the example by step :

1. A & B all resolved.
2. C not apply because field value is exists.
3. non provided.
4. D, E, & F all resolved.
5. non provided. 

<br>
<br>


## Feature List 

* Conditional decorated procedures (validation and more).
* Class extensions.
* Tagging decorated procedures and activating by tag.


<br>
<br>

## Api Documentation

<br>

### **Cast**

<br>
<br>

#### `cast`
```ts
function cast<T>(model: (new (...args: any[]) => T), target: any, options?: CastOptions): CastResult<T>
```

+ Description : <br>
Apply the rules embedded in the model class on the target, and in case of success return the `resolvedValue`, and in case of failure return the `messages` list.

+ Arguments : 
  + `model` -
  + `target` -
  + `options` -

<br>
<br>


#### `castOrReject`
```ts
function castOrReject<T=any>(model: new (...args: any[]) => T, target: any, options?: CastOptions): T
```

+ Description : <br>
Dose the same as `cast` (invoke it internally), but in case of failure throw the `messages` list, and in case of success return the `resolvedValue` directly (not wrapped in an object).

+ Arguments : 
  + `model` -
  + `target` -
  + `options` -

<br>
<br>


### **Decorators :: Constraint** 

<br>

### **Common** 
Common constraints

<br>
<br>

#### `IsEnum`
```ts
function IsEnum(list: Array<string>, options?: FieldConstraintProcedureOptions);
function IsEnum(enumObj: Object, options?: FieldConstraintProcedureOptions);
```
+ Description : <br>
TODO Description

+ Arguments : 
  + `list` - 
  + `enumObj` - 
  + `options` - constraint options object.

<br>
<br>

#### `IsEquals`
```ts
function IsEquals(value: any, strict: boolean , options?: FieldConstraintProcedureOptions);
function IsEquals(value: any, options?: FieldConstraintProcedureOptions);
```
+ Description : <br>
validate (assert) the value of the field against the argument `value`. 

+ Arguments : 
  + `value` - the value to assert to.
  + `strict` - if true, the assertion is done using `assert.deepStrictEqual`, else the assertion is done using `==`.
  + `options` - constraint options object.

<br>
<br>

#### `Length`
```ts
function Length(len: number, options?: FieldConstraintProcedureOptions);
function Length(min: number, max: number, options?: FieldConstraintProcedureOptions);
```
+ Description : <br>
validate that the expected value has the property `length` and it's value - exact or the range, commonly used to validate length of string or array, but technically is could validate a property name `length` of any object.

+ Arguments : 
  + `len` - the exact length of the expect string or array value.
  + `min` - the min (gte) length of the expect string or array value.
  + `max` - the max (lte) length of the expect string or array value.
  + `options` - constraint options object.

<br>
<br>

#### `Required`
```ts
function Required(options?: FieldConstraintProcedureOptions);
```
+ Description : <br>
validate that the expected value isn't equal to the values `null`, `undefined` of `''`.

+ Arguments : 
  + `options` - constraint options object.

<br>
<br>

### **Sequence**
Constraints that can handle both string or array.

<br>
<br>

#### `EndsWith`
```ts
function EndsWith(value: (Array<any> | string | any), options?: FieldConstraintProcedureOptions);
```
+ Description : <br>
validate that the expected field value end with the provided `value` argument (array of values of single), if the field value is an array the constrain will pass if it's end with the `value` argument an item(s), if the field value is a string the constrain will pass if it's end with the `value` argument as a substring.

+ Arguments : 
  + `value` - the value(s) that the field value to be end with. 
  + `options` - constraint options object.

<br>
<br>

#### `StartsWith`
```ts
function StartsWith(value: (Array<any> | string | any), options?: FieldConstraintProcedureOptions);
```
+ Description : <br>
validate that the expected field value start with the provided `value` argument (array of values of single), if the field value is an array the constrain will pass if it's start with the `value` argument an item(s), if the field value is a string the constrain will pass if it's start with the `value` argument as a substring.

+ Arguments : 
  + `value` - the value(s) that the field value to be start with. 
  + `options` - constraint options object.

<br>
<br>

#### `Includes`
```ts
function Includes(value: any, options?: FieldConstraintProcedureOptions);
```
+ Description : <br>
validate that the expected field value includes the provided `value` argument, if the field value is an array the constrain will pass if the `value` argument includes in it as an item, if the field value is a string the constrain will pass if the `value` argument includes in it as a substring.

+ Arguments : 
  + `value` - the value to be included in the field value. 
  + `options` - constraint options object.

<br>
<br>

###  **String**
The classic string related constraints.

<br>
<br>

#### `IsDateString`
```ts
function IsDateString(options? : FieldConstraintProcedureOptions);
```
+ Description : <br>
TODO Description

+ Arguments : 
  + `options` - constraint options object.

<br>
<br>

#### `IsEmail`
```ts
function IsEmail(domains: Array<string> ,options?: FieldConstraintProcedureOptions);
function IsEmail(options?: FieldConstraintProcedureOptions);
```
+ Description : <br>
TODO Description

+ Arguments : 
  + `domains` - expectable email domains list.
  + `options` - constraint options object.

<br>
<br>

#### `IsISODate`
```ts
function IsISODate(options? : FieldConstraintProcedureOptions);
```
+ Description : <br>
TODO Description

+ Arguments : 
  + `options` - constraint options object.

<br>
<br>

#### `IsNumberString`
```ts
function IsNumberString(options? : FieldConstraintProcedureOptions);
```
+ Description : <br>
TODO Description

+ Arguments : 
  + `options` - constraint options object.

<br>
<br>

#### `IsUUID`
```ts
function IsUUID(options? : FieldConstraintProcedureOptions);
```
+ Description : <br>
TODO Description

+ Arguments : 
  + `options` - constraint options object.

<br>
<br>

#### `Matches`
```ts
function Matches(pattern: RegExp, options?: FieldConstraintProcedureOptions);
```
+ Description : <br>
TODO Description

+ Arguments : 
  + `pattern` - pattern to match the against the field value.
  + `options` - constraint options object.

<br>
<br>

### **Type**
Constraint handling the field's type.

<br>
<br>

#### `IsArray`
```ts
function IsArray(options? : FieldConstraintProcedureOptions);
```
+ Description : <br>
validate that the expected field value is an array. 

+ Arguments : 
  + `options` - constraint options object.

<br>
<br>

#### `IsBoolean`
```ts
function IsBoolean(options? : FieldConstraintProcedureOptions);
```
+ Description : <br>
validate that the expected field value is of boolean type. 

+ Arguments : 
  + `options` - constraint options object.

<br>
<br>

#### `IsInstanceOf`
```ts
function IsInstanceOf(instanceofType: any, options?: FieldConstraintProcedureOptions);
```
+ Description : <br>
validate that the expected field value is an instance-of the type provided in the argument `instanceofType`. 

+ Arguments : 
  + `options` - constraint options object.

<br>
<br>

#### `IsNumber`
```ts
function IsNumber(options? : FieldConstraintProcedureOptions);
```
+ Description : <br>
validate that the expected field value is of number type. 

+ Arguments : 
  + `options` - constraint options object.

<br>
<br>

#### `IsObject`
```ts
function IsObject(options? : FieldConstraintProcedureOptions);
```
+ Description : <br>
validate that the expected field value is of object type. 

+ Arguments : 
  + `options` - constraint options object.

<br>
<br>

#### `IsString`
```ts
function IsString(options? : FieldConstraintProcedureOptions);
```
+ Description : <br>
validate that the expected field value is of string type. 

+ Arguments : 
  + `options` - constraint options object.

<br>
<br>

#### `IsTypeOf`
```ts
function IsTypeOf(typeofString: string, options?: FieldConstraintProcedureOptions);
```
+ Description : <br>
validate that the expected field value is a type-of the type-string provided in the argument `typeofString`. 

+ Arguments : 
  + `options` - constraint options object.

<br>
<br>

### **Decorators :: conditional**

<br>

#### `Nullable`
```ts
function Nullable(options? : FieldConditionalHandlingProcedureOptions);
```
+ Description : <br>
A field decorated with this decorator

+ Arguments : 
  + `options` - constraint options object.

<br>
<br>

#### `SkipIf`
```ts
function SkipIf(cond: ((value, name, context) => boolean), options?: FieldConditionalHandlingProcedureOptions);
```
+ Description : <br>
TODO Description

+ Arguments : 
  + `cond` - a condition function, if it return true the field will be processed, otherwise it will be skipped.
  + `options` - constraint options object.

<br>
<br>





### [Documentation Draft] Internal API

<br>

#### `decoratorAdapter`
```ts
function decoratorAdapter(fieldProcedure: FieldProcedure): PropertyDecorator;
```

<br>
<br>

#### Field-Procedure

All the decorators are internally define a cast procedure over the field they decorating, the procedure can be looked as the decorator type. <br>
The procedure define the nature of the decorator it's purpose and part it takes in the cast process. <br>
Technically, a procedure class is a simple wrapper for the metadata needed be the cast process to apply is on the handled value. <br>

 Field-procedure classes : 
   * `FieldConstraintProcedure`
   * `FieldConditionalHandlingProcedure`
   * `FieldDefaultAssignmentProcedure`
   * `FieldParserProcedure`
   * `FieldTransformerProcedure`