import { EntityDto } from 'o2c_core';
import { GrantorDto } from './Grantor.dto';
import { OperationsDto } from './Operations.dto';
import { ProcedureCommentDto } from './ProcedureComment.dto';
import { RegistrationProcedureDataDto } from './RegistrationProcedureData.dto';
import { ProcessingIncomeDto } from './ProcessingIncome.dto';
import { StaffDto } from './Staff.dto';
import { FolioDto } from './Folio.dto';

export interface ProcedureDto extends EntityDto {
  proceedings: string;
  value_operation: number;
  date_proceedings: string;
  date: string;
  credit: string;
  observation: string;
  appraisal: string;
  operation_id: number;
  user_id: number;
  place_id: number;
  client_id: number;
  staff_id: number;
  folio_id: number;
  status: number;
  grantors?: GrantorDto[];
  operations?: OperationsDto[];
  comments?: ProcedureCommentDto[];
  staff?: StaffDto[];
  registration_procedure_data?: RegistrationProcedureDataDto[];
  processing_income?: ProcessingIncomeDto[];
  folio?: FolioDto;
}
