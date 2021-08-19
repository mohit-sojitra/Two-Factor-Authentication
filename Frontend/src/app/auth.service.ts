import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserModel } from './user.model';
import { tap, map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: IUserModel = {};
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<IUserModel> {
    return this.http
      .post<IUserModel>('http://localhost:3000/login', {
        email,
        password,
      })
      .pipe(tap((val) => (this.user = val)));
  }

  register(
    email: string,
    password: string,
    username: string
  ) {
    return this.http
      .post<IUserModel>('http://localhost:3000/register', {
        username,
        email,
        password,
      })
      .pipe(
        tap(
          (val) => (this.user = val),
          
        ),
        mergeMap((res) => this.setupCode(res._id))
      );
  }

  validateCode(token: number) {
    return this.http.post('http://localhost:3000/tfa/verify', {
      token,
      _id: this.user._id,
    });
  }

  setupCode(_id: string | undefined) {
    return this.http.post('http://localhost:3000/tfa/setup', {
      _id,
    });
  }
}
