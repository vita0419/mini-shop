import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/database/entities/category.entity';
import { ProductEntity } from 'src/database/entities/Products.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, CategoryEntity]),
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
