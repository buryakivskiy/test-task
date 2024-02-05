import { JobEntity } from '../../job/entities/job.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, VirtualColumn } from 'typeorm';

@Entity('Task')
export class TaskEntity {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Column({
    type: 'decimal',
  })
  public cost: number;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  public startTime: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  public endTime: Date;

  @OneToMany(() => JobEntity, (job) => job.task)
  public jobs: JobEntity[]
}
