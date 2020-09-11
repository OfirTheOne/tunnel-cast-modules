



import { field, parsing } from '../lib/core/decorator'
import { cast } from '../lib/core/cast'
import { modelSpec } from '../lib/core/model-spec'

class User {

    @field.options.set('format', /^Bob.*$/)
    @field.String({ 
        assert: 'number',
        required: false,
        attribute: "name"
    })
    username: string;

    @field.String()
    email: string;

    @field.Boolean({ required: false })
    notificationOn: number;
}

class ServerResponse {
    
    @field.Assert('string')
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
        user: { email: 'user@examle.com', username: 'John', name: "Bob" } 
}); 


console.log(JSON.stringify({ value, errors }, undefined, 2))
// console.log(modelSpec(ServerResponse).serialize(2))

