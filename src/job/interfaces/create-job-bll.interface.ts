export interface ICreateJobBLL{
    readonly userId: number;

    readonly taskId: number;

    readonly startTime: Date;

    readonly endTime: Date;
}