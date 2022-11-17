import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto  {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;
}