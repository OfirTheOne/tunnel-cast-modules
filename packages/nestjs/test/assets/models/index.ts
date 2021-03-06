import { Number, String, Parsing } from "@tunnel-cast/common";

export class QueryTest01 {
  @Number()
  skip: number;

  @Number()
  limit: number;

  @String()
  name: string;
}

export class SampleModelB {
  @Parsing((value: string) => global.Number(value))
  @Number({
    min: 0,
    max: 50
  })
  skip: number;

  @Parsing((value: string) => global.Number(value))
  @Number({
    min: 0,
    max: 50
  })
  limit: number;

  @String.MaxLength(5)
  @String()
  name: string;
}
