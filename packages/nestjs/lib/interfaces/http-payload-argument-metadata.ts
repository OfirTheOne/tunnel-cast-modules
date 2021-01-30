import { HttpPayloadType } from "../enums";

export interface HttpPayloadArgumentMetadata {
    payloadType: HttpPayloadType,
    argumentIndex: number
}