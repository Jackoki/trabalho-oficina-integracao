import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Auth } from './auth';

describe('Auth Service', () => {
  let service: Auth;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Auth]
    });
    service = TestBed.inject(Auth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should simulate successful login', (done) => {
    service.login({ accessCode: '1234567', password: '123456' }).subscribe(response => {
      expect(response.success).toBeTrue();
      expect(service.isAuthenticated()).toBeTrue();
      expect(service.getCurrentUser()?.fullName).toBe('Administrador ELLP');
      done();
    });
  });

  it('should simulate failed login', (done) => {
    service.login({ accessCode: 'wrong', password: 'wrong' }).subscribe(response => {
      expect(response.success).toBeFalse();
      expect(service.isAuthenticated()).toBeFalse();
      done();
    });
  });

  it('should logout correctly', (done) => {
    service.login({ accessCode: '1234567', password: '123456' }).subscribe(() => {
      service.logout();
      expect(service.isAuthenticated()).toBeFalse();
      expect(service.getCurrentUser()).toBeNull();
      done();
    });
  });
});
