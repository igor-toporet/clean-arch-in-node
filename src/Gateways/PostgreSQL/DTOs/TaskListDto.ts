import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity("task_list")
@Unique("UQ_name", ["name"])
export class TaskListDto {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;
}
