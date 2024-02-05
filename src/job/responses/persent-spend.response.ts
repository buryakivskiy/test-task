import { Exclude, Expose } from "class-transformer";

@Exclude()
export class PercentSpendResponse {
  @Expose()
  public readonly percentSpent: number;

  constructor(percentSpent: number) {
    this.percentSpent = percentSpent;
  }
}