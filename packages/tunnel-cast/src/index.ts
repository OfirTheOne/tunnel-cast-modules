



import { String, Boolean, Number, Array, Model, OptionSetter, AssertType, JsonParse } from '../lib/common';
import { cast } from '../lib/common/cast'
import { extractRootRepo } from '../lib/core/internal/model-metadata/extract-metadata'

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

class Admin extends User {

    @OptionSetter('format', /.+@admin\.com/)
    email: string
}

class ServerResponse {
    
    @AssertType('string')
    @Number({ 
        min: 3,
        required: true,
        parsing: [(val) => Number(val)]
    })
    apiVersion: number;

    
    @JsonParse
    @Array()
    imageTensor: Array<Array<number>>;


    @Model()
    user: Admin
}

const extractedModel = extractRootRepo(ServerResponse);

console.log(extractedModel)
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