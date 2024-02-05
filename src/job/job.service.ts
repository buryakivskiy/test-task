import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JobRepository } from "./job.repository";
import { ICreateJobBLL } from "./interfaces/create-job-bll.interface";
import { UserService } from "src/user/user.service";
import { TaskService } from "src/task/task.service";

@Injectable()
export class JobService {
  constructor(
    private readonly jobRepository: JobRepository,
    private readonly userService: UserService,
    private readonly taskService: TaskService,
  ) {}

  public async create(payload: ICreateJobBLL): Promise<number> {
    const user = await this.userService.findById(payload.userId);
    if (!user) throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

    const task = await this.taskService.findById(payload.taskId);
    if (!task) throw new HttpException('Task not found', HttpStatus.BAD_REQUEST);

    const jobs = await this.jobRepository.findManyByTaskId(task.id);

    const currentCost = jobs.reduce((total, job) => {
      const hoursWorked = (job.endTime.getTime() - job.startTime.getTime()) / (1000 * 60 * 60);
      const costOfJob = hoursWorked * job.user.rate;

      return total + costOfJob;
    }, 0);
    const hoursWorked = (payload.endTime.getTime() - payload.startTime.getTime()) / (1000 * 60 * 60);
    const newCost = currentCost + hoursWorked * user.rate;

    if (newCost > task.cost) {
      throw new HttpException('Exceeding limit for the task', HttpStatus.BAD_REQUEST);
    }

    await this.jobRepository.create({
      ...payload,
      task,
      user,
    });

    return newCost / task.cost * 100;
  }
}