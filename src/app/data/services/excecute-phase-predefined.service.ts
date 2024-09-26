import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExcecutePhasePredefinedService {
  constructor(protected _http: HttpClient) { }

  executePhase(project_id: number, process_id: number, data: { nameProcess: string; namePhase: string; data: any }) {
    return this._http.post(`${environment.base_url}/projects/predefined/phase/execute/project/${project_id}/process/${process_id}`, data);
  }

  getStructureFormat(project_id: number, process_id: number, data: { nameProcess: string; namePhase: string; data: any }) {
    return this._http.post(`${environment.base_url}/projects/predefined/phase/getStructureFormat/project/${project_id}/process/${process_id}`, data);
  }
}
