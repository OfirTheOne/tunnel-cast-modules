# Tunnel Cast

Object-To-Model library, lets the user construct a strict model definition using ES6 class and Typescript Decorators api, the model class will wrapped the parsing validation and transforming processes, just like a tunnel were in one side a raw object enters and exit in the other side after passes the "casting" process.   

![casting process](/docs/casting-process-lean.png)

<br>

## Highlights
 * Embedding the input transform & validations logic process in the model class definitions using decorators. 
 * Supporting common types and your own Models as (nested) class attributes in your model class definition.
 * Proving an easy API to customize each stage in the process, parsing, validating and transforming.
 * Supporting Model class extending (eg. `class AdminModel extends UserModel ...`)


## Install

```sh
npm install tunnel-cast
```

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

```sh
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


<br>


## The general flow :

Lets state some terms regarding the flow, 

* `casting` - The process of applying a model definitions on an object and trying to transform the object to the model instance.

* `model`  /  `model definitions` - As a concept, a model is a collection of restrictions and conditions where a value that satisfied those can be referred to a model instance. <br>
In practice a model would be a class declared with this module fields decorators and such.

A process of casting (as this module implements) an object to a model (a class with decorated attributes), 
is done by iterating the model's decorated attributes, and one by one, trying to *fit* the matching key's (or mapping key) value from the input object to the current processed model's (definition) attribute.

The "fit" action assembled from cupel of stages (executed in that order) : 

1. [ **Extracting stage** ]  <br>
Extracting the value from the input object. using the origin attribute name of a mapping key (provided in the decorator options).  

2. [ **Existents stage** ]  <br>
Evaluating "existents" status of the current input attribute, and checking the attribute value against the `required` (or `nullable`) requirement (from the provided options or the global default setting). 

<br>

> If stage 2. fails - an is error thrown. <br>
If stage 2. passes with an existing value - the process continue to the "parsing" stage. <br>
If stage 2. passes with non existing value - the process continue to the "defaulting" stage.

<br>

3. [ **Defaulting stage** ] <br>
Assigning a default value, if one was provided in the decorator options. The default value will be assigned on projected output object. After this stage the "fit" action is done and the casting process will continue to the next model's attribute. 

4. [ **Parsing stage** ] <br>
After stage 2., a list of function (provided in the decorator options under the key `parsing`), will run one after the other where the output of the last function will be provided as the input for the next, has the input for the first function will be the original value.   

5. [ **Native Validation stage** ]  
The native-validation are the type's "from the box" validations, e.g `min`, `max` from `Number` type.
If all the native-validation (provided in the decorator options) passed the process continue to stage 6.

6. [ **Extra Validation stage** ]  
a list of function (provided in the decorator options under the key `validation`), will run one after the other. If all the validation function return will true the process continue to stage 7.

7. [ **Transforming stage** ]  
This stage acts just like `parsing` stage only after the entire validations requirements ended successfully. 
a list of function (provided in the decorator options under the key `transforming`), will run one after the other where the output of the last function will be provided as the input for the next, has the input for the first function will be the existing value from the last stage.  

<br>

## API Documentation


### **Decorators**


### `@field.<TYPE>`
Define the field type.

<br>


`@field.Number(options?: NumberFieldOptions) `

> description : <br>
Defines an attribute as a `number` type, with additional requirements.

> example
```ts
class MyModel {
    @fields.Number({
        min: 10
    })
    myNumber: number;
}
```

<br>

`@field.String(options?: StringFieldOptions) `

> description : <br>
Defines an attribute as a `string` type, with additional requirements.

> example
```ts
class User {
    @fields.string()
    id: string;

    @fields.string({ format: /^ ... $/ })
    email: string;
}
```
<br>

`@field.Boolean(options?: BooleanFieldOptions) `

> description : <br>
Defines an attribute as a `boolean` type, with additional requirements.

> example
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

`@field.Array(options?: ArrayFieldOptions) `

> description : <br>
Defines an attribute as a `array` type, with additional requirements.

> example

<br>

`@field.Model(options?: ModelFieldOptions) `

> description : <br>
Defines an attribute as a `Model` type, with additional requirements. 

> example
```ts
class User {
    @fields.string()
    id: string;

    @fields.string({ format: /^ ... $/ })
    email: string;
}

class MyModel {
    @fields.Model()
    user: User;
}
```
<br>


### `@parsing.<PARSER>`
Define (append to) the field's (pre-validation) parsing process.  

<br>

`@parsing.JsonStringify`

> description : <br>
Add (the native) JSON.stringify function to the parsing function list.

> example
```ts
class RequestQs {    
    @parsing.JsonStringify
    age_range: : string
}
const { value } = cast(ImageData, { 
    age_rage: [13,30], 
}); 

// value :  "[[1,2],[2,3]]"


```

<br>

`@parsing.JsonParse`

> description : <br>
Add (the native) JSON.parse function to the parsing function list.

> example
```ts
class ImageData {    
    @parsing.JsonParse
    @field.Array()
    imageTensor: Array<Array<Array<number>>>;
}
const { value } = cast(ImageData, { 
    imageTensor: "[[1,2],[2,3]]", 
}); 

// value :  
/*
[ 
    [1,2], 
    [2,3] 
]
*/

```


<br>


### **Models**

### `interface BaseFieldOptions`


|Key |Type | Default | Description |
|--- |---  |---      |---          |
| `attribute`  | `string`  | <details>  same as the decorated attribute  </details> | <details> Mapping key  </details> |
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

### `interface NumberFieldOptions extends BaseFieldOptions`

|Key |Type | Default | Description |
|--- |---  |---      |---          |
| `min`   | `number` | `undefined` | <details> Minimum value restriction.</details> |
| `max`   | `number` | `undefined` | <details> Maximum value restriction. </details> |

<br>

### `interface StringFieldOptions extends BaseFieldOptions`


|Key |Type | Default | Description |
|--- |---  |---      |---          |
| `format`   | `string` / `RegExp` | `undefined` | <details> Value's format restriction. </details> |
| `enums`   | `Array<string>` | `undefined` | <details>Group of valid of values restriction. </details> |

<br>

### `interface BooleanFieldOptions extends BaseFieldOptions`

|Key |Type | Default | Description |
|--- |---  |---      |---          |
| --   | -- | -- | -- |

<br>

### `interface ArrayFieldOptions extends BaseFieldOptions`

|Key |Type | Default | Description |
|--- |---  |---      |---          |
| `minLength`   | `number` | -- | -- |
| `maxLength`   | `number` | -- | -- |
| `ofType`      | `Array<string>` | `undefined` | <details> Validate the type of each item in the array. </details> |
| `allowType`   | any primitive type string | `undefined`| -- |

<br>

### `interface ModelFieldOptions extends BaseFieldOptions`

|Key |Type | Default | Description |
|--- |---  |---      |---          |
| --   | -- | -- | -- |

<br>

### `interface ModelSpec` 

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
<br>
<br>

## Future TODO - expect soon
    * high level module documentation 
    * in detail API documentation 
        * each decorator & option
        * custom user extension - for type-handle & options
    * add @field.Infer decorator, for auto type inferring.
    * reduce unnecessary nested structure on error object (error on nested model fields).
    * create global key-value registration repository for parsing - transformations - validations.


## Near Future Feature - expect sooner then later
    * add model-array decorator
        * with options of multiple model, where the list should be strict to single consist model or any of the provided.


## Future Feather - expect later

    * add modelToJson / XML utility function, for serialization of the model definitions.
    * model doc generation tool / module/ plugin.


