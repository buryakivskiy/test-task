import { Injectable } from "@nestjs/common";
import { TaskRepository } from "./task.repository";
import { TaskEntity } from "./entities/task.entity";
import { ITask } from "./interfaces/task.interface";
import { IFindTasksOptions } from "./interfaces/find-options.interface";
import { SortingOrders } from "src/common/enums/sorting-orders.enum";

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
  ) {}

  public async findById(id: number): Promise<ITask> {
    return this.taskRepository.findById(id);
  }

  public async find(options: IFindTasksOptions): Promise<ITask[]> {
    const tasks = await this.taskRepository.findWithRelations();

    const preparedTasks = this.preparePercentageForTasks(tasks);

    if (options.sort?.percentSpent) {
      if (options.sort?.percentSpent == SortingOrders.Ascending) {
        preparedTasks.sort((a, b) => (a.percentSpent > b.percentSpent) ? 1 : -1);
      } else {
        preparedTasks.sort((a, b) => (a.percentSpent < b.percentSpent) ? 1 : -1);
      } 
    }

    return preparedTasks;
  }

  public preparePercentageForTasks(tasks: TaskEntity[]): ITask[] {
    return tasks.map( (task) => {
      const totalCost = task.jobs.reduce((total, job) => {
        const hoursWorked = (job.endTime.getTime() - job.startTime.getTime()) / (1000 * 60 * 60);
        const costOfJob = hoursWorked * job.user.rate;

        return total + costOfJob;
      }, 0);

      const percentSpent = totalCost / task.cost * 100;

      return {
        ...task,
        percentSpent: percentSpent, 
      }
    });
  }
}