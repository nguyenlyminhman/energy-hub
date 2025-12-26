export class MeterRecord {
  private constructor(
    public readonly id: string,
    public oldValue: number,
    public newValue: number,
    public readonly createdAt: Date,
    public readonly createdBy: string,
  ) {}

  /* Dùng khi tạo mới trong domain */
  static create(params: {
    oldValue: number;
    newValue: number;
    createdBy: string;
  }): MeterRecord {
    if (params.oldValue < 0 || params.newValue < 0) {
      throw new Error('Reading value must be >= 0');
    }
    if (params.newValue < params.oldValue) {
      throw new Error('New reading must be >= old reading');
    }

    return new MeterRecord(
      crypto.randomUUID(),
      params.oldValue,
      params.newValue,
      new Date(),
      params.createdBy,
    );
  }

  /* 🔥 DÙNG RIÊNG CHO REPOSITORY */
  static fromPersistence(params: {
    id: string;
    oldValue: number;
    newValue: number;
    createdAt: Date;
    createdBy: string;
  }): MeterRecord {
    return new MeterRecord(
      params.id,
      params.oldValue,
      params.newValue,
      params.createdAt,
      params.createdBy,
    );
  }

  updateValue(newValue: number) {
    if (newValue < this.oldValue) {
      throw new Error('Updated value must be >= old value');
    }
    this.newValue = newValue;
  }
}
