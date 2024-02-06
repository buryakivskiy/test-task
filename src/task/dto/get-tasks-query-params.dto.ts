import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsOptional } from "class-validator";
import { SortingOrders } from "src/common/enums/sorting-orders.enum";

export class GetTasksQueryParamsDto {
  @IsEnum(SortingOrders)
  @IsOptional()
  readonly percentSpent?: SortingOrders;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  readonly percentSpentFrom?: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  readonly percentSpentTo?: number;
}
