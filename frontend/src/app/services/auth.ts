import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// Interfaces para tipagem
export interface LoginRequest {
  accessCode: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  accessCode: string;
  userType: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: number;
    fullName: string;
    accessCode: string;
    userType: string;
  };
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
  // URL base da API Spring Boot (configurar conforme necessário)
  private readonly API_BASE_URL = 'http://localhost:8080/api/auth';
  
  // Subject para gerenciar estado de autenticação
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  // Subject para gerenciar token JWT
  private tokenSubject = new BehaviorSubject<string | null>(null);
  public token$ = this.tokenSubject.asObservable();

  constructor(private http: HttpClient) {
    // Verificar se há token armazenado no localStorage ao inicializar
    this.loadStoredAuth();
  }

  /**
   * Carrega dados de autenticação armazenados localmente
   */
  private loadStoredAuth(): void {
    // Verificar se está no ambiente do navegador (não no servidor)
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('ellp_token');
      const userStr = localStorage.getItem('ellp_user');
      
      if (token && userStr) {
        try {
          const user = JSON.parse(userStr);
          this.tokenSubject.next(token);
          this.currentUserSubject.next(user);
        } catch (error) {
          // Limpar dados corrompidos
          this.clearStoredAuth();
        }
      }
    }
  }

  /**
   * Limpa dados de autenticação armazenados
   */
  private clearStoredAuth(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('ellp_token');
      localStorage.removeItem('ellp_user');
    }
    this.tokenSubject.next(null);
    this.currentUserSubject.next(null);
  }

  /**
   * Armazena dados de autenticação
   */
  private storeAuth(token: string, user: User): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('ellp_token', token);
      localStorage.setItem('ellp_user', JSON.stringify(user));
    }
    this.tokenSubject.next(token);
    this.currentUserSubject.next(user);
  }

  /**
   * Realiza login do usuário
   */
  login(loginData: LoginRequest): Observable<AuthResponse> {
    // Por enquanto, simula a chamada da API
    // Substituir por chamada real quando a API estiver disponível
    return this.simulateLogin(loginData);
    
    /* 
    // Implementação real para API Spring Boot:
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<AuthResponse>(`${this.API_BASE_URL}/login`, loginData, { headers })
      .pipe(
        map(response => {
          if (response.success && response.token && response.user) {
            this.storeAuth(response.token, response.user);
          }
          return response;
        }),
        catchError(error => {
          console.error('Erro no login:', error);
          return throwError(() => ({
            success: false,
            message: 'Erro de conexão. Tente novamente.'
          }));
        })
      );
    */
  }

  /**
   * Realiza registro de novo usuário
   */
  register(registerData: RegisterRequest): Observable<AuthResponse> {
    // Por enquanto, simula a chamada da API
    // Substituir por chamada real quando a API estiver disponível
    return this.simulateRegister(registerData);
    
    /* 
    // Implementação real para API Spring Boot:
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<AuthResponse>(`${this.API_BASE_URL}/register`, registerData, { headers })
      .pipe(
        catchError(error => {
          console.error('Erro no registro:', error);
          return throwError(() => ({
            success: false,
            message: 'Erro de conexão. Tente novamente.'
          }));
        })
      );
    */
  }

  /**
   * Realiza logout do usuário
   */
  logout(): void {
    this.clearStoredAuth();
  }

  /**
   * Verifica se o usuário está autenticado
   */
  isAuthenticated(): boolean {
    return this.tokenSubject.value !== null;
  }

  /**
   * Obtém o token atual
   */
  getToken(): string | null {
    return this.tokenSubject.value;
  }

  /**
   * Obtém o usuário atual
   */
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Simulação de login (remover quando API estiver disponível)
   */
  private simulateLogin(loginData: LoginRequest): Observable<AuthResponse> {
    return new Observable(observer => {
      setTimeout(() => {
        if (loginData.accessCode === '1234567' && loginData.password === '123456') {
          const user: User = {
            id: 1,
            fullName: 'Administrador ELLP',
            accessCode: loginData.accessCode,
            userType: 'ADMINISTRADOR'
          };
          const token = 'fake-jwt-token-' + Date.now();
          
          this.storeAuth(token, user);
          
          observer.next({
            success: true,
            message: 'Login realizado com sucesso!',
            token,
            user
          });
        } else {
          observer.next({
            success: false,
            message: 'Credenciais inválidas. Verifique seu código de acesso e senha.'
          });
        }
        observer.complete();
      }, 1500);
    });
  }

  /**
   * Simulação de registro (remover quando API estiver disponível)
   */
  private simulateRegister(registerData: RegisterRequest): Observable<AuthResponse> {
    return new Observable(observer => {
      setTimeout(() => {
        // Simular validação de código de acesso único
        if (registerData.accessCode === '1234567') {
          observer.next({
            success: false,
            message: 'Este código de acesso já está cadastrado. Tente outro código.'
          });
        } else {
          observer.next({
            success: true,
            message: 'Cadastro realizado com sucesso! Você pode fazer login agora.'
          });
        }
        observer.complete();
      }, 2000);
    });
  }
}
