

# Tunnel-Cast/tunnel-cast

<br>

## Cast api

<br>

### `cast`
```ts
function cast<T>(model: (new (...args: any[]) => T), target: any, options?: CastOptions): CastResult<T>
```

+ Description : <br>
Apply the rules embedded in the model class on the target, and in case of success return the `resolvedValue`, and in case of failure return the `messages` list.

<br>


### `castOrReject`
```ts
function castOrReject<T=any>(model: new (...args: any[]) => T, target: any, options?: CastOptions): T
```

+ Description : <br>
Dose the same as `cast` (invoke it internally), but in case of failure throw the `messages` list, and in case of success return the `resolvedValue` directly (not wrapped in an object).

<br>


## decorators/constraint/common

### `IsEnum`
```ts
function IsEnum(list: Array<string>, options?: FieldConstraintProcedureOptions);
function IsEnum(enumObj: Object, options?: FieldConstraintProcedureOptions);
```
+ Description : <br>

+ Arguments : 
  + `list` - 
  + `enumObj` - 
  + `options` - constraint options object.
  
<br>

### `IsEquals`
```ts
function IsEquals(value: any, strict: boolean , options?: FieldConstraintProcedureOptions);
function IsEquals(value: any, options?: FieldConstraintProcedureOptions);
```
+ Description : <br>

+ Arguments : 
  + `value` - 
  + `strict` - 
  + `options` - constraint options object.
  
<br>

### `Length`
```ts
function Length(len: number, options?: FieldConstraintProcedureOptions);
function Length(min: number, max: number, options?: FieldConstraintProcedureOptions);
```
+ Description : <br>

+ Arguments : 
  + `len` - the exact length of the expect string or array value.
  + `min` - the min (gte) length of the expect string or array value.
  + `max` - the max (lte) length of the expect string or array value.
  + `options` - constraint options object.
  
<br>

### `Required`
```ts
function Required(options?: FieldConstraintProcedureOptions);
```
+ Description : <br>

+ Arguments : 
  + `options` - constraint options object.
  
<br>


#### Sequence
+ `EndsWith`
+ `StartsWith`
+ `Includes`

#### String
+ `IsDateString`
+ `IsEmail`
+ `IsISODate`
+ `IsNumberString`
+ `IsUUID`
+ `Matches`

#### Type
+ `IsArray`
+ `IsBoolean`
+ `IsInstanceOf`
+ `IsNumber`
+ `IsObject`
+ `IsString`
+ `IsTypeOf`


### Conditionals
Nullable
SkipIf
<br>

## Internal api

<br>

### `decoratorAdapter`
```ts

```

### Field-Procedure

 Field-procedure classes : 
   * `FieldConditionalHandlingProcedure`
   * `FieldConditionalHandlingProcedure`
   * `FieldDefaultAssignmentProcedure`
   * `FieldParserProcedure`
   * `FieldTransformerProcedure`