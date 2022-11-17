import { DB_TABLE_NAME, ENUMTypeColumnEntity } from '../enum/database.enum';
import { ExtendedEntity } from './extended_entity'; 
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { SERIALIZE_GROUP } from '../enum/serialization-group.enum';
import { ClassTransformOptions, Expose } from 'class-transformer';

@Entity(DB_TABLE_NAME.LINE_USER)
export class LineUserEntity extends ExtendedEntity {
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

  @Column({ length: 50, nullable: true})
  @Expose({
    groups: [SERIALIZE_GROUP.GROUP_USER],
  })
  line_id: string;

  @Column({ length: 20, nullable: true})
  @Expose({
    groups: [SERIALIZE_GROUP.GROUP_USER],
  })
  line_user_type: string;

  @Column({ nullable: true })
  @Expose({
    groups: [SERIALIZE_GROUP.GROUP_USER, SERIALIZE_GROUP.GROUP_USER],
  })
  last_active: Date;

}