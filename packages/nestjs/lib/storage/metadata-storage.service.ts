import { Injectable, Type } from "@nestjs/common";

@Injectable()
export class MetadataStorage {
  map: Map<string, { model: Type<any> }>;

  constructor(models: Array<{ name: string; model: any }> = []) {
    this.map = models.reduce(
      (_map, { name, model }) => _map.set(name, { model }),
      new Map()
    );
  }
}
