import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
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
  name: string;
  code: string;
  userType: {
    id: number;
    name: string;
  };
  school?: {
    id: number;
    name: string;
  };
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

  register(record: RegisterRequest): Observable<AuthResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<AuthResponse>(
      `${this.API_BASE_URL}/register`,
      record,
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
    );
  }

  clearCurrentUser(): void {
    this.currentUserSubject.next(null);
  }

  me(): Observable<User | null> {
    return this.http.get<User>(
      `${this.API_BASE_URL}/me`,
      { withCredentials: true }
    ).pipe(
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

  getCurrentUserRole(): string | null {
    return this.getCurrentUser()?.userType?.name || null;
  }

  hasRole(role: string): boolean {
    return this.getCurrentUserRole() === role;
  }

  isAdministrator(): boolean {
    return this.hasRole('Admin');
  }

  isProfessor(): boolean {
    return this.hasRole('Professor');
  }

  isTutor(): boolean {
    return this.hasRole('Tutor');
  }

  isAluno(): boolean {
    return this.hasRole('Aluno');
  }

  isAnyone(): boolean {
    return this.isAdministrator() || this.isProfessor() || this.isTutor() || this.isAluno();
  }
  
  isAdminOrProfessorOrTutor(): boolean {
    return this.isAdministrator() || this.isProfessor() || this.isTutor();
  }

  isAdminOrProfessor(): boolean {
    return this.isAdministrator() || this.isProfessor();
  }

  isAdmin(): boolean {
    return this.isAdministrator();
  }

}
