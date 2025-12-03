import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Auth } from '../../services/auth';

interface School {
  id: number;
  name: string;
}

@Component({
  selector: 'app-edit-schools',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './edit-schools.html',
  styleUrls: ['./edit-schools.scss']
})

export class EditSchools implements OnInit {
  newSchoolName = '';
  schoolId: number | null = null;
  isLoading = false;
  addError = '';
  addSuccess = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private auth: Auth
  ) {}

  ngOnInit(): void {
    const user = this.auth.getCurrentUser();
    if (!user || user.userType.name !== 'Admin') {
      this.router.navigate(['/schools']);
      return;
    }

    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.schoolId = +idParam;
        this.loadSchool(this.schoolId);
      }
    });
  }

  loadSchool(id: number): void {
    this.http.get<School>(`http://localhost:8080/schools/${id}`, { withCredentials: true }).subscribe({
      next: (school) => this.newSchoolName = school.name,
      error: (err) => {
        console.error(err);
        this.addError = 'Erro ao carregar escola.';
      }
    });
  }

  saveSchool(): void {
    if (!this.newSchoolName.trim()) {
      this.addError = 'Digite o nome da escola.';
      return;
    }

    this.isLoading = true;
    this.addError = '';
    this.addSuccess = '';

    const payload = { name: this.newSchoolName.trim() };

    if (this.schoolId) {
      this.http.put(`http://localhost:8080/schools/${this.schoolId}`, payload, { withCredentials: true }).subscribe({
        next: () => {
          this.addSuccess = 'Escola atualizada com sucesso!';
          this.isLoading = false;
          setTimeout(() => this.router.navigate(['/schools']), 1000);
        },
        error: (err) => {
          console.error(err);
          if (err.status === 403) {
            this.addError = 'Acesso negado. Apenas admins podem atualizar escolas.';
          } else {
            this.addError = err.error?.message || 'Erro ao atualizar escola. Tente novamente.';
          }
          this.isLoading = false;
        }
      });
    } 
    
    else {
      this.http.post('http://localhost:8080/schools', payload, { withCredentials: true }).subscribe({
        next: () => {
          this.addSuccess = 'Escola adicionada com sucesso!';
          this.newSchoolName = '';
          this.isLoading = false;
        },
        error: (err) => {
          console.error(err);
          this.addError = err.error?.message || 'Erro ao adicionar escola. Tente novamente.';
          this.isLoading = false;
        }
      });
    }
  }

  voltar(): void {
    this.router.navigate(['/schools']);
  }
}
