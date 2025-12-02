import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';

interface School {
  id: number;
  name: string;
}

@Component({
  selector: 'app-add-schools',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './add-schools.html',
  styleUrls: ['./add-schools.scss']
})

export class AddSchools implements OnInit {

  newSchoolName = '';
  schools: School[] = [];
  isLoading = false;
  addError = '';
  addSuccess = '';

  constructor(
    private http: HttpClient,
    private router: Router
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

  addSchool(): void {
    if (!this.newSchoolName.trim()) {
      this.addError = 'Digite o nome da escola.';
      return;
    }

    this.isLoading = true;
    this.addError = '';
    this.addSuccess = '';

    const payload = { name: this.newSchoolName.trim() };

    this.http.post('http://localhost:8080/schools', payload, { withCredentials: true }).subscribe({
      next: () => {
        this.addSuccess = 'Escola adicionada com sucesso!';
        this.newSchoolName = '';
        this.loadSchools();
        this.isLoading = false;

        setTimeout(() => {
          this.voltar();
        }, 1500);
      },
      error: (err) => {
        console.error('Erro ao adicionar escola:', err);
        this.addError = 'Erro ao adicionar escola. Tente novamente.';
        this.isLoading = false;
      }
    });
  }

  voltar(): void {
    this.router.navigate(['/schools']);
  }
}
