# Tunnel Cast

Object-To-Model library, lets the user construct a strict model definition using ES6 class and Typescript Decorators api, the model class will wrapped the parsing validation and transforming processes, just like a tunnel were in one side a raw object enters and exit in the other side after passes the "casting" process.   
<br>

![casting process](/docs/casting-process-lean.png)

<br>

## Highlights
 * Embedding an input processing logic & validation in the model class definitions using decorators. 
 * Supporting common types and your own Models as (nested) class attributes in your model class definition.
 * Providing an easy API to customize each stage in the process, parsing, validating and transforming.
 * Supporting Model class extending (eg. `class AdminModel extends UserModel ...`)

<br>

## Install

```sh
npm install tunnel-cast
```

<br>

## Test

1. Clone the project repo.
2. Move to project folder.
3. Run `npm i`
4. Run `npm run test`

<br>

## Usage

```ts
import { field, parsing } from 'tunnel-cast/core/decorator'
import { cast } from 'tunnel-cast/core/cast'

class User {
    @field.String({ required: false })
    username: string;

    @field.String()
    email: string;

    @field.Boolean({ required: false })
    notificationOn: number;
}

class ServerResponse {
    @field.Number({ 
        min: 3,
        required: true,
        parsing: [(val) => Number(val)]
    })
    apiVersion: number;

    @parsing.JsonParse
    @field.Array()
    imageTensor: Array<Array<number>>;

    @field.Model()
    user: User
}

const { value, errors } = cast(ServerResponse, { 
    apiVersion: '9', 
    imageTensor: "[[1,2],[2,3]]", 
    user: { email: 'user@examle.com' } 
}); 


console.log(JSON.stringify({ value, errors }, undefined, 2))
```

```ts
// output :
{
    "value": {
        "apiVersion": 9,
        "imageTensor": [
            [1, 2], [2, 3]
        ],
        "user": {
            "email": "user@examle.com"
        }
    }
}
```

```ts
class User {
    @field.String({
        fallbackAttribute: "name"
    })
    username: string;

    @field.String({
        format: /.+@.+\.com/
    })
    email: string;

    @field.Boolean({
        required: false,
        default: false
    })
    notificationOn: number;

    @field.Array({
        validations: [(value) => value.length > 2 && value[1].startsWith('Rocky')],
        minLength: 1,
        maxLength: 15,
        ofType: 'string'
    })
    favorites: Array<string>

    @field.String({
        parsing: [(value) => (typeof value == 'string' ? value.toLowerCase() : value)],
        enums: ['male', 'female'],
    })
    gender: string
}

const { value, errors } = cast(User, { 
    name: "Bob",
    email: "bob@gmail.com",
    favorites: ["Rocky 1", "Rocky 2", "Rocky 3", "Rocky 4", "Rocky 5"],
    gender: "MALE"
}); 

console.log(JSON.stringify({ value, errors }, undefined, 2))
```

```ts
// output :
{
    "value": {
        "username": "Bob",
        "email": "bob@gmail.com",
        "notificationOn": false,
        "favorites": [
            "Rocky 1",
            "Rocky 2",
            "Rocky 3",
            "Rocky 4",
            "Rocky 5"
        ],
        "gender": "male"
    }
}
```

<br>


## The general flow :

Lets define some terms regarding the flow; 

* `casting` - The process of applying a model definitions on an object and trying to transform the object to the model instance.

* `model`  /  `model definitions` - As a concept, a model is a collection of restrictions and conditions where a value that satisfied those, can be referred to as a model instance. <br>
In practice a model would be a class declared with this module fields decorators and such.

A process of casting (as this module implements) an object to a model (a class with decorated attributes), 
is done by iterating the model's decorated attributes, and one by one, trying to *fit* the matching key's (or mapping key) value from the input object to the current processed model's (definition) attribute.

The "fit" action assembled from cupel of stages (executed in that order) : 

1. [ **Extracting stage** ]  <br>
Extracting the value from the input object. In one of three ways:
* using the origin field name, in case `options.attribute` wasn't provided,  
* using `options.attribute` has the field, in case it was provided.
* using `options.fallbackAttribute` has the field, in case it was provided, and the value in the origin field name is not defined.

```ts 
// simplified value extraction.
let value = input[ops.attribute || originFieldName];
if(value == undefined && ops.fallbackAttribute) {
    value = input[fallbackAttribute]   
}

```

<br>

2. [ **Existents stage** ]  <br>
Evaluating "existents" status of the current input attribute, and checking the attribute value against the `required` (or `nullable`) requirement (from the provided options or the global default setting). 

```ts 
// simplified required-status evaluation.
let requiredStatus;
if(ops.required != null) {
    requiredStatus = ops.required;
} else if(ops.nullable != null) {
    requiredStatus = !ops.nullable;
} else {
    requiredStatus = globalSetting.DEFAULT_REQUIRED; // can be configured
}
```

<br>

> If stage 2. fails - an error will be thrown. <br>
If stage 2. passes with an existing value - the process will continue to the "parsing" stage. <br>
If stage 2. passes with non existing value - the process will continue to the "defaulting" stage.

<br>

3. [ **Defaulting stage** ] <br>
Assigning a default value, if one was provided in the decorator options. The default value will be assigned on projected output object. After this stage the "fit" action is done and the casting process will continue to the next model's attribute. 

<br>


4. [ **Assertion stage** ] <br>
Asserting the original field's value against a given type, it can be one of the following :
* A string indicating a primitive type (e.g `number`, `string` ...), assertion performed as `typeof input == ops.assert` 
* A class indicating a non primitive type (e.g `User`), assertion performed as `input instanceof ops.assert`
* An array of one of the above indication an array of that type, (e.g `[]`, `[number]`, `[User]` ... ).<br> The assertion acknowledge the first item in the assert array, and assert each item in the input array. <br> If the input is not an array the assertion fails, assert array with the value `[]` will allow any type of input array. 

<br>


> **Note :** Assertion stage allows you to create a first contact layer interface, giving you control over both sides of the tunnel, assert the original given input, and validate final casted value. 

<br>


5. [ **Parsing stage** ] <br>
After stage 4, a list of function (provided in the decorator options under the key `parsing`), will run one after the other where the output of the last function will be provided as the input for the next, has the input for the first function will be the original value.   

<br>


6. [ **Native Validation stage** ]  
The native-validation are the type's "from the box" validations, e.g `min`, `max` from `Number` type.
If all the native-validation (provided in the decorator options) passed the process continue to stage 7.

<br>


7. [ **Extra Validation stage** ]  
a list of function (provided in the decorator options under the key `validation`), will run one after the other. If all the validation function return will true the process continue to stage 8.

<br>


8. [ **Transforming stage** ]  
This stage acts just like `parsing` stage only after the entire validations requirements ended successfully. 
a list of function (provided in the decorator options under the key `transforming`), will run one after the other where the output of the last function will be provided as the input for the next, has the input for the first function will be the existing value from the last stage.  

<br>
<br>

## API Documentation


### **Decorators**


#### `@field.<TYPE>`
Define the field type.

<br>


`@field.Number(options?: NumberFieldOptions) `

> Description : <br>
Defines an attribute as a `number` type, with additional requirements.

> Example :
```ts
class MyModel {
    @fields.Number({
        min: 10
    })
    myNumber: number;
}
```

<br>
<br>

`@field.String(options?: StringFieldOptions) `

> Description : <br>
Defines an attribute as a `string` type, with additional requirements.

> Example :
```ts
class User {
    @field.String()
    id: string;

    @field.String({ format: /^ ... $/ })
    email: string;
}
```

<br>
<br>

`@field.Boolean(options?: BooleanFieldOptions) `

> Description : <br>
Defines an attribute as a `boolean` type, with additional requirements.

> Example :
```ts
class MyModel {
    @fields.Boolean({
        required: false,
        default: true
    })
    myNumber: boolean;
}
```

<br>
<br>

`@field.Array(options?: ArrayFieldOptions) `

> Description : <br>
Defines an attribute as a `array` type, with additional requirements.

> Example :
```ts
class ImageData {    
    @field.Array()
    imageTensor: Array<Array<number>>;
}
const { value } = cast(ImageData, { 
    imageTensor: [ [1,2], [2,3] ], 
}); 
```

<br>
<br>

`@field.Model(options?: ModelFieldOptions) `

> Description : <br>
Defines an attribute as a `Model` type, with additional requirements. 

> Example :
```ts
class User {
    @field.String()
    id: string;

    @field.String({ format: /^ ... $/ })
    email: string;
}

class MyModel {
    @fields.Model()
    user: User;
}
```

<br>
<br>


#### `@field.Assert(<TYPE>)`
Define the original (untouched) attribute type.

<br>

`@field.Assert(type?: PrimitiveType | Class | [PrimitiveType] | [Class])`

> Description : <br>
Define the original (untouched) attribute type, an alternative for using `options.assert`.

> Example :
```ts
class Result {    

    @field.Assert(['string'])
    @field.Array({ 
        parsing: [(value) => value.map(s => Number(s))]
        ofType: 'number',
    })
    age_range: : string
}
const { value } = cast(Result, { 
    age_rage: ["13","30"], 
}); 

// value :  [13, 30]
```

<br>
<br>


#### `@parsing.<PARSER>`
Define (append to) the field's (pre-validation) parsing process. <br> 
The `parsing` object is a collection of commonly used parsing functions, simply for reducing duplication.

<br>

`@parsing.JsonStringify`

> Description : <br>
Add (the native) JSON.stringify function to the parsing function list.

> Example :
```ts
class RequestQs {    
    @parsing.JsonStringify
    @field.String()
    age_range: : string
}
const { value } = cast(RequestQs, { 
    age_rage: [13,30], 
}); 

// value :  "[13, 30]"

```

<br>
<br>

`@parsing.JsonParse`

> Description : <br>
Add (the native) JSON.parse function to the parsing function list.

> Example :
```ts
class ImageData {    
    @parsing.JsonParse
    @field.Array()
    imageTensor: Array<Array<number>>;
}
const { value } = cast(ImageData, { 
    imageTensor: "[[1,2],[2,3]]", 
}); 

// value :  [ [1,2], [2,3] ]

```


<br>
<br>
<br>

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

### **Methods**

`cast<T>(model: Class<T>, object: any): { value: T, errors: }`

> Description : <br>
Preform the casting process of a model on an object, it applies the model definitions on an object, and attempt to cast it to the model instance, in case of success the return value, will be an actual instance of the model class.

> Example : <br>
```ts
class User {
    @field.String({ 
        fallbackAttribute: "email"
    })
    username: string;

    @field.String()
    email: string;

    @field.Boolean({ required: false })
    notificationOn: number;
}

const { value, errors } = cast(User, { 
    email: 'john@examle.com', 
    username: 'John', 
}); 

if(errors) {
    throw Error('Invalid input.')
}

```
<br>
<br>

### **Errors**


