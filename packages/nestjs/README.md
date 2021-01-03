# Tunnel Cast - NestJS 

## About 
This is a Tunnel-Cast - NestJS integration package, wrap the `cast` application into the `NestJS` building blocks.


<br>
<br>


## Install

```shell
npm i @tunnel-cast/nestjs
```

> *Note:* <br>
> This package required the peerDependencies of a nest project.  


<br>
<br>


## Example 

The first step is to define a model for the object intend to be cast. <br>
Then apply it in the nest controller using a parameter decorator or an interceptor.

<br>

#### Define models using tunnel-cast decorators :

<br>

```ts

// file: cats/cast-models/index.ts

import { String, Number, Required, Default, Parsing } from '@tunnel-cast/common';

export class GetAllCats_Query {
    
    @Number.Min(1)          // - validation : 1 <= value 
    @Number.Max(15)         // - validation : value < 15
    @Parsing(global.Number) // - parsing (pre-validation action) : apply Number constructor
    @Required(false)        // - optional
    @Default(10)            // - default : 10  
    @Number()               // - type : number
    limit: number;

    @Required(false)        // - optional
    @Default(0)             // - default : 0  
    @Number.Min(0)          // - validation : 0 <= value
    @Parsing(global.Number) // - parsing (pre-validation action) : apply Number constructor
    @Number()               // - type : number
    skip: number;        
}


export class GetCatsByType_Params {

    @Required(true)     // - required 
    @String.Enums([     // - validation : value in  { 'house_cat', 'bobcat', 'tiger' }
        'house_cat', 
        'bobcat', 
        'tiger'
    ])  
    @String()           // - type : string
    type: string;
}

```

<br>

#### Use the cast parameter-decorators with the defined models :

<br>

```ts

// file: cats/cats.controller.ts

import { Controller, Get } from '@nestjs/common';
import { CastQuery, CastParam } from '@tunnel-cast/nestjs/parameter-decorators';
import { GetAllCats, GetCatsByType} from './cast-models'

@Controller('cats')
export class CatsController {
    @Get()
    getCats(@CastQuery() query: GetAllCats_Query) {
        // "cast" process passed successfully
        // ...
    }
    
    @Get(':type')
    getCatsByType(@CastParam() params: GetCatsByType_Params) {
        // "cast" process passed successfully
        // ...
    }
}


```