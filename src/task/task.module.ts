import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { TaskController } from './task.controller';
import { TaskRepository } from './task.repository';
import { TaskService } from './task.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([TaskEntity])
    ],
    controllers: [TaskController],
    providers: [TaskRepository, TaskService],
    exports: [TaskService],
})
export class TaskModule {}
