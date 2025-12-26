export class ReadingValue {
  public readonly oldValue: number;
  public readonly newValue: number;

  constructor(oldValue: number, newValue: number) {
    if (!Number.isInteger(newValue) || newValue < 0) {
      throw new Error('Invalid new reading value');
    }

    if (oldValue !== null) {
      if (!Number.isInteger(oldValue) || oldValue < 0) {
        throw new Error('Invalid old reading value');
      }

      if (newValue < oldValue) {
        throw new Error('New reading must be greater than or equal to old reading');
      }
    }

    this.oldValue = oldValue;
    this.newValue = newValue;
  }
}
