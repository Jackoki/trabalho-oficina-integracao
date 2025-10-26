import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface LoginRequest {
  accessCode: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  accessCode: string;
  password: string;
  schoolId: number;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
}

export interface User {
  id: number;
  fullName: string;
  accessCode: string;
  userType: string;
}

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private readonly API_BASE_URL = 'http://localhost:8080/auth';

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}


  login(loginData: LoginRequest): Observable<AuthResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<AuthResponse>(
      `${this.API_BASE_URL}/login`,
      loginData,
      { headers, withCredentials: true }
    ).pipe(
      map(response => {
        if (response.success && response.user) {
          this.currentUserSubject.next(response.user);
        }
        return response;
      }),
      catchError(error => {
        console.error('Erro no login:', error);
        return throwError(() => ({ success: false, message: 'Erro de conexão. Tente novamente.' }));
      })
    );
  }


  register(registerData: RegisterRequest): Observable<AuthResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<AuthResponse>(
      `${this.API_BASE_URL}/register`,
      registerData,
      { headers, withCredentials: true }
    ).pipe(
      catchError(error => {
        console.error('Erro no registro:', error);
        return throwError(() => ({ success: false, message: 'Erro de conexão. Tente novamente.' }));
      })
    );
  }


  logout(): Observable<void> {
    return this.http.post<void>(
      `${this.API_BASE_URL}/logout`,
      {},
      { withCredentials: true }
    ).pipe(
      map(() => {
        this.currentUserSubject.next(null);
      }),
      catchError(error => {
        console.error('Erro no logout:', error);
        this.currentUserSubject.next(null);
        return of();
      })
    );
  }

  me(): Observable<User | null> {
    return this.http.get<User>(`${this.API_BASE_URL}/me`, { withCredentials: true }).pipe(
      map(user => {
        this.currentUserSubject.next(user);
        return user;
      }),
      catchError(() => {
        this.currentUserSubject.next(null);
        return of(null);
      })
    );
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }
}
