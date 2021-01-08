
# Tunnel-Cast/Common

Object-To-Model library, lets the user construct a strict model definition using ES6 class and Typescript Decorators api, the model class will wrap and describe the parsing, validation and transformation processes.

![casting process](/packages/common/docs/casting-process-lean.png)

<br>

## Highlights
 * Embedding an input processing logic & validation in the model class definitions using decorators. 
 * Supporting common types and your own Models as (nested) class attributes in your model class definition.
 * Providing an easy API to customize each stage in the process, parsing, validating and transforming.
 * Supporting Model class extending (eg. `class AdminModel extends UserModel ...`)

<br>

## Install

```sh
npm install @tunnel-cast/common
```
> *Note:* <br>
> This package required the peerDependencies : <br>
> `@tunnel-cast/core`  


<br>

## Test

1. Clone the project repo.
2. Move to project folder.
3. Run `npm i`
4. Run `npm run test`

<br>



## See Documentation

* #### [The general flow of the `cast` process](/packages/common/docs/general-flow.md) 

* #### [Decorators](/packages/common/docs/api-documentation/decorators.md)

* #### [Models](/packages/common/docs/api-documentation/models.md)

* #### [Methods](/packages/common/docs/api-documentation/methods.md)

* #### [Errors](/packages/common/docs/api-documentation/errors.md)

<br>



## Example

```ts
import { String, Boolean, Number, Model, Required, JsonParse } from '@tunnel-cast/common'
import { cast } from '@tunnel-cast/common/cast'

class User {
    @String({ required: false })
    username: string;

    @String()
    email: string;

    @Boolean({ required: false })
    notificationOn: number;
}

class ServerResponse {
    @Required(true)
    @Number({ 
        min: 3,
        parsing: [(val) => Number(val)]
    })
    apiVersion: number;

    @JsonParse
    @field.Array()
    imageTensor: Array<Array<number>>;

    @Model()
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

<br>




