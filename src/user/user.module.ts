import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LineUserEntity } from 'src/database/entities/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([LineUserEntity]),
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
