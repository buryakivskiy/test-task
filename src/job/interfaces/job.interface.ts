import { ITask } from "src/task/interfaces/task.interface";
import { IUser } from "src/user/interfaces/user.interface";

export interface IJob{
    readonly id: number;

    readonly startTime: Date;

    readonly endTime: Date;

    readonly user?: IUser;

    readonly task?: ITask;
}