import { EntityDto } from '../../core/interfaces/Entity.dto';

export interface RoleDto extends EntityDto {
  description: string;

  config: object;
}
