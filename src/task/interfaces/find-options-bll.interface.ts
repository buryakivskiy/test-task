import { SortingOrders } from "src/common/enums/sorting-orders.enum";

export interface IFindTasksOptionsBLL{
    readonly percentSpent?: SortingOrders;
    readonly percentSpentFrom?: number;
    readonly percentSpentTo?: number;
}