import { Injectable } from '@angular/core';
import { CrudService, Pagination } from 'o2c_core';
import { ReportConfigurationDto } from '../dto/ReportConfiguration.dto';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportConfigurationService extends CrudService<
  ReportConfigurationDto,
  Pagination<ReportConfigurationDto>
> {

  nextData: any;
  project_id: number = 0;
  process_id: number = 0;
  uri:string = '';

  constructor() {
    super('reportConfiguration');
  }
  
  fetchAll(data: any): Observable<Pagination<ReportConfigurationDto>> {
    return this._http.post<Pagination<ReportConfigurationDto>>(
      `${environment.base_url}/projects/predefined/phase/project/${this.project_id}/process/${this.process_id}/${this.uri}`,
      this.nextData
    ).pipe(tap(this.resetData));

  }


  setData(project_id: number, process_id: number, data: {nameProcess: string, namePhase: string, uri: string}) {
    this.nextData = data;
    this.project_id = project_id;
    this.process_id = process_id;
    this.uri = data.uri;
  }

  resetData() {
    this.nextData = null;
    this.project_id = 0;
    this.process_id = 0;
    this.uri = '';
  }

}
