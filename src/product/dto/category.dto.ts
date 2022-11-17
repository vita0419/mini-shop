import { ApiProperty } from '@nestjs/swagger';

export class categoryDto  {
    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;
}