import { ApiProperty } from '@nestjs/swagger';

export class imageDto{
    @ApiProperty()
    name: string;

    @ApiProperty({ type: 'string', format: 'binary', required: true })
    file: Express.Multer.File;
}
