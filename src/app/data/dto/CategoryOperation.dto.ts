import { EntityDto } from 'o2c_core';

export interface CategoryOperationDto extends EntityDto {
  id: number;
  name: string;
  description: string;
  config: {
    documents_required: [{ id: number }];
  };
  form: Array<any>;
}
