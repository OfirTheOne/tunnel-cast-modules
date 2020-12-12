import { extractValue } from "./extract-value";

describe("extractValue util", () => {
  it("should extract nested value correctly.", () => {
    const actual = extractValue({ a: { b: { c: 30 } } }, "a.b.c");
    const expected = 30;

    expect(actual).toEqual(expected);
  });

  it("should no found the nested value on path.", () => {
    const actual = extractValue({ a: { b: { c: 30 } } }, "a.c");
    const expected = undefined;

    expect(actual).toEqual(expected);
  });

  it("should return undefined when object is undefined.", () => {
    const actual = extractValue(undefined, "a.c");
    const expected = undefined;

    expect(actual).toEqual(expected);
  });
});
