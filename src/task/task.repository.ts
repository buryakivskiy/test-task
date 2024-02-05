import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { TaskEntity } from "./entities/task.entity";

@Injectable()
export class TaskRepository {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  public async findById(id: number): Promise<TaskEntity> {
    return this.taskRepository.findOne({ where: { id } });
  }

  public async findWithRelations(): Promise<TaskEntity[]> {
    return this.taskRepository.find({
        relations: {
            jobs: {
              user: true
            }
        }
    });
  }
}