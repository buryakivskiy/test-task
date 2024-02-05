import { IJob } from "src/job/interfaces/job.interface";

export interface ITask{
    readonly id: number;
  
    readonly cost: number;

    readonly startTime: Date;

    readonly endTime: Date;

    readonly jobs?: IJob[];

    percentSpent?: number;
}