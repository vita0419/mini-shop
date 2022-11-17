import { Controller, Get, Post, Body, Req} from '@nestjs/common';
import { BotService } from './bot.service';
import { lineDto } from './dto/line.dto';
import {  ApiTags } from '@nestjs/swagger';
import { userDto } from './dto/user.dto';
import { UserService } from 'src/user/user.service';

@ApiTags('bot')
@Controller('bot')
export class BotController {
  constructor(
    private readonly botService: BotService,
    private readonly userService: UserService  
  ) {}

  @Post('main-point')
  async mainPoint(@Body() dto: lineDto){
    const events = dto.events;
    const lineUserService = this.userService;
    await events.map(item => handleEvent(item));
    async function handleEvent(event): Promise<any> {
      
      if(event.type == 'follow' || event.type == 'join'){
        const now = new Date();
        const newUser = new userDto();
        console.dir(event);
        if(event.source.groupId != null){
          newUser.line_id = event.source.groupId;
        }else{
          newUser.line_id = event.source.userId;
        }
        newUser.line_user_type = event.source.type;
        newUser.last_active = now;
        return await lineUserService.userInsert(newUser);
      }else if(event.type == 'unfollow' || event.type == 'leave'){
        if(event.source.groupId != null){
          const group_id = event.source.groupId;
          return await lineUserService.softDeleteLine(group_id);
        }else{
          const user_id = event.source.userId;
          return await lineUserService.softDeleteLine(user_id);
        }
      }

      var text_from_line = event.message.text;
      var line_id = event.message.userId;
      console.dir(event);
      const request = require('request');

      await request.post({
        headers: {'content-type' : 'application/json'},
        url:     'http://localhost:3000/api/v1/auth/login/basic/default',
        body:  JSON.stringify({
          email: "vita.ynwa.0419@gmail.com",
          password: "Vt@14906623"
        })
      }, function(error, response, body){
        console.log(body);
        const data = JSON.parse(body);
        const token = data.payload.jwt;

        request.post({
          headers: {
              'content-type' : 'application/json',
              'Authorization': `Bearer ${token}`
          },
          url: `http://localhost:3000/api/v1/bots/mini-shop/converse/${line_id}/secured?include=nlu,state,suggestions,decision`,
          body:  JSON.stringify({
              type: "text",
              text: text_from_line,
              includedContexts: ["global"], // optional, for NLU context
              metadata: {} // optional, useful to send additional data for custom hooks
          })
        }, async function(error, response, body){
            //console.dir(flex01);
            const dotenv = require('dotenv');
            const env = dotenv.config().parsed; 
            const line = require('@line/bot-sdk');
            const lineConfig = {
              channelAccessToken: env.ACCESS_TOKEN,
              channelSecret: env.SECRET_TOKEN
            }
        
            const client = new line.Client(lineConfig);
            //console.log('\n' + body);
            const data = await JSON.parse(body);
            console.log("\n respones : ");
            if(data.responses != null){
              console.dir(await data.responses[0].text);
              return await client.replyMessage(event.replyToken,,ea);
            }else{
              console.dir(await data);
            }
            
            //const token = data.payload.jwt;
            //console.log("\njwt => " + data.payload.jwt);
        });
    });


    
    }
  }

  @Post('test-point')
  async testPoint(@Req() request:Request){
   console.dir(request.body)
  }

  async eventStorage(){

  }
}
