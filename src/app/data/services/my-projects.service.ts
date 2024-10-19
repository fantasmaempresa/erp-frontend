import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Pagination } from '../../core/interfaces';
import { MyProjectDto } from '../dto';
import { Observable } from 'rxjs';
import { ResumeProcessProjectDto } from '../dto/ResumeProcessProject.dto';

@Injectable({
  providedIn: 'root',
})
export class MyProjectsService {
  private _base = `${environment.base_url}/projects`;

  constructor(private http: HttpClient) {}

  getMyProjects(): Observable<Pagination<MyProjectDto>> {
    return this.http.get<Pagination<MyProjectDto>>(
      `${this._base}/filter/myProjects`,
    );
  }

  getCurrentForm(projectId: number, processId: number) {
    return this.http.get(
      `${this._base}/filter/currentForm/project/${projectId}/process/${processId}`,
    );
  }

  startProcess({
    projectId,
    processId,
    comment,
  }: {
    projectId: number;
    processId: number;
    comment: string;
  }) {
    return this.http.post(
      `${this._base}/action/start/project/${projectId}/process/${processId}`,
      {
        comment,
      },
    );
  }

  changeProcess({
    projectId,
    processId,
    comment,
    prev,
  }: {
    projectId: number;
    processId: number;
    comment: string;
    prev: boolean;
  }) {
    return this.http.post(
      `${this._base}/action/next/project/${projectId}/process/${processId}`,
      {
        comment,
        prev,
      },
    );
  }

  nextPhase({
    projectId,
    processId,
    comment,
  }: {
    projectId: number;
    processId: number;
    comment: string;
  }) {
    return this.changeProcess({ projectId, processId, comment, prev: false });
  }

  prevPhase({
    projectId,
    processId,
    comment,
  }: {
    projectId: number;
    processId: number;
    comment: string;
  }) {
    return this.changeProcess({ projectId, processId, comment, prev: true });
  }

  supervisionProject({
    projectId,
    processId,
    comment,
  }: {
    projectId: number;
    processId: number;
    comment: string;
  }) {
    return this.http.post(
      `${this._base}/action/supervision/project/${projectId}/process/${processId}`,
      { comment },
    );
  }

  completeProcessProject({
    projectId,
    processId,
  }: {
    projectId: number;
    processId: number;
  }) {
    return this.http.get(
      `${this._base}/action/complete/project/${projectId}/process/${processId}`,
    );
  }

  saveForm({
    projectId,
    processId,
    form,
  }: {
    projectId: number;
    processId: number;
    form: any;
  }) {
    return this.http.post(
      `${this._base}/action/saveForm/project/${projectId}/process/${processId}`,
       form ,
    );
  }

  getResumeProcess(project_id: number, process_id: number) {
    return this.http.get<ResumeProcessProjectDto[]>(
      `${this._base}/filter/resumeProcess/project/${project_id}/process/${process_id}`,
    );
  }

  finishProject(projectId: number) {
    return this.http.get(`${this._base}/action/finish/project/${projectId}`);
  }
}
