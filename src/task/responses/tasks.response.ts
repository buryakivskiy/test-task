import { Exclude, Expose } from 'class-transformer';
import { ITask } from '../interfaces/task.interface';
import { TaskResponse } from './task.response';

@Exclude()
export class TasksResponse {
  @Expose()
  public readonly tasks: TaskResponse[];

  constructor(tasks: ITask[]) {
    this.tasks = tasks.map((task) => new TaskResponse(task));
  }
}