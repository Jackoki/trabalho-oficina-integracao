import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
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
  schoolId: number;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
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

  private readonly API_BASE_URL = 'http://localhost:8080/auth';

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  // MOCK: Change this value to 'ADMINISTRADOR', 'PROFESSOR', 'TUTOR', or 'ALUNO' for testing
  // The user will be logged in with this role upon calling login() or me()
  private mockUserType: string = 'ADMINISTRADOR'; 

  constructor(private http: HttpClient) {
    // MOCK: Attempt to log in a mock user on service initialization for easier testing
    // In a real app, this would be a call to 'me()' or checking local storage
    this.mockLoginForTesting(this.mockUserType);
  }

  private mockLoginForTesting(role: string): void {
    const mockUser: User = {
      id: 1,
      name: `Mock User (${role})`,
      code: '1234567',
      userType: {
        id: 1,
        name: role,
      },
    };
    this.currentUserSubject.next(mockUser);
  }

  // --- MOCKED API METHODS ---

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
      map(() => this.currentUserSubject.next(null)),
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

  getCurrentUserRole(): string | null {
    const user = this.getCurrentUser();
    return user?.userType?.name || null;
  }

  hasRole(role: string): boolean {
    const currentRole = this.getCurrentUserRole();
    return currentRole === role;
  }

  isAdministrator(): boolean {
    return this.hasRole('ADMINISTRADOR');
  }

  isProfessor(): boolean {
    return this.hasRole('PROFESSOR');
  }

  isTutor(): boolean {
    return this.hasRole('TUTOR');
  }

  isAluno(): boolean {
    return this.hasRole('ALUNO');
  }

  // --- PERMISSION METHODS FOR WORKSHOP ACTIONS ---

  // Define permissions based on the user's requirements and common sense for an educational platform
  // Buttons/Actions: Gerenciar Usuários, Fazer Chamada, Finalizar, Ver Certificado, Editar Oficina, Excluir Oficina

  canCreateWorkshop(): boolean {
    // Only ADMINISTRADOR and PROFESSOR can create new workshops
    return this.isAdministrator() || this.isProfessor();
  }

  canEditWorkshop(): boolean {
    // Only ADMINISTRADOR can edit any workshop. PROFESSOR can edit their own (logic for "own" is not implemented here, so we'll stick to ADMINISTRADOR for now for simplicity, or allow PROFESSOR to edit all for mock)
    // Let's allow ADMINISTRADOR and PROFESSOR to edit for now.
    return this.isAdministrator() || this.isProfessor();
  }

  canDeleteWorkshop(): boolean {
    // Only ADMINISTRADOR can delete a workshop
    return this.isAdministrator();
  }

  canManageUsers(): boolean {
    // ADMINISTRADOR and PROFESSOR can manage users (e.g., enroll students)
    return this.isAdministrator() || this.isProfessor();
  }

  canTakeAttendance(): boolean {
    // ADMINISTRADOR, PROFESSOR, and TUTOR can take attendance
    return this.isAdministrator() || this.isProfessor() || this.isTutor();
  }

  canFinalizeWorkshop(): boolean {
    // ADMINISTRADOR and PROFESSOR can finalize a workshop
    return this.isAdministrator() || this.isProfessor();
  }

  canViewCertificate(): boolean {
    // Only ALUNO can view their certificate
    return this.isAluno();
  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }
}
