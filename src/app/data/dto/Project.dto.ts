import { ClientDto } from './Client.dto';
import { UserDto } from './User.dto';
import { EntityDto } from '../../core/interfaces';

export interface ProjectDto extends EntityDto {
  name: string;

  description: string;

  estimate_end_date: Date;

  quotes: string;

  folio: string;

  user: UserDto;

  client?: ClientDto;
}
