import { HttpClient, HttpParams } from '@angular/common/http';
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
  generateFormat(data: {nameProcess: string, namePhase: string, data: any}) {

    return this._http.post(`${environment.base_url}/projects/predefined/phase/getFormat`, data, {
      responseType: 'blob',
      observe: 'response',
    });
  }

  getInfoProject(project_id: number, process_id: number, data: { nameProcess: string; namePhase: string; data?: any }){
    let params = new HttpParams();
    params = params.append('data', `${data.data}`);
    params = params.append('nameProcess', `${data.nameProcess}`);
    params = params.append('namePhase', `${data.namePhase}`);
    return this._http.get(`${environment.base_url}/projects/predefined/phase/getInfo/project/${project_id}/process/${process_id}`, 
      {params});
  } 

  saveFormat(project_id: number, process_id: number, data: { nameProcess: string; namePhase: string; data?: any }){
    return this._http.post(`${environment.base_url}/projects/predefined/phase/project/${project_id}/process/${process_id}/format`, data);
  }

  issueEvent(
    project_id: number, 
    process_id: number, 
    data: { 
      nameProcess: string; 
      namePhase: string; 
      data?: {
        message: string;
      } 
    }){
      return this._http.post(`${environment.base_url}/projects/predefined/phase/project/${project_id}/process/${process_id}/issueEventToPhase`, data);
  }
} 
