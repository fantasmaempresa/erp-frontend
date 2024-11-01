import { ClientDto } from "./Client.dto";
import { UserDto } from "./User.dto";
import { EntityDto } from "o2c_core";
import { ProcessDto } from "./Process.dto";
import { RoleDto } from "./Role.dto";
import { ProcedureDto } from "./Procedure.dto";
import { StaffDto } from "./Staff.dto";
import { ProjectQuoteDto } from "./ProjectQuote.dto";

export interface ProjectDto extends EntityDto {

  description?: string;

  user: UserDto;

  client?: ClientDto;

  config?: Array<any>;

  process?: ProcessDto[];

  users?: UserDto[];

  roles?: RoleDto[];

  procedure: ProcedureDto,
  staff: StaffDto,
  project_quote: ProjectQuoteDto
}

export interface CommandProjectDto extends EntityDto {

  action: { action: string, command: string },
  project_id: number;
  process_id: number;
  data?: {
    message?: string;
    nameProcess?: string;
    namePhase?: string;
  };
}
