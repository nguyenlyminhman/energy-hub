export class CreateMeterVO {
  public readonly meterCode: string;

  constructor(meterCode: string) {
    if (meterCode == null || meterCode == undefined || meterCode == '') {
      throw new Error('Invalid meter code');
    }

    this.meterCode = meterCode;
  }
}
