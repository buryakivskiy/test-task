import { TaskEntity } from '../../task/entities/task.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Job')
export class JobEntity {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Column({
    type: 'timestamp',
  })
  public startTime: Date;

  @Column({
    type: 'timestamp',
  })
  public endTime: Date;

  @ManyToOne(() => TaskEntity, (task) => task.jobs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'taskId' })
  public task: TaskEntity;

  @ManyToOne(() => UserEntity, (user) => user.jobs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  public user: UserEntity;
}
