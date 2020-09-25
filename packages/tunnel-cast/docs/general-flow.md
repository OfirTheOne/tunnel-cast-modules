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
