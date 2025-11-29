import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

interface Workshop {
  id?: number;
  name: string;
  code: string;
  numberClasses: number;
  isFinished: number;
  description?: string;
}

@Component({
  selector: 'app-edit-workshops',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './edit-workshops.html',
  styleUrls: ['./edit-workshops.scss']
})

export class EditWorkshopsComponent implements OnInit {

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
  workshopId!: number;

  private readonly API_URL = 'http://localhost:8080/workshops';

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.workshopId = +idParam;
        this.loadWorkshop(this.workshopId);
      }
    });
  }

  loadWorkshop(id: number): void {
    this.http.get<Workshop>(`${this.API_URL}/${id}`, { withCredentials: true }).subscribe({
      next: (data) => {
        this.newWorkshop = data;
      },
      error: (err) => {
        console.error(err);
        this.addError = 'Erro ao carregar oficina.';
      }
    });
  }

  addWorkshop(): void {
    if (!this.newWorkshop.name.trim() || !this.newWorkshop.code.trim() || this.newWorkshop.numberClasses <= 0) {
      this.addError = 'Preencha todos os campos corretamente.';
      return;
    }

    this.isLoading = true;
    this.addError = '';
    this.addSuccess = '';

    const payload = { ...this.newWorkshop };

    const request = this.workshopId ? this.http.put(`${this.API_URL}/${this.workshopId}`, payload, { withCredentials: true }) : this.http.post(this.API_URL, payload, { withCredentials: true });

    request.subscribe({
      next: () => {
        this.addSuccess = this.workshopId ? 'Oficina atualizado com sucesso!' : 'Oficina adicionado com sucesso!';
        this.isLoading = false;
        setTimeout(() => this.voltar(), 1500);
      },
      error: (err) => {
        console.error(err);
        this.addError = err.error?.message || 'Erro ao salvar oficina. Tente novamente.';
        this.isLoading = false;
      }
    });
  }

  voltar(): void {
    this.router.navigate(['/home']);
  }
}
