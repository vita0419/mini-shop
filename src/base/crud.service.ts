import { ExtendedEntity } from 'src/database/entities/extended_entity'; 
import { NotFoundException } from '@nestjs/common';
import {
  BaseEntity,
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

export class CrudService<T extends ExtendedEntity> {
  protected repository: Repository<T>;

  constructor(repository?: Repository<T>) {
    if (repository) {
      this.repository = repository;
    }
  }

  //####################################### BEGIN FUNCTION ############################################
  public async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    const entities = await this.repository.find(options);
    return entities;
  }
  //####################################### END FUNCTION ############################################

  //####################################### BEGIN FUNCTION ############################################
  async findAndCount(options: FindManyOptions<T>): Promise<[T[], number]> {
    const [entities, count] = await this.repository.findAndCount(options);
    return [entities, count];
  }
  //####################################### END FUNCTION ############################################

  //####################################### BEGIN FUNCTION ############################################
  public async find(option: FindManyOptions<T>): Promise<T[]> {
    const entities = await this.repository.find(option);
    return entities;
  }
  //####################################### END FUNCTION ############################################

  //####################################### BEGIN FUNCTION ############################################
  public async simplefind(){
    return await this.repository.find();
  }
  //####################################### END FUNCTION ############################################

  //####################################### BEGIN FUNCTION ############################################
  public async findBy(option: FindOptionsWhere<T>): Promise<T[]> {
    const entities = await this.repository.findBy(option);
    return entities;
  }
  //####################################### END FUNCTION ############################################

  //####################################### BEGIN FUNCTION ############################################
  public async findAndCountBy(option: FindOptionsWhere<T>): Promise<[T[], number]> {
    const [entities, count] = await this.repository.findAndCountBy(option);
    return [entities, count];
  }
  //####################################### END FUNCTION ############################################

  //####################################### BEGIN FUNCTION ############################################
  public async findOneById(id: any): Promise<T> {
    const entity = await this.repository.findOne({ where: { id: id } });
    return entity;
  }
  //####################################### END FUNCTION ############################################

  //####################################### BEGIN FUNCTION ############################################
  public async findOne(options?: FindOneOptions<T>): Promise<T> {
    const entity = await this.repository.findOne(options);
    return entity;
  }
  //####################################### END FUNCTION ############################################

  //####################################### BEGIN FUNCTION ############################################
  public async create(data: DeepPartial<T>): Promise<T> {
    const entity: T = this.repository.create(data);
    return entity.save();
  }
  //####################################### END FUNCTION ############################################

  //####################################### BEGIN FUNCTION ############################################
  public async saveAll(data: DeepPartial<T>[]): Promise<T[]> {
    return this.repository.save(data);
  }
  //####################################### END FUNCTION ############################################

  //####################################### BEGIN FUNCTION ############################################
  public async update(data: DeepPartial<T> | T): Promise<T> {
    const id = Number(data.id);
    return this.patch(id, data);
  }
  //####################################### END FUNCTION ############################################

  //####################################### BEGIN FUNCTION ############################################
  public async patch(id: number, data: DeepPartial<T> | T): Promise<T> {
    let entity: T = null;
    const now = new Date();
    if (data instanceof BaseEntity) {
      entity = data;
    } else {
      entity = await this.findOneById(id);
      if (!entity) throw new NotFoundException();
      if (data.id) {
        delete data.id;
      }
      this.repository.merge(entity, data);
    }
    let createdAt = entity.createdAt;
    if (!createdAt) {
      createdAt = now;
    }
    entity.createdAt = createdAt;
    entity.updatedAt = now;
    return entity.save();
  }
  //####################################### END FUNCTION ############################################

  //####################################### BEGIN FUNCTION ############################################
  public async delete(id: number): Promise<T> {
    const entity: T = await this.findOneById(id);
    if (!entity) throw new NotFoundException();
    await this.repository.delete(id);
    return entity;
  }
  //####################################### END FUNCTION ############################################

  //####################################### BEGIN FUNCTION ############################################
  public async softDelete({ id }: DeepPartial<T>): Promise<T> {
    const now = new Date();
    const entity = await this.findOneById(id);
    if (!entity) throw new NotFoundException();
    entity.isDelete = true;
    entity.updatedAt = now;
    entity.deletedAt = now;
    return entity.save();
  }
  //####################################### END FUNCTION ############################################

  //####################################### BEGIN FUNCTION ############################################
  public async checkDuplicateName(
    options?: FindOneOptions<T>,
  ): Promise<boolean> {
    const entity: T = await this.findOne(options);
    if (entity) {
      return true;
    }
    return false;
  }
  //####################################### END FUNCTION ############################################

  //####################################### BEGIN FUNCTION ############################################
  public merge(entity: T, data: DeepPartial<T>): T {
    return this.repository.merge(entity, data);
  }
  //####################################### END FUNCTION ############################################

  //####################################### BEGIN FUNCTION ############################################
  public async uploadFile(file: File){
    return file;
  }
  //####################################### END FUNCTION ############################################
  
 
}
