import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { urlApi } from '../environments/urlApi';

export interface UserProfile {
  authenticated: boolean;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly profileSubject = new BehaviorSubject<UserProfile | null>(null);
  constructor(private readonly http: HttpClient) {}

  getProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${urlApi.BASEURL}/auth/me`, {
      withCredentials: true
    });
  }
}
