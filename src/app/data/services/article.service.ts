import { Injectable } from '@angular/core';
import { CrudService, Pagination } from 'o2c_core';
import { ArticleDto } from '../dto/Article.dto';

@Injectable({
  providedIn: 'root',
})
export class ArticleService extends CrudService<
  ArticleDto,
  Pagination<ArticleDto>
> {
  constructor() {
    super('article');
  }
}
