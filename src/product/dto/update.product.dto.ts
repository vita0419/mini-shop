import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto  {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    category_id: number;

    @ApiProperty()
    price: number;
}