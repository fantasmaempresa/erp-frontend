import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ProjectQuote } from '../models/ProjectQuote.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectQuoteService {
  url = `${environment.base_url}/projectQuotes`;

  constructor(private http: HttpClient) {}

  save(projectQuote: ProjectQuote) {
    return this.http.post(this.url, projectQuote);
  }
}
