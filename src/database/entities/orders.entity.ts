import { DB_TABLE_NAME } from '../enum/database.enum';
import { ExtendedEntity } from './extended_entity'; 
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { SERIALIZE_GROUP } from '../enum/serialization-group.enum';
import { ClassTransformOptions, Expose } from 'class-transformer';
import { UserEntity } from './users.entity';
import { ProductEntity } from './Products.entity';

@Entity(DB_TABLE_NAME.ORDER)
export class OrderEntity extends ExtendedEntity {
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

  @Column({ name: 'line_id', length: 255, nullable: true})
  @Expose({
    groups: [SERIALIZE_GROUP.GROUP_USER],
  })
  line_id: string;

  @Column({name: 'product_id', nullable: true})
  product_id: number;
  @ManyToOne(() => UserEntity, { nullable: true })
  @Expose({
      groups: [SERIALIZE_GROUP.GROUP_PRODUCT],
  })
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;


  @Column({ length: 100, nullable: true })
  @Expose({
    groups: [SERIALIZE_GROUP.GROUP_ORDER],
  })
  status: string;
}