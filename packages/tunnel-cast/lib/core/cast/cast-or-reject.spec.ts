


const mockCast = jest.fn()
jest.mock('./cast', () => {
    return {
        cast: mockCast
    }
});

import { castOrReject } from "./cast-or-reject";

describe("castOrReject", () => {

    afterEach(() => jest.resetAllMocks())

    it("should call castOrReject and throw messages list.", () => {
        const messages = ["error-message-01"];
        mockCast.mockReturnValueOnce({ messages, resolvedValue: { name: "bob" } });
        const model: any = { thisIsModel: true } , target = { thisIsTarget: true } , options = { thisIsOptions: true };
        expect( () => castOrReject(model, target, options)).toThrow(new Error(messages as any));
        expect(mockCast).toBeCalledTimes(1);
        expect(mockCast).toBeCalledWith(model, target, options);
    })

    it("should call castOrReject and return the resolvedValue.", () => {
        const messages = [];
        const resolvedValue = { name: "bob" };
        mockCast.mockReturnValueOnce({ messages, resolvedValue });
        const model: any = { thisIsModel: true } , target = { thisIsTarget: true } , options = { thisIsOptions: true };
        expect(castOrReject(model, target, options)).toEqual(resolvedValue);
        expect(mockCast).toBeCalledTimes(1);
        expect(mockCast).toBeCalledWith(model, target, options);
    })
    
    afterAll(() => jest.resetModules())
})

test.todo("castOrReject")


