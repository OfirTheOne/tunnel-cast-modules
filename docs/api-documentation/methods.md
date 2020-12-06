### **Methods**

`cast<T>(model: Class<T>, object: any): { value: T, errors: }`

> Description : <br>
Preform the casting process of a model on an object, it applies the model definitions on an object, and attempt to cast it to the model instance, in case of success the return value, will be an actual instance of the model class.

> Example : <br>
```ts
class User {
    @field.String({ 
        fallbackAttribute: "email"
    })
    username: string;

    @field.String()
    email: string;

    @field.Boolean({ required: false })
    notificationOn: number;
}

const { value, errors } = cast(User, { 
    email: 'john@examle.com', 
    username: 'John', 
}); 

if(errors) {
    throw Error('Invalid input.')
}

```
<br>
<br>
