import { Injectable } from "@nestjs/common";
import { TaskRepository } from "./task.repository";
import { TaskEntity } from "./entities/task.entity";
import { ITask } from "./interfaces/task.interface";
import { IFindTasksOptionsDAL } from "./interfaces/find-options-dal.interface";
import { SortingOrders } from "src/common/enums/sorting-orders.enum";
import { IFindTasksOptionsBLL } from "./interfaces/find-options-bll.interface";
import { roundHours } from "src/common/utils/hours-round";

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
  ) {}

  public async findById(id: number): Promise<ITask> {
    return this.taskRepository.findById(id);
  }

  public async find(payload: IFindTasksOptionsBLL): Promise<ITask[]> {
    const options: IFindTasksOptionsDAL = {
      sort: {
        percentSpent: payload.percentSpent,
      },
      filter: {
        percentSpent: {
          from: payload.percentSpentFrom,
          to: payload.percentSpentTo,
        }
      }
    };

    const tasks = await this.taskRepository.findWithRelations();

    let preparedTasks = this.preparePercentageForTasks(tasks);

    if (options.sort?.percentSpent) {
      if (options.sort?.percentSpent == SortingOrders.Ascending) {
        preparedTasks.sort((a, b) => (a.percentSpent > b.percentSpent) ? 1 : -1);
      } else {
        preparedTasks.sort((a, b) => (a.percentSpent < b.percentSpent) ? 1 : -1);
      } 
    }

    if (options.filter?.percentSpent) {
      if (options.filter.percentSpent.from) {
        preparedTasks = preparedTasks.filter((task) => {
          return task.percentSpent >= options.filter.percentSpent.from;
        });
      }

      if (options.filter.percentSpent.to) {
        preparedTasks = preparedTasks.filter((task) => {
          return task.percentSpent <= options.filter.percentSpent.to;
        });
      }
    }

    return preparedTasks;
  }

  public preparePercentageForTasks(tasks: TaskEntity[]): ITask[] {
    return tasks.map( (task) => {
      const totalCost = task.jobs.reduce((total, job) => {
        const hoursWorked = roundHours((job.endTime.getTime() - job.startTime.getTime()) / (1000 * 60 * 60));
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