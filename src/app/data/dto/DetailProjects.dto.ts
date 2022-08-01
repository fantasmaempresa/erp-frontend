import { EntityDto } from '../../core/interfaces/Entity.dto';

export interface DetailProjectsDto extends EntityDto {
  comments: string;
  form_data: string;
}
