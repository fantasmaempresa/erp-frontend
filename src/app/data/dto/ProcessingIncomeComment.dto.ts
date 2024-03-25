import { EntityDto } from 'o2c_core';
import { UserDto } from "./User.dto";

export interface ProcessingIncomeCommentDto extends EntityDto {
  comment: string;
  processing_income_id: number;
  user_id: number;
  user: UserDto;
}
