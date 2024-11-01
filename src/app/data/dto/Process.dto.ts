import { EntityDto } from 'o2c_core';
import { ProcedureDto } from './Procedure.dto';
import { StaffDto } from './Staff.dto';
import { ClientDto } from './Client.dto';
import { ProjectQuoteDto } from './ProjectQuote.dto';

export interface ProcessDto extends EntityDto {
  description: string;
  config: {
    order_phases: Array<any>;
    phases_process: Array<any>;
  };
  phases: any;
  roles: any;
  pivot?: {
    project_id: number;
    process_id: number;
    id: number;
    status: number;
  };
}
