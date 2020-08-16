


export class ModelMetadataRepoNotFoundError extends Error {

    public code = 'ModelMetadataRepoNotFound';

    constructor(modelName: string) {
        super(
            `Metadata repository not found in "${modelName}."`
        );
    }   
}