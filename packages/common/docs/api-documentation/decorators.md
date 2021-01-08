

## **Decorators**


### `Field Type Decorators`
Define the field type.

<br>


`@Number(options?: NumberFieldOptions) `

> Description : <br>
Defines an attribute as a `number` type, with additional requirements.

> Example :
```ts
class MyModel {
    @Number({
        min: 10
    })
    myNumber: number;
}
```

<br>
<br>

`@String(options?: StringFieldOptions) `

> Description : <br>
Defines an attribute as a `string` type, with additional requirements.

> Example :
```ts
class User {
    @String()
    id: string;

    @String({ format: / ... / })
    email: string;
}
```  

<br>
<br>

`@Boolean(options?: BooleanFieldOptions) `

> Description : <br>
Defines an attribute as a `boolean` type, with additional requirements.

> Example :
```ts
class MyModel {
    @Boolean({
        required: false,
        default: true
    })
    myNumber: boolean;
}
```

<br>
<br>

`@Array(options?: ArrayFieldOptions) `

> Description : <br>
Defines an attribute as a `array` type, with additional requirements.

> Example :
```ts
class ImageData {    
    @Array()
    imageTensor: Array<Array<number>>;
}
const { value } = cast(ImageData, { 
    imageTensor: [ [1,2], [2,3] ], 
}); 
```

<br>
<br>

`@Model(options?: ModelFieldOptions) `

> Description : <br>
Defines an attribute as a `Model` type, with additional requirements. 

> Example :
```ts
class User {
    @String()
    id: string;

    @String({ format: /^ ... $/ })
    email: string;
}

class MyModel {
    @fields.Model()
    user: User;
}
```

<br>
<br>

> *Note* : <br>
> The type decorator define the layout for any additional definitions that follows, there for it must come first in the decoration order.

<br>
<br>
<hr>
<br>
<br>



### `Field Option Decorators`

All type decorator option interfaces extends from `BaseFieldOptions`, setting the fields inherited from `BaseFieldOptions` can be done by using the option object passed as the decorator argument, or by using field option decorators, all field in the interface `BaseFieldOptions` have a decorator representation - <br> 
`BaseFieldOptions.<fieldName>` ---> `@FieldName`

<br>
<br>

`@Required(value: boolean)` <br>

> Description : <br>
Set the field's required restriction. <br>

> Example :

```ts
import { String, Required } from "@tunnel-cast/core/decorator";

class Result {    

    @Required(true)
    @String()
    name: string;
}
```

An alternative usage to `BaseFieldOptions.required`.

<br>
<br>


`@Assert(type?: PrimitiveType | Class | [PrimitiveType] | [Class])`

> Description : <br>
Define the original (untouched) attribute type. <br>
The Assertion comes before the parsing stage and any other procedure in the casting flow.

> Example :
```ts
import { Array, Assert } from "@tunnel-cast/core/decorator";

class Result {    

    @Assert(['string'])
    @Array({ 
        parsing: [(value) => value.map(s => Number(s))]
        ofType: 'number',
    })
    age_range: string[];
}
const { value } = cast(Result, { 
    age_rage: ["13","30"], 
}); 

// value :  [13, 30]
```

An alternative usage to `BaseFieldOptions.assert`.


<br>
<br>
<hr>
<br>
<br>



### `Field Parsing Decorators`
Collection of commonly used parsing action wrapped as a field option decorator. <br>
Each parsing decorator append an action to the field's (pre-validation) parsing process. <br> 

<br>
<br>

`@JsonStringify`

> Description : <br>
Add (the native) JSON.stringify function to the parsing function list.

> Example :
```ts
class RequestQs {    
    @JsonStringify
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

`@JsonParse`

> Description : <br>
Add (the native) JSON.parse function to the parsing function list.

> Example :
```ts
class ImageData {    
    @JsonParse
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
<hr>
<br>
<br>
