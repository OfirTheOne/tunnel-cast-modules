## TODO


* Errors
    * cover cast handle function with error classes for each case
    * over decorator options where user pass some type string crate invalid input error

* Low level models
    * define model for parsing, transformation, validation function
    * update Assert signature

* Logs
    * create global logger class with options for user to over ride
    * add options to cast / VERBOSE option to globals
    * add logging in critical places

* Summery 
    * create a function that return a readable summery string for the model.

* Extends 
    * allow user control in case of extending a model, if definition is overriding the super or appending it
    * implement the appending logic.

    

### Future TODO - expect soon
    * high level module documentation 
    * in detail API documentation 
        * each decorator & option
        * custom user extension - for type-handle & options
    * add @field.Infer decorator, for auto type inferring.
    * reduce unnecessary nested structure on error object (error on nested model fields).
    * create global key-value registration repository for parsing - transformations - validations.


### Near Future Feature - expect sooner then later
    * add model-array decorator
        * with options of multiple model, where the list should be strict to single consist model or any of the provided.


### Future Feather - expect later

    * add modelToJson / XML utility function, for serialization of the model definitions.
    * model doc generation tool / module/ plugin.


