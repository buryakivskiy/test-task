import { SortingOrders } from "src/common/enums/sorting-orders.enum";

export interface IFindTasksOptions{
    readonly sort?: {
        readonly percentSpent?: SortingOrders;
    }
}