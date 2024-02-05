import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JobEntity } from "./entities/job.entity";
import { Repository } from "typeorm";
import { IJob } from "./interfaces/job.interface";
import { ICreateJobDAL } from "./interfaces/create-job-dal.interface";

@Injectable()
export class JobRepository {
  constructor(
    @InjectRepository(JobEntity)
    private readonly jobRepository: Repository<JobEntity>,
  ) {}

  public async findManyByTaskId(taskId: number): Promise<IJob[]> {
    return this.jobRepository.find({
      where: {
        task: {
          id: taskId,
        }
      },
      relations: {
        user: true,
      }
    });
  }

  public async create(data: ICreateJobDAL): Promise<IJob> {
    const job = this.jobRepository.create(data);

    return this.jobRepository.save(job)[0];
  }
}