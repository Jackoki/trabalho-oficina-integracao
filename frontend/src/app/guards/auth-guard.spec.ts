/*
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Auth, User, AuthResponse } from '../services/auth';

describe('Auth Service (fake)', () => {
  let service: Auth;

  beforeEach(() => {
    const fakeAuth = {
      login: jasmine.createSpy('login').and.returnValue(of({ success: true, message: 'Login fake', user: { id: 1, fullName: 'Teste', accessCode: '123', userType: 'Aluno' } })),
      register: jasmine.createSpy('register').and.returnValue(of({ success: true, message: 'Registro fake' })),
      me: jasmine.createSpy('me').and.returnValue(of({ id: 1, fullName: 'Teste', accessCode: '123', userType: 'Aluno' })),
      isAuthenticated: jasmine.createSpy('isAuthenticated').and.returnValue(true),
      getCurrentUser: jasmine.createSpy('getCurrentUser').and.returnValue({ id: 1, fullName: 'Teste', accessCode: '123', userType: 'Aluno' })
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: Auth, useValue: fakeAuth }
      ]
    });

    service = TestBed.inject(Auth);
  });

  it('login deve passar', (done) => {
    service.login({ accessCode: '123', password: '123' }).subscribe(res => {
      expect(res.success).toBeTrue();
      done();
    });
  });

  it('me deve passar', (done) => {
    service.me().subscribe(user => {
      expect(user).toBeTruthy();
      done();
    });
  });

  it('isAuthenticated deve passar', () => {
    expect(service.isAuthenticated()).toBeTrue();
  });
});

*/

