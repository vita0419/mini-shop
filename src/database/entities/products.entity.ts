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
import { CategoryEntity } from './category.entity';

@Entity(DB_TABLE_NAME.PRODUCT)
export class ProductEntity extends ExtendedEntity {
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

  @Column({ name: 'img_path', length: 255, nullable: true})
  @Expose({
    groups: [SERIALIZE_GROUP.GROUP_PRODUCT],
  })
  img_path: string;

  @Column({ name: 'price' ,nullable: true})
  @Expose({
    groups: [SERIALIZE_GROUP.GROUP_PRODUCT],
  })
  price: number;

  @Column({name: 'category_id', nullable: true})
  category_id: number;
  @ManyToOne(() => CategoryEntity, { nullable: true })
  @Expose({
      groups: [SERIALIZE_GROUP.GROUP_PRODUCT],
  })
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

}