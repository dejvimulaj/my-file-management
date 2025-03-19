// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginResponse {
  accessToken: string;
  user: { email: string; role: string; id: number };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  register(email: string, password: string, role: string = 'user'): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/register`, {
      email,
      password,
      role
    });
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, {
      email,
      password
    });
  }
}
