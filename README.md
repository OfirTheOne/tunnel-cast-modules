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



## See Documentation

* #### [The general flow of the `cast` process](/docs/general-flow.md) 
* #### [API documentation](/docs/api-documentation/index.md)

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



