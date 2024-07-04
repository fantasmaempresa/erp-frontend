import { EntityDto } from 'o2c_core';
import { StaffDto } from './Staff.dto';
import { ArticleDto } from './Article.dto';

export interface OfficeSecurityMeasuresDto extends EntityDto {
  staff_id?: StaffDto;

  article_id?: ArticleDto;

  adquisition_date: Date;

  return_date: Date;

  adquisition_comments: string;

  return_comments: string;
}
