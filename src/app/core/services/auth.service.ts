import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, tap } from 'rxjs';
import { AuthResponse } from '../../data/models/AuthResponse.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly ACCESS_TOKEN = 'ACCESS_TOKEN';

  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<AuthResponse> {
    const body = {
      grant_type: environment.grant_type,
      client_id: environment.client_id,
      client_secret: environment.client_secret,
      username,
      password,
    };
    return this.http.post<AuthResponse>(`${environment.base_url}/oauth/token`, body);
  }

  refreshToken() {
    let body = {
      grant_type: 'refresh_token',
      client_id: environment.client_id,
      client_secret: environment.client_secret,
      refresh_token: this.getRefreshToken(),
    };
    return this.http
      .post<any>(`${environment.base_url}/oauth/token`, body)
      .pipe(tap((tokens: any) => this.storeTokens(tokens)));
  }

  logout() {
    this.removeTokens();
  }

  storeTokens(tokens: AuthResponse) {
    localStorage.setItem(this.ACCESS_TOKEN, tokens.access_token);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refresh_token);
  }

  removeTokens() {
    localStorage.removeItem(this.ACCESS_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }

  getAuthorizationToken() {
    const token = localStorage.getItem(this.ACCESS_TOKEN);
    return token ? token : null;
  }

  getRefreshToken() {
    const token = localStorage.getItem(this.REFRESH_TOKEN);
    return token ? token : null;
  }
}
