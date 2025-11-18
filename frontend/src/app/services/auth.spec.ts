import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Auth, LoginRequest, RegisterRequest, User, AuthResponse } from './auth';

describe('Auth Service', () => {
  let service: Auth;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Auth]
    });

    service = TestBed.inject(Auth);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // garante que não haja requisições pendentes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should simulate successful login', (done) => {
    const mockUser: User = {
      id: 1,
      name: 'Administrador ELLP',
      code: '1234567',
      userType: { id: 1, name: 'Admin' },
      school: { id: 1, name: 'UTFPR-CP' }
    };

    const mockResponse: AuthResponse = {
      success: true,
      message: 'Login realizado com sucesso',
      user: mockUser
    };

    service.login({ accessCode: '1234567', password: '123456' }).subscribe(res => {
      expect(res.success).toBeTrue();
      expect(service.isAuthenticated()).toBeTrue();
      expect(service.getCurrentUser()?.name).toBe('Administrador ELLP');
      expect(service.getCurrentUser()?.userType.id).toBe(1);
      done();
    });

    const req = httpMock.expectOne('http://localhost:8080/auth/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should simulate failed login', (done) => {
    const mockResponse: AuthResponse = {
      success: false,
      message: 'Credenciais inválidas'
    };

    service.login({ accessCode: 'wrong', password: 'wrong' }).subscribe(res => {
      expect(res.success).toBeFalse();
      expect(service.isAuthenticated()).toBeFalse();
      expect(service.getCurrentUser()).toBeNull();
      done();
    });

    const req = httpMock.expectOne('http://localhost:8080/auth/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should logout correctly', (done) => {
    // Simula login primeiro
    const mockUser: User = {
      id: 1,
      name: 'Administrador ELLP',
      code: '1234567',
      userType: { id: 1, name: 'Admin' },
      school: { id: 1, name: 'UTFPR-CP' }
    };

    const loginResponse: AuthResponse = {
      success: true,
      message: 'Login OK',
      user: mockUser
    };

    service.login({ accessCode: '1234567', password: '123456' }).subscribe(() => {
      service.logout().subscribe(() => {
        expect(service.isAuthenticated()).toBeFalse();
        expect(service.getCurrentUser()).toBeNull();
        done();
      });

      const logoutReq = httpMock.expectOne('http://localhost:8080/auth/logout');
      expect(logoutReq.request.method).toBe('POST');
      logoutReq.flush({});
    });

    const loginReq = httpMock.expectOne('http://localhost:8080/auth/login');
    expect(loginReq.request.method).toBe('POST');
    loginReq.flush(loginResponse);
  });

  it('should register correctly', (done) => {
    const registerData: RegisterRequest = {
      fullName: 'Gabriel Kenji',
      accessCode: '9876543',
      password: '123456',
      schoolId: 1
    };

    const mockResponse: AuthResponse = {
      success: true,
      message: 'Registrado com sucesso'
    };

    service.register(registerData).subscribe(res => {
      expect(res.success).toBeTrue();
      done();
    });

    const req = httpMock.expectOne('http://localhost:8080/auth/register');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should fetch current user with me()', (done) => {
    const mockUser: User = {
      id: 1,
      name: 'Administrador ELLP',
      code: '1234567',
      userType: { id: 1, name: 'Admin' },
      school: { id: 1, name: 'UTFPR-CP' }
    };

    service.me().subscribe(user => {
      expect(user).toBeTruthy();
      expect(user?.name).toBe('Administrador ELLP');
      expect(service.isAuthenticated()).toBeTrue();
      done();
    });

    const req = httpMock.expectOne('http://localhost:8080/auth/me');
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });
});
