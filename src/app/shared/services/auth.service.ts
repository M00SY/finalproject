import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { login, Register } from '../interfaces/register';
import { Environment } from '../../Base/Environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { TranslationService } from './myTranslate/my-translate.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: BehaviorSubject<any> = new BehaviorSubject(null);

  // Refresh
  constructor(
    private _TranslationService: TranslationService,
    private _HttpClient: HttpClient,
    private _Router: Router
  ) {
    if (typeof localStorage !== 'undefined') {
      const userToken = localStorage.getItem('userToken');
      const currentPage = localStorage.getItem('currentPage');

      if (userToken != null) {
        this.userInform();

        // Ensure currentPage is valid before navigation
        if (currentPage != null && currentPage !== '') {
          this._Router.navigate([currentPage]);
        } else {
          // Navigate to a default page if currentPage is invalid
          this._Router.navigate(['/defaultPage']);
        }
      }
    }
  }

  sendRegister(data: Register): Observable<any> {
    return this._HttpClient.post(
      `${Environment.baseURL}/api/v1/auth/signup`,
      data
    );
  }

  sendLogin(data: login): Observable<any> {
    return this._HttpClient.post(
      `${Environment.baseURL}/api/v1/auth/signin`,
      data
    );
  }

  userInform() {
    const token = localStorage.getItem('userToken');
    if (token) {
      this.userData.next(jwtDecode(token));
    }
  }

  // ================= forget =======================
  sendVerifyAPI(data: any): Observable<any> {
    return this._HttpClient.post(
      `${Environment.baseURL}/api/v1/auth/forgotPasswords`,
      data
    );
  }

  sendCodeAPI(data: any): Observable<any> {
    return this._HttpClient.post(
      `${Environment.baseURL}/api/v1/auth/verifyResetCode`,
      data
    );
  }

  sendNewPasswordAPI(data: any): Observable<any> {
    return this._HttpClient.put(
      `${Environment.baseURL}/api/v1/auth/resetPassword`,
      data
    );
  }
}
