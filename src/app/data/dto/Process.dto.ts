import { EntityDto } from 'o2c_core';

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
