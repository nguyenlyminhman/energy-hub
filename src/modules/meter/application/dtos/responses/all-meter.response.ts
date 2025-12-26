import { Meter } from "src/modules/meter/domain/entities/meter";

export class AllMeterResponse {
  constructor(
    public readonly meters : Meter []
  ) {}
}
