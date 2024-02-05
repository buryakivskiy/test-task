import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { JobService } from "./job.service";
import { CreateJobDto } from "./dto/create-job.dto";
import { PercentSpendResponse } from "./responses/persent-spend.response";

@Controller('jobs')
export class JobController {
  constructor(
    private readonly jobService: JobService,
  ) {}

  @Post('/create')
  async create(
    @Body(new ValidationPipe()) body: CreateJobDto,
  ): Promise<PercentSpendResponse> {
    const percentSpent = await this.jobService.create({
      ...body,
      startTime: new Date(body.startTime),
      endTime: new Date(body.endTime),
    });
    
    return new PercentSpendResponse(percentSpent);
  }
}