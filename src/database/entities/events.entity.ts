import { DB_TABLE_NAME } from '../enum/database.enum';
import { ExtendedEntity } from './extended_entity'; 
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SERIALIZE_GROUP } from '../enum/serialization-group.enum';
import { ClassTransformOptions, Expose } from 'class-transformer';

@Entity(DB_TABLE_NAME.EVENT)
export class EventEntity extends ExtendedEntity {
  @Column({ name: 'is_active', default: true })
  @Expose({
    groups: [SERIALIZE_GROUP.GROUP_EVENT],
  })
  isActive: boolean;

  @PrimaryGeneratedColumn()
  @Expose({
    groups: [SERIALIZE_GROUP.GROUP_EVENT],
  })
  id: number;

  @Column({ name: 'bot_response_function', length: 255, nullable: true})
  @Expose({
    groups: [SERIALIZE_GROUP.GROUP_EVENT],
  })
  bot_response_function: string;

  @Column({ name: 'bot_response', length: 255 ,nullable: true})
  @Expose({
    groups: [SERIALIZE_GROUP.GROUP_EVENT],
  })
  bot_response: string;

  @Column({ length: 100, nullable: true })
  @Expose({
    groups: [SERIALIZE_GROUP.GROUP_USER],
  })
  user_input: string;

}