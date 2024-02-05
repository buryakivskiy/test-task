import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobModule } from './job/job.module';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { TypeormConfig } from './config/typeorm/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeormConfig,
    }),
    JobModule,
    UserModule, 
    TaskModule, 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
