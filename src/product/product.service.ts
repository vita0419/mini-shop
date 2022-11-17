import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/database/entities/category.entity';
import { ProductEntity } from 'src/database/entities/Products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
    constructor(
      @InjectRepository(ProductEntity)
      private productRepo: Repository<ProductEntity>,
      @InjectRepository(CategoryEntity)
      private categoryRepo: Repository<CategoryEntity>,
    ) {}
    
    //================ product ======================
    async getAllProduct(){
      try{
        return await this.productRepo.find();
      }catch(err){
        console.log(err);
      }
    }

    async insertProduct(dto){
      try{
        return await this.productRepo.save(dto);
      }catch(err){
        console.log(err);
      }
    }  

    async findOneByIdProduct(id){
      try{
        return await this.productRepo.findOne({
          where:{id: id},
          order:{id: 'DESC'}
        });
      }catch(err){
        console.log(err);
        
      }
    }

    async updateProduct(dto){
      try{
        return await this.productRepo.save({
          id: dto.id,
          name: dto.name,
          price: dto.price,
          description: dto.description,
          category_id: dto.category_id
        });
      }catch(err){
        console.log(err);
        
      }
    }

    async softDeleteProduct(id) {
      const now = new Date();
      const Product = await this.productRepo.findOne({
        where:{id: parseInt(id)},
        order:{id: 'DESC'}
      });
      if (!Product) throw new NotFoundException();
      Product.isDelete = true;
      Product.updatedAt = now;
      Product.deletedAt = now;
      return Product.save();
    }

    //================ category ======================
    async getAllCategory(){
      try{
        return await this.productRepo.find();
      }catch(err){
        console.log(err);
      }
    }

    async insertCategory(dto){
      try{
        return await this.categoryRepo.save(dto);
      }catch(err){
        console.log(err);
      }
    }  
    
    async findOneByIdCategory(id){
      try{
        return await this.categoryRepo.findOne({
          where:{id: id},
          order:{id: 'DESC'}
        });
      }catch(err){
        console.log(err);
      }
    }

    async updateCategory(dto){
      try{
        return await this.categoryRepo.save({
          id: dto.id,
          name: dto.name,
          description: dto.description,
        });
      }catch(err){
        console.log(err);
      }
    }

    async softDeleteCategory(id) {
      const now = new Date();
      const category = await this.categoryRepo.findOne({
        where:{id: parseInt(id)},
        order:{id: 'DESC'}
      });
      if (!category) throw new NotFoundException();
      category.isDelete = true;
      category.updatedAt = now;
      category.deletedAt = now;
      return category.save();
    }
}
