export class Meter {
  constructor(
    public readonly id: number | null,   // null before persisted
    public meterCode: string | null,
    public pricePlanId: number | null,
    public createdAt: Date | null,
    public createdBy: string | null,
  ) {}

  // domain behavior if any, e.g., attachPricePlan
  attachPricePlan(planId: number) {
    this.pricePlanId = planId;
  }
}