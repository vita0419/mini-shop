import { DB_TABLE_NAME } from '../enum/database.enum';
import { ExtendedEntity } from './extended_entity'; 
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SERIALIZE_GROUP } from '../enum/serialization-group.enum';
import { ClassTransformOptions, Expose } from 'class-transformer';

@Entity(DB_TABLE_NAME.BASKET)
export class BasketEntity extends ExtendedEntity {
  @PrimaryGeneratedColumn()
  @Expose({
    groups: [SERIALIZE_GROUP.GROUP_EVENT],
  })
  id: number;

  @Column("int",{ name: 'product_id', nullable: true, array: true })
  @Expose({
    groups: [SERIALIZE_GROUP.GROUP_EVENT],
  })
  product_id: number[];

  @Column({ name: 'line_id', length: 50, nullable: true})
  @Expose({
    groups: [SERIALIZE_GROUP.GROUP_EVENT],
  })
  line_id: string;

}