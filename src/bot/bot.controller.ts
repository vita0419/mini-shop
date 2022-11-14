import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res } from '@nestjs/common';
import { BotService } from './bot.service';
import { lineDto } from './dto/line.dto';
import { request } from 'express';

@Controller('bot')
export class BotController {
  constructor(private readonly botService: BotService) {}

  @Post('main-point')
  async mainPoint(@Body() dto: lineDto){
    const events = dto.events;
    await events.map(item => handleEvent(item));

    async function handleEvent(event): Promise<any> {
      var text_from_line = event.message.text;
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
          url: 'http://localhost:3000/api/v1/bots/mini-shop/converse/mt1234/secured?include=nlu,state,suggestions,decision',
          body:  JSON.stringify({
              type: "text",
              text: text_from_line,
              includedContexts: ["global"], // optional, for NLU context
              metadata: {} // optional, useful to send additional data for custom hooks
          })
        }, async function(error, response, body){
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
            console.dir(data.responses[0]);
            return client.replyMessage(event.replyToken,{type:'text', text:`${data.responses[0].text}`});
            //const token = data.payload.jwt;
            //console.log("\njwt => " + data.payload.jwt);
        });
    });


    
  }
}
  //======================================================

  @Get()
  findAll() {
    return this.botService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.botService.findOne(+id);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.botService.remove(+id);
  }
}
