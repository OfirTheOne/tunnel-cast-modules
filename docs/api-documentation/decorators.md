

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
