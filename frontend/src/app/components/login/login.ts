import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth, LoginRequest } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginData = {
    accessCode: '',
    password: ''
  };

  isLoading = false;
  loginError = '';

  constructor(
    private authService: Auth,
    private router: Router
  ) {}

  onAccessCodeInput(event: any) {
    // Permitir apenas números
    const value = event.target.value.replace(/[^0-9]/g, '');
    // Limitar a 7 dígitos
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
      next: (response) => {
        if (response.success) {
          console.log('Login realizado com sucesso!', response.user);
          // Redirecionar para dashboard ou página principal
          // this.router.navigate(['/dashboard']);
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
