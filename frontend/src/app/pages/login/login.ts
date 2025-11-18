import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth, LoginRequest, AuthResponse } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  loginData = {
    accessCode: '',
    password: ''
  };

  isLoading = false;
  loginError = '';

  constructor(private authService: Auth, private router: Router) {}

  onAccessCodeInput(event: any) {
    const value = event.target.value.replace(/[^0-9]/g, '');
    if (value.length <= 7) {
      this.loginData.accessCode = value;
      event.target.value = value;
    } else {
      event.target.value = this.loginData.accessCode;
    }
  }

  onSubmit() {
    if (this.isLoading) return;

    this.isLoading = true;
    this.loginError = '';

    const loginRequest: LoginRequest = {
      accessCode: this.loginData.accessCode,
      password: this.loginData.password
    };

    this.authService.login(loginRequest).subscribe({
      next: (response: AuthResponse) => {
        if (response.success && response.user) {
          localStorage.setItem('user', JSON.stringify(response.user));
          this.router.navigate(['/home']);
        } else {
          this.loginError = response.message;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro no login:', error);
        this.loginError = 'Erro de conexão. Tente novamente.';
        this.isLoading = false;
      }
    });
  }
}
