import { EntityDto } from 'o2c_core';
import { CategoryOperationDto } from './CategoryOperation.dto';

export interface OperationsDto extends EntityDto {
  name: string;
  description: string;
  config: {
    documents_required: [{ id: number }];
  };
  category_operation_id: number;
  categoryOperation: CategoryOperationDto;
}
