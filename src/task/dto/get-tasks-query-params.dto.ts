import { IsEnum, IsOptional } from "class-validator";
import { SortingOrders } from "src/common/enums/sorting-orders.enum";

export class GetTasksQueryParamsDto {
  @IsEnum(SortingOrders)
  @IsOptional()
  readonly percentSpent?: SortingOrders;
}
