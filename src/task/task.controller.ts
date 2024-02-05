import { Controller, Get, Query, ValidationPipe } from "@nestjs/common";
import { TaskService } from "./task.service";
import { TasksResponse } from "./responses/tasks.response";
import { GetTasksQueryParamsDto } from "./dto/get-tasks-query-params.dto";

@Controller('tasks')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
  ) {}

  @Get()
  async getTasks(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    queryParams: GetTasksQueryParamsDto,
  ): Promise<TasksResponse> {
    const tasks = await this.taskService.find({
      sort: {
        percentSpent: queryParams.percentSpent,
      }
    });

    return new TasksResponse(tasks);
  }
}