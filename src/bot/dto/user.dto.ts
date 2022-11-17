import { ApiProperty } from '@nestjs/swagger';

export class userDto  {
    @ApiProperty()
    line_id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    address: string;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    line_user_type: string;

    @ApiProperty()
    last_active: Date;
}