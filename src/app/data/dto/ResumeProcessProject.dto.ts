import { EntityDto } from 'o2c_core';
import { ProcessDto } from './Process.dto';
import { DetailProjectsDto } from './DetailProjects.dto';

export interface ResumeProcessProjectDto extends EntityDto {
  id: number;
  detail_project_id: number;
  process_project_id: number;
  process_project: ProcessDto;
  detail_project: DetailProjectsDto;
}
