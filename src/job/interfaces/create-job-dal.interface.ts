import { ITask } from "src/task/interfaces/task.interface";
import { IUser } from "src/user/interfaces/user.interface";

export interface ICreateJobDAL{
    readonly user: IUser;

    readonly task: ITask;

    readonly startTime: Date;

    readonly endTime: Date;
}