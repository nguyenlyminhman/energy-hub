export class MeterRecord {
  constructor(
    public readonly id: number | null,
    public readonly meterId: number,
    public readonly recordedValue: number,
    public readonly createdAt: Date | null,
    public readonly createdBy: string | null,
  ) {}
}
