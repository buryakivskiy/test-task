import { SortingOrders } from "src/common/enums/sorting-orders.enum";

export interface IFindTasksOptionsDAL{
    readonly sort?: {
        readonly percentSpent?: SortingOrders;
    }

    readonly filter?: {
        readonly percentSpent?: {
            readonly from?: number;
            readonly to?: number;
        }
    }
}