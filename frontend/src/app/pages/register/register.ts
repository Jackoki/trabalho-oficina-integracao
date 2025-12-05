import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AlertDialogComponent } from '../../components/alert-dialog/alert-dialog.component';

interface School {
  id: number;
  name: string;
}

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterModule, CommonModule, AlertDialogComponent],
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
  formSubmitted = false;

  alertVisivel = false;
  alertMensagem = '';
  alertTipo: 'success' | 'error' | 'warning' = 'error';
  alertTitulo = 'Erro';

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadSchools();
  }

  mostrarErro(msg: string) {
    this.alertTitulo = 'Erro';
    this.alertTipo = 'error';
    this.alertMensagem = msg;
    this.alertVisivel = true;
  }

  mostrarSucesso(msg: string) {
    this.alertTitulo = 'Sucesso';
    this.alertTipo = 'success';
    this.alertMensagem = msg;
    this.alertVisivel = true;
  }

  mostrarAviso(msg: string) {
    this.alertTitulo = 'Atenção';
    this.alertTipo = 'warning';
    this.alertMensagem = msg;
    this.alertVisivel = true;
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
      this.mostrarAviso('Selecione uma instituição de ensino.');
      return;
    }

    this.isLoading = true;

    const payload = {
      name: this.registerData.fullName,
      code: this.registerData.accessCode,
      password: this.registerData.password,
      userType: { id: 2 },
      school: { id: this.registerData.schoolId }
    };

  this.http.post('http://localhost:8080/users', payload).subscribe({
    next: () => {
      this.mostrarSucesso('Usuário registrado com sucesso!');

      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1000);

      this.isLoading = false;
    },
    
    error: (err) => {
      console.error('Erro no registro:', err);
      if (err.error?.error) {
        this.mostrarErro(err.error.error);
      } else {
        this.mostrarErro('Erro ao registrar usuário. Tente novamente.');
      }
      this.isLoading = false;
    }
  });

  }
}
