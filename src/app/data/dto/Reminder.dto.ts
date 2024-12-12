import { UserDto } from './User.dto';
import { EntityDto } from 'o2c_core';

export interface ReminderDto extends EntityDto {
  name: string;
  message: string;
  config: { processing_income_id: number, user_id: number } | { procedure_id: number, user_id: number };
  status: number;
  type: number;
  expiration_date: Date;
  user_id: UserDto;
}
