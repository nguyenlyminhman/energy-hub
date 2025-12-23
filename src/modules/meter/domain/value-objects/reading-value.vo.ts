export class ReadingValue {
  constructor(public readonly value: number) {
    if (!Number.isInteger(value) || value < 0) throw new Error('Invalid reading');
  }
}
