



import { String, Boolean, Number, Array, Model, OptionSetter, AssertType, parsing } from '../lib/common';
import { cast } from '../lib/common/cast'
import { modelSpec } from '../lib/core/model-spec'

class User {

    @OptionSetter('format', /^Bob.*$/)
    @String({ 
        assert: 'number',
        required: false,
        attribute: "name"
    })
    username: string;

    @String()
    email: string;

    @Boolean({ required: false })
    notificationOn: number;
}

class ServerResponse {
    
    @AssertType('string')
    @Number({ 
        min: 3,
        required: true,
        parsing: [(val) => Number(val)]
    })
    apiVersion: number;

    
    @parsing.JsonParse
    @Array()
    imageTensor: Array<Array<number>>;


    @Model()
    user: User
}

const { value, errors } = cast(ServerResponse, { 
        apiVersion: '9', 
        imageTensor: "[[1,2],[2,3]]", 
        user: { email: 'user@examle.com', username: 'John', name: "Bob" } 
}); 


console.log(JSON.stringify({ value, errors }, undefined, 2))
// console.log(modelSpec(ServerResponse).serialize(2))

namespace SomeSpecificApiRequestName {

    class Body {
        
    }

    class Headers {
        
    }

    class Params {

    }

    class Query {
        
    }

    class ApiRequest {
        body: Body;
        headers: Headers;
        params: Params;
        query: Query;
    }
}