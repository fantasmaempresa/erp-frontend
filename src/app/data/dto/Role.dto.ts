import { EntityDto } from 'o2c_core';

export interface RoleDto extends EntityDto {
  description: string;

  config: object;
}
