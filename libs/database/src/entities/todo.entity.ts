import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './users.entity';

@Entity({ name: 'todo', schema: 'dbo' })
export class Todo extends BaseEntity {
  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column({ default: 'Ongoing' })
  status!: string;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  assignee!: User;

  @Column({ name: 'due_date' })
  dueDate!: Date;
}
