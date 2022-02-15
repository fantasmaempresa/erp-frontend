import { Injectable } from '@angular/core';
import { CrudService } from '../../core/classes/Crud/CrudService';
import { TemplateQuotes } from '../models/TemplateQuotes.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TemplateQuotesService extends CrudService<TemplateQuotes> {
  constructor(private http: HttpClient) {
    super('templateQuotes', http);
  }
}
