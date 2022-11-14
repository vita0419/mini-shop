import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/database/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BotService {
  protected readonly userRepo: Repository<UserEntity>;


  findAll() {
    return `This action returns all bot`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bot`;
  }


  remove(id: number) {
    return `This action removes a #${id} bot`;
  }
}
