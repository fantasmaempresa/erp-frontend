import { Injectable } from '@angular/core';
import { CrudService } from '../../core/classes/Crud/CrudService';
import { FormStructure } from '../models/FormStructure.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FormStructureService extends CrudService<FormStructure> {
  constructor(private http: HttpClient) {
    super('formStructure', http);
  }
}
