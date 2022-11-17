import { Body, Controller, Get, Param, ParseIntPipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { categoryDto } from 'src/product/dto/category.dto';
import { idDto } from 'src/bot/dto/id.dto';
import { productDto } from 'src/product/dto/product.dto';
import { UpdateCategoryDto } from 'src/product/dto/update.category.dto';
import { UpdateProductDto } from 'src/product/dto/update.product.dto';
import { ProductEntity } from 'src/database/entities/Products.entity';
import { fileHelper } from 'src/helper/file_helper';
import { Connection } from 'typeorm';
import { ProductService } from './product.service';


@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly connection: Connection  
  ) {}

  @Get('get-all-product')
async getAllProducts(){
  return await this.productService.getAllProduct();
}

@Post('insert-product')
async insertProduct(@Body() dto: productDto){
  return await this.productService.insertProduct(dto);
}

@Post('update-product')
async updateProduct(@Body() dto: UpdateProductDto){
  return await this.productService.updateProduct(dto);
}

@Post('findOneById-Product')
async findOneByIdProduct(@Body() dto: idDto){
  return await this.productService.findOneByIdProduct(dto.id);
}

@Post('softdelete-product')
async softDeleteProduct(@Body() dto: idDto){
  return await this.productService.softDeleteProduct(dto.id);
}

@Get('get-all-category')
async getAllCategory(){
  return await this.productService.getAllCategory();
}

@Post('insert-category')
async insertCategory(@Body() dto: categoryDto){
  return await this.productService.insertCategory(dto);
}

@Post('update-category')
async updateCategory(@Body() dto: UpdateCategoryDto){
  return await this.productService.updateCategory(dto);
}

@Post('findOneById-Category')
async findOneByIdCategory(@Body() dto: idDto){
  return await this.productService.findOneByIdCategory(dto.id);
}

@Post('softdelete-category')
async softDeleteCategory(@Body() dto: idDto){
  return await this.productService.softDeleteCategory(dto.id);
}

@Post('upload-image/:id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        comment: { type: 'string' },
        outletId: { type: 'integer' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor(
    'file', {
      storage: diskStorage({
        destination: fileHelper.destinationPath,
        filename: fileHelper.customFileName,
      }),
    }))
  async uploadSingle(@Param('id', ParseIntPipe) id: number, @UploadedFile() file: Express.Multer.File) {
    const productEnt = new ProductEntity;
    const _filename = file.filename;
    const _path = file.destination;//.slice(1);
    const full_path = _path + _filename;
    const product = await this.productService.findOneByIdProduct(id);

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    if(product != null){
      productEnt.id = id;
      productEnt.img_path = full_path;
      try{
        await queryRunner.manager.save(productEnt);
        await queryRunner.commitTransaction();
      }catch (err){
        console.log(err);
        await queryRunner.rollbackTransaction();
        await queryRunner.release();
      }
      return productEnt;
    }else{
      return "====================== Invalid Insert ==========================";
    }
  }
}
