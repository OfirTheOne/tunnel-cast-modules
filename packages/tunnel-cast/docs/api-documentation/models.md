
### **Models**

<br>

`interface BaseFieldOptions`


|Key |Type | Default | Description |
|--- |---  |---      |---          |
| `attribute`  | `string`  | <details>  same as the decorated attribute  </details> | <details> Mapping key  </details> |
| `fallbackAttribute`  | `string`  | `undefined ` | <details> A fallback mapping key, if the value for [`attribute`] is `undefined` the value will be taken from  [`fallbackAttribute`]  </details> |
| `assert`   | <details> `PrimitiveType | Class | [PrimitiveType] | [Class]` </details> | `undefined` | <details>  </details> |
| `validate`   | `boolean` | `true` | <details>  </details> |
| `required`   | `boolean` | `true` | <details>  </details> |
| `requiredIf` | `Function`| `undefined` | <details>  </details> |
| `nullable`   | `boolean` | `undefined` | <details>  </details> |
| `nullableIf` | `Function`| `undefined` | <details>  </details> |
| `default`    | `any`     | `undefined` | <details> will be assigned as the default value if the field not exists and defined as not required. </details> |
| `error`      | `string`  | <details> generic error massage  </details>  | <details>  </details> |
| `parsing`         | `Array<Function>`     | `[]`  | <details> will run if pass required / nullable validation, and before any other validation / transformation will run. </details> |
| `validations`     | `Array<Function>`     | `[]`  | <details> will run if all native validation pass and after. </details> |
| `transformations` | `Array<Function>`     | `[]`  | <details> array of functions that receives the final value of the field till the  will run if all validation pass and after. </details> |


<br>
<br>

`interface NumberFieldOptions extends BaseFieldOptions`

|Key |Type | Default | Description |
|--- |---  |---      |---          |
| `min`   | `number` | `undefined` | <details> Minimum value restriction.</details> |
| `max`   | `number` | `undefined` | <details> Maximum value restriction. </details> |

<br>
<br>

`interface StringFieldOptions extends BaseFieldOptions`


|Key |Type | Default | Description |
|--- |---  |---      |---          |
| `format`   | `string` / `RegExp` | `undefined` | <details> Value's format restriction. </details> |
| `enums`   | `Array<string>` | `undefined` | <details>Group of valid of values restriction. </details> |

<br>
<br>

`interface BooleanFieldOptions extends BaseFieldOptions`

|Key |Type | Default | Description |
|--- |---  |---      |---          |
| --   | -- | -- | -- |

<br>
<br>

`interface ArrayFieldOptions extends BaseFieldOptions`

|Key |Type | Default | Description |
|--- |---  |---      |---          |
| `minLength`   | `number` | -- | -- |
| `maxLength`   | `number` | -- | -- |
| `ofType`      | `Array<string>` | `undefined` | <details> Validate the type of each item in the array. </details> |
| `allowType`   | any primitive type string | `undefined`| -- |

<br>
<br>

`interface ModelFieldOptions extends BaseFieldOptions`

|Key |Type | Default | Description |
|--- |---  |---      |---          |
| --   | -- | -- | -- |

<br>
<br>

`interface ModelSpec` 

* Experimental 

|Key |Type | Default | Description |
|--- |---  |---      |---          |
| globals     | `{ [key: string]: Array<any> }` | -- | -- |
| definitions | `{ [key: string]: Array<any> }` | -- | -- |
| fields      | `Array<string>` | -- | -- |
| name        | `string` | -- | -- |
| serialize   | `(space?: number): string` | -- | -- |


<br>
<br>
<br>
