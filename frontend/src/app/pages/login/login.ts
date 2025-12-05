import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth, LoginRequest, AuthResponse } from '../../services/auth';
import { AlertDialogComponent } from '../../components/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterModule, CommonModule, AlertDialogComponent],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})

export class Login {
  loginData = {
    accessCode: '',
    password: ''
  };

  isLoading = false;

  alertVisivel = false;
  alertMensagem = '';
  alertTitulo = 'Erro';
  alertTipo: 'success' | 'error' | 'warning' = 'error';

  constructor(private authService: Auth, private router: Router) {}

  mostrarErro(msg: string) {
    this.alertTitulo = 'Erro';
    this.alertMensagem = msg;
    this.alertTipo = 'error';
    this.alertVisivel = true;
  }

  mostrarSucesso(msg: string) {
    this.alertTitulo = 'Sucesso';
    this.alertMensagem = msg;
    this.alertTipo = 'success';
    this.alertVisivel = true;
  }

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
          this.mostrarErro(response.message);
        }
        this.isLoading = false;
      },
      error: (error) => {  
        const msg = error.error?.message || error.error?.Message || 'Erro de conexão. Tente novamente.';
        this.mostrarErro(msg);

        this.isLoading = false;
      }
    });
  }
}
