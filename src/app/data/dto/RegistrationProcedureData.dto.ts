import { EntityDto } from 'o2c_core';
import { UserDto } from './User.dto';
import { DocumentDto } from './Document.dto';
import { ProcedureCommentDto } from './ProcedureComment.dto';

export interface RegistrationProcedureDataDto extends EntityDto {
  inscription: string;
  sheets: string;
  took: string;
  date: string;
  property: string;
  url_file: string;
  description: string;
  procedure_id: number;
  document_id: number;
  user_id: number;
  user?: UserDto;
  document?: DocumentDto;
  procedure?: ProcedureCommentDto;
}
