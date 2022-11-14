import { DB_TABLE_NAME } from '../enum/database.enum';
import { ExtendedEntity } from './extended_entity'; 
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SERIALIZE_GROUP } from '../enum/serialization-group.enum';
import { ClassTransformOptions, Expose } from 'class-transformer';

@Entity(DB_TABLE_NAME.PRODUCT)
export class ProductEntity extends ExtendedEntity {
  @Column({ name: 'is_active', default: true })
  @Expose({
    groups: [SERIALIZE_GROUP.GROUP_PRODUCT],
  })
  isActive: boolean;

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

  @Column({ name: 'price' ,nullable: true})
  @Expose({
    groups: [SERIALIZE_GROUP.GROUP_PRODUCT],
  })
  price: number;

  @Column({ length: 50, nullable: true })
  @Expose({
    groups: [SERIALIZE_GROUP.GROUP_PRODUCT],
  })
  category: string;

}