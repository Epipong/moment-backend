import { ApiProperty } from '@nestjs/swagger';

export class AccessTokenEntity {
  @ApiProperty({
    type: String,
  })
  access_token: string;
}
