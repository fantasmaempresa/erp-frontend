import { UserDto } from './User.dto';
import { EntityDto } from '../../core/interfaces';

export interface StaffDto extends EntityDto {
  email: string;
  phone: string;
  nickname: string;
  extra_information: string;
  user?: UserDto;
}
