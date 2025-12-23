

export abstract class BaseEntity {
  public created_at: Date = new Date();
  public updated_at: Date = new Date();

  constructor(
    public created_by: string,
    public updated_by: string,
  ) {}
}