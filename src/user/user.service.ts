import { Injectable, NotFoundException, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LineUserEntity } from 'src/database/entities/users.entity';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(LineUserEntity)
        private lineUserRepo: Repository<LineUserEntity>,
    ) {}

    async userInsert(lineUser){
        try{
            return await this.lineUserRepo.save(lineUser);
        }catch(err){
            console.log(err);
        }
    }

    async findOneByIdUser(id){
        try{
          return await this.lineUserRepo.findOne({
            where:{id: id},
            order:{id: 'DESC'}
          });
        }catch(err){
          console.log(err);
          
        }
    }

    async softDeleteLine(id) {
        const now = new Date();
        const line_user = await this.lineUserRepo.findOne({
          where:{line_id: id},
          order:{id: 'DESC'}
        });
        if (!line_user){
            console.log('not found that id');
            return 'not found that id';
        }
        line_user.isDelete = true;
        line_user.updatedAt = now;
        line_user.deletedAt = now;
        line_user.last_active = now;
        return line_user.save();
    }


}
