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


