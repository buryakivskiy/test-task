import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobEntity } from './entities/job.entity';
import { JobController } from './job.controller';
import { JobRepository } from './job.repository';
import { JobService } from './job.service';
import { UserModule } from 'src/user/user.module';
import { TaskModule } from 'src/task/task.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([JobEntity]),
        UserModule,
        TaskModule,
    ],
    controllers: [JobController],
    providers: [JobRepository, JobService],
})
export class JobModule {}
