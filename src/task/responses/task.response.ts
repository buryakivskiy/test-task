import { Exclude, Expose } from "class-transformer";
import { ITask } from "../interfaces/task.interface";

@Exclude()
export class TaskResponse {
  @Expose()
  public readonly id: number;

  @Expose()
  public readonly cost: number;

  @Expose()
  public readonly startTime: Date;

  @Expose()
  public readonly endTime: Date;

  @Expose()
  public readonly percentSpent: number;

  constructor(task: ITask) {
    this.id = task.id;
    this.cost = task.cost;
    this.startTime = task.startTime;
    this.endTime = task.endTime;
    this.percentSpent = task.percentSpent;
  }
}