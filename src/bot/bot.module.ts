import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotController } from './bot.controller';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LineUserEntity } from 'src/database/entities/users.entity';
import { EventEntity } from 'src/database/entities/events.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([LineUserEntity, EventEntity]),
  ],
  controllers: [BotController],
  providers: [BotService, UserService]
})
export class BotModule {}
