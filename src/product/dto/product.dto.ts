import { ApiProperty } from '@nestjs/swagger';

export class productDto  {
    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    category_id: number;

    @ApiProperty()
    price: number;
}