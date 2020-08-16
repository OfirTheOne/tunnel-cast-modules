



import { field, parsing } from '../lib/core/decorator'
import { cast } from '../lib/core/cast'

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