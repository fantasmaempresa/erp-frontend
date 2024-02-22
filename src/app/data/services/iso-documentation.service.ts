import { Injectable } from '@angular/core';
import { CrudService, Pagination } from 'o2c_core';
import { IsoDocumentationDto } from '../dto/IsoDocumentation.dto';

@Injectable({
  providedIn: 'root'
})
export class IsoDocumentationService extends CrudService<
  IsoDocumentationDto, 
  Pagination<IsoDocumentationDto>
>{

  constructor() { }
}
