import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';

interface Workshop {
  id?: number;
  name: string;
  code: string;
  numberClasses: number;
  isFinished: number;
  description?: string;
}

@Component({
  selector: 'app-add-workshops',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './add-workshops.html',
  styleUrls: ['./add-workshops.scss']
})

export class AddWorkshops {

  newWorkshop: Workshop = {
    name: '',
    code: '',
    numberClasses: 1,
    isFinished: 0,
    description: ''
  };

  isLoading = false;
  addError = '';
  addSuccess = '';

  private readonly API_URL = 'http://localhost:8080/workshops';

  constructor(private http: HttpClient, private router: Router) {}

  addWorkshop(): void {
    if (!this.newWorkshop.name.trim() || !this.newWorkshop.code.trim() || this.newWorkshop.numberClasses <= 0) {
      this.addError = 'Preencha todos os campos corretamente.';
      return;
    }

    this.isLoading = true;
    this.addError = '';
    this.addSuccess = '';

    const payload = { ...this.newWorkshop, isFinished: 0 };

    this.http.post(this.API_URL, payload, { withCredentials: true }).subscribe({
      next: () => {
        this.addSuccess = 'Workshop adicionado com sucesso!';
        this.newWorkshop = { name: '', code: '', numberClasses: 1, isFinished: 0, description: '' };
        this.isLoading = false;

        setTimeout(() => {
          this.newWorkshop = { name: '', code: '', numberClasses: 1, isFinished: 0, description: '' };
          this.voltar();
        }, 1500);
      },
      error: (err) => {
        console.error(err);
        this.addError = err.error?.message || 'Erro ao adicionar workshop. Tente novamente.';
        this.isLoading = false;
      }
    });
  }

  voltar(): void {
    this.router.navigate(['/home']);
  }
}
