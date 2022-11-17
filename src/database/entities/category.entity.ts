import { DB_TABLE_NAME } from '../enum/database.enum';
import { ExtendedEntity } from './extended_entity'; 
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SERIALIZE_GROUP } from '../enum/serialization-group.enum';
import { ClassTransformOptions, Expose } from 'class-transformer';

@Entity(DB_TABLE_NAME.CATEGORY)
export class CategoryEntity extends ExtendedEntity {
  @PrimaryGeneratedColumn()
  @Expose({
    groups: [SERIALIZE_GROUP.GROUP_PRODUCT],
  })
  id: number;

  @Column({ name: 'name', length: 255, nullable: true})
  @Expose({
    groups: [SERIALIZE_GROUP.GROUP_PRODUCT],
  })
  name: string;

  @Column({ name: 'description', length: 255, nullable: true})
  @Expose({
    groups: [SERIALIZE_GROUP.GROUP_PRODUCT],
  })
  description: string;

}