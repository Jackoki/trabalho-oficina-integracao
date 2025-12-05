import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { AlertDialogComponent } from '../../components/alert-dialog/alert-dialog.component';

interface School {
  id: number;
  name: string;
}

@Component({
  selector: 'app-add-schools',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, AlertDialogComponent],
  templateUrl: './add-schools.html',
  styleUrls: ['./add-schools.scss']
})

export class AddSchools implements OnInit {

  newSchoolName = '';
  schools: School[] = [];
  isLoading = false;
  
  alertVisivel = false;
  alertMensagem = '';
  alertTitulo = '';
  alertTipo: 'success' | 'error' | 'warning' = 'error';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  mostrarErro(msg: string) {
    this.alertTitulo = 'Erro';
    this.alertTipo = 'error';
    this.alertMensagem = msg;
    this.alertVisivel = true;
  }

  mostrarAviso(msg: string) {
    this.alertTitulo = 'Atenção';
    this.alertTipo = 'warning';
    this.alertMensagem = msg;
    this.alertVisivel = true;
  }

  mostrarSucesso(msg: string) {
    this.alertTitulo = 'Sucesso';
    this.alertTipo = 'success';
    this.alertMensagem = msg;
    this.alertVisivel = true;
  }

  ngOnInit(): void {
    this.loadSchools();
  }

  loadSchools(): void {
    this.http.get<School[]>('http://localhost:8080/schools').subscribe({
      next: (data) => this.schools = data,
      error: () => this.mostrarErro('Erro ao carregar lista de escolas.')
    });
  }

  addSchool(): void {
    if (!this.newSchoolName.trim()) {
      this.mostrarAviso('Digite o nome da escola.');
      return;
    }

    this.isLoading = true;

    const payload = { name: this.newSchoolName.trim() };

    this.http.post('http://localhost:8080/schools', payload, { withCredentials: true }).subscribe({
      next: () => {
        this.mostrarSucesso('Escola adicionada com sucesso!');
        this.newSchoolName = '';
        this.loadSchools();
        this.isLoading = false;

        setTimeout(() => {
          this.voltar();
        }, 1500);
      },
      error: (err) => {
        console.error('Erro ao adicionar escola:', err);
       this.mostrarErro('Erro ao adicionar escola. Tente novamente.');
        this.isLoading = false;
      }
    });
  }

  voltar(): void {
    this.router.navigate(['/schools']);
  }
}
