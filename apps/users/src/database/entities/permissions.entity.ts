import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'permissions', schema: 'dbo' })
export class Permissions extends BaseEntity {
  @Column()
  name!: string;
}
