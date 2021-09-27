import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';

export interface CurrentUserInterface {
  fullName: string;
  firstName: string;
  username: string;
  access_token: string;
  session_id: string;
}

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  private baseUrl = 'http://localhost:55540/api';
  constructor(private httpClient: HttpClient) {}

  loginUser(username: string, password: string) {
    const headers = {
      Authorization:
        'Basic ' +
        btoa(
          'devglan-client:$2a$04$e/c1/RfsWuThaWFCrcCuJeoyvwCV0URN/6Pn9ZFlrtIWaU/vj/BfG'
        ),
      'Content-type': 'application/x-www-form-urlencoded',
    };

    const body = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('grant_type', 'password');

    return this.httpClient
      .post<CurrentUserInterface>(`${this.baseUrl}/token`, body, {
        //TODO: set base url
        headers,
      })
      .pipe(shareReplay());
  }

  getLoginInfo() {
    return this.httpClient.get(
      this.baseUrl + '/environmentInfo/loginInfo?convertToHtml=false',
      { responseType: 'text' }
    );
  }
}
