import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MyProjectsService {
  private _base = `${environment.base_url}/projects`;

  constructor(private http: HttpClient) {}

  getMyProjects() {
    return this.http.get(`${this._base}/filter/myProjects`);
  }

  getCurrentForm(processId: number) {
    return this.http.get(`${this._base}/filter/project/process/${processId}`);
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
    return this.http.post(`${this._base}/action/start/project/${projectId}/process/${processId}`, {
      comment,
    });
  }

  nextProcess({
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
    return this.http.post(`${this._base}/action/next/project/${projectId}/process/${processId}`, {
      comment,
      prev,
    });
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

  saveForm({ projectId, processId, form }: { projectId: number; processId: number; form: any }) {
    return this.http.post(
      `${this._base}/action/saveForm/project/${projectId}/process/${processId}`,
      { form },
    );
  }
}
