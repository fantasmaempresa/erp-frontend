import { EntityDto } from 'o2c_core';
import { ProcessPhaseDto } from './ProcessPhase.dto';

export interface DetailProjectsDto extends EntityDto {
  comments: string;
  form_data: string;
  finished: number;
  phases_process_id: number;
  phase?: ProcessPhaseDto;
}
