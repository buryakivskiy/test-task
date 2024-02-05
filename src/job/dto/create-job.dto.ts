import { IsDateString, IsNumber } from "class-validator";

export class CreateJobDto {
    @IsNumber()
    readonly taskId: number;

    @IsNumber()
    readonly userId: number;

    @IsDateString()
    readonly startTime: string;

    @IsDateString()
    readonly endTime: string;
}