import { ProjectDto } from './Project.dto';
import { ProcessDto } from './Process.dto';

export interface MyProjectDto extends ProjectDto {
  id: number;
  process: ProcessDto[];
}
