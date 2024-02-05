import { JobEntity } from '../../job/entities/job.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('User')
export class UserEntity {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  public name: string;

  @Column({
    type: 'decimal',
  })
  public rate: number;

  @OneToMany(() => JobEntity, (job) => job.task)
  public jobs: JobEntity[]
}
