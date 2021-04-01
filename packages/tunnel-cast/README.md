

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



## Decorators