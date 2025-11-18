import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface School {
  id: number;
  name: string;
}

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register implements OnInit {

  registerData = {
    fullName: '',
    accessCode: '',
    password: '',
    confirmPassword: '',
    schoolId: null
  };

  schools: School[] = [];
  isLoading = false;
  registerError = '';
  registerSuccess = '';
  formSubmitted = false;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadSchools();
  }

  loadSchools(): void {
    this.http.get<School[]>('http://localhost:8080/schools').subscribe({
      next: (data) => this.schools = data,
      error: (err) => console.error('Erro ao carregar escolas:', err)
    });
  }

  onAccessCodeInput(event: any) {
    const value = event.target.value.replace(/[^0-9]/g, '');
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
    this.formSubmitted = true;

    if (this.isLoading || !this.passwordsMatch()) return;
    if (!this.registerData.schoolId) {
      this.registerError = 'Selecione uma escola';
      return;
    }

    this.isLoading = true;
    this.registerError = '';
    this.registerSuccess = '';

    const payload = {
      fullName: this.registerData.fullName,
      accessCode: this.registerData.accessCode,
      password: this.registerData.password,
      schoolId: this.registerData.schoolId
    };

  this.http.post('http://localhost:8080/auth/register', payload).subscribe({
    next: () => {
      this.registerSuccess = 'Usuário registrado com sucesso!';

      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1000);

      this.isLoading = false;
    },

    error: (err) => {
      console.error('Erro no registro:', err);
      if (err.error?.error) {
        this.registerError = err.error.error;
      } else {
        this.registerError = 'Erro ao registrar usuário. Tente novamente.';
      }
      this.isLoading = false;
    }
  });

  }
}
