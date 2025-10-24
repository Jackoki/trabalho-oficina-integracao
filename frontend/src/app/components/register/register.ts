import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth, RegisterRequest } from '../../services/auth';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  registerData = {
    fullName: '',
    accessCode: '',
    password: '',
    confirmPassword: ''
  };

  isLoading = false;
  registerError = '';
  registerSuccess = '';

  constructor(
    private authService: Auth,
    private router: Router
  ) {}

  onAccessCodeInput(event: any) {
    // Permitir apenas números
    const value = event.target.value.replace(/[^0-9]/g, '');
    // Limitar a 7 dígitos
    if (value.length <= 7) {
      this.registerData.accessCode = value;
      event.target.value = value;
    } else {
      event.target.value = this.registerData.accessCode;
    }
  }

  passwordsMatch(): boolean {
    return this.registerData.password === this.registerData.confirmPassword;
  }

  onSubmit() {
    if (this.isLoading) return;

    this.isLoading = true;
    this.registerError = '';
    this.registerSuccess = '';

    const registerRequest: RegisterRequest = {
      fullName: this.registerData.fullName,
      accessCode: this.registerData.accessCode,
      userType: 'ALUNO', // Tipo padrão definido automaticamente
      password: this.registerData.password
    };

    this.authService.register(registerRequest).subscribe({
      next: (response) => {
        if (response.success) {
          this.registerSuccess = response.message;
          console.log('Registro realizado com sucesso!');
          
          // Limpar formulário após sucesso
          setTimeout(() => {
            this.registerData = {
              fullName: '',
              accessCode: '',
              password: '',
              confirmPassword: ''
            };
            this.registerSuccess = '';
            // Opcional: redirecionar para login
            // this.router.navigate(['/login']);
          }, 3000);
        } else {
          this.registerError = response.message;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro no registro:', error);
        this.registerError = 'Erro de conexão. Tente novamente.';
        this.isLoading = false;
      }
    });
  }
}
