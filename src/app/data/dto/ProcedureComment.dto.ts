import { EntityDto } from 'o2c_core';
import { UserDto } from "./User.dto";

export interface ProcedureCommentDto extends EntityDto {
  comment: string;

  procedure_id: number;

  user_id: number;

  user: UserDto;
}
