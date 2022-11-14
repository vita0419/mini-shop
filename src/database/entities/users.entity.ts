import { DB_TABLE_NAME } from '../enum/database.enum';
import { ExtendedEntity } from './extended_entity'; 
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SERIALIZE_GROUP } from '../enum/serialization-group.enum';
import { ClassTransformOptions, Expose } from 'class-transformer';

@Entity(DB_TABLE_NAME.USER)
export class UserEntity extends ExtendedEntity {
  @Column({ name: 'is_active', default: true })
  @Expose({
    groups: [SERIALIZE_GROUP.GROUP_USER],
  })
  isActive: boolean;

  @PrimaryGeneratedColumn()
  @Expose({
    groups: [SERIALIZE_GROUP.GROUP_USER],
  })
  id: number;

  @Column({ name: 'name', length: 255 ,nullable: true})
  @Expose({
    groups: [SERIALIZE_GROUP.GROUP_USER],
  })
  name: string;

  @Column({ name: 'email', length: 255 ,nullable: true})
  @Expose({
    groups: [SERIALIZE_GROUP.GROUP_USER],
  })
  email: string;

  @Column({ length: 15, nullable: true })
  @Expose({
    groups: [SERIALIZE_GROUP.GROUP_USER],
  })
  phone: string;

  @Column({ length: 225, nullable: true })
  @Expose({
    groups: [SERIALIZE_GROUP.GROUP_USER],
  })
  address: string;

  @Column({ length: 50 })
  @Expose({
    groups: [SERIALIZE_GROUP.GROUP_USER],
  })
  line_id: string;
}
