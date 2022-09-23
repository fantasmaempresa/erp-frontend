import { EntityDto } from '../../core/interfaces';

export interface RoleDto extends EntityDto {
  description: string;

  config: object;
}
