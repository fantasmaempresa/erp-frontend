import { ClientDto } from "./Client.dto";
import { UserDto } from "./User.dto";
import { EntityDto } from "o2c_core";
import { ProcessDto } from "./Process.dto";
import { RoleDto } from "./Role.dto";

export interface ProjectDto extends EntityDto {
  name: string;

  description: string;

  estimate_end_date: Date;

  quotes: string;

  folio: string;

  user: UserDto;

  client?: ClientDto;

  config?: Array<any>;

  process?: ProcessDto[];

  users?: UserDto[];

  roles?: RoleDto[];
}
