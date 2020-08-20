# Tunnel Cast


```
short description.
```


## Highlights
 * a
 * b
 * c


## Install

```sh
npm install tunnel-cast
```


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

A process of casting (as this module implements) an object to a model (a class with decorated attributes), 
_____ by iterating the model's decorated attributes, and one by one, trying to **fit** the matching key's (or mapping key) value from the input object to the current processed model's attribute.

The "fit" action assembled with cupel of sub stages : 

1. (**"extracting" stage**) extracting the value from the input object. using the origin attribute name of a mapping key (provided in the decorator options).  

2. (**"existents" stage**) check the input attribute value "existents" status against the `required` (or `nullable`) requirement. 

If stage 2. fails - an error thrown. 
If stage 2. passes with an existing value - the process continue to the "parsing" stage. 
If stage 2. passes with non existing value, the process continue to the "defaulting" stage.

3. (**"defaulting" stage**) if a default value provided in the decorator options, the default value will be assigned to projected output object. after this stage the "fit" action is done and the  casting process will continue to the next model's attribute. 

4. (**"parsing" stage**) 

5. (**"native validation" stage**) 

6. (**"extra validation" stage**) 

7. (**"transforming" stage**) 

<br>

## API Documentation




### `@field.<TYPE>`

<br>


`@field.Number(options?:  ) `

> description

> example

_____

`@field.String(options?:  ) `

> description

> example

_____

`@field.Boolean(options?:  ) `

> description

> example

_____

`@field.Array(options?:  ) `

> description

> example

_____

`@field.Model(options?:  ) `

> description

> example

_____
<br>

### `@parsing.<PARSER>`


<br>

`@parsing.JsonStringify`

> description

> example

_____

`@parsing.JsonParse`

> description

> example

_____
<br>
<br>

### Models

`interface BaseFieldOptions`


<b>Key</b> : `attribute`  &nbsp; &nbsp; &nbsp; |  &nbsp; <b>Type</b> : `string`  
<b>Default</b> : same as the decorated attribute           <br>
<b>Description</b> :       <br>

---

<b>Key</b> : `validate`  &nbsp; &nbsp; &nbsp; &nbsp; |  &nbsp; <b>Type</b> : `boolean`  
<b>Default</b> :           <br>
<b>Description</b> :       <br>

---

<b>Key</b> : `required`  &nbsp; &nbsp; &nbsp; &nbsp; |  &nbsp; <b>Type</b> : `boolean`  
<b>Default</b> :  `true`         <br>
<b>Description</b> :       <br>

---

<b>Key</b> : `requiredIf`  &nbsp; &nbsp;  |  &nbsp; <b>Type</b> : `Function`     
<b>Default</b> : `undefined`         <br>
<b>Description</b> :       <br>

---

<b>Key</b> : `nullable`  &nbsp; &nbsp; &nbsp; &nbsp; |  &nbsp; <b>Type</b> : `boolean`    
<b>Default</b> :           <br>
<b>Description</b> :       <br>

---

<b>Key</b> : `nullableIf`  &nbsp; &nbsp; |  &nbsp; <b>Type</b> : `boolean`    
<b>Default</b> : `undefined`  <br>
<b>Description</b> :       <br>

---

<b>Key</b> : `default`  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; |  &nbsp; <b>Type</b> : `any`   
<b>Default</b> : `undefined`  <br>
<b>Description</b> : will be assigned as the default value if the field not exists and defined as not required.       <br>

---

<b>Key</b> : `error`  &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp;  &nbsp; |  &nbsp; <b>Type</b> : `boolean`    
<b>Default</b> : generic error massage          <br>
<b>Description</b> :       <br>

---

<b>Key</b> : `parsing`  &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; |  &nbsp; <b>Type</b> : `Array<Function>`    
<b>Default</b> : `[]`          <br>
<b>Description</b> : will run if pass required / nullable validation, and before any other validation / transformation will run.      <br>

---

<b>Key</b> : `validations`  &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; |  &nbsp; <b>Type</b> : `Array<Function>`    
<b>Default</b> : `[]`          <br>
<b>Description</b> : will run if all native validation pass and after.      <br>

---

<b>Key</b> : `transformations`  &nbsp; &nbsp; &nbsp; |  &nbsp; <b>Type</b> : `Array<Function>`    
<b>Default</b> : `[]`          <br>
<b>Description</b> : array of functions that receives the final value of the field till the  will run if all validation pass and after.      <br>



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


