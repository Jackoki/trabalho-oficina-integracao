import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolsService, School } from '../../services/SchoolsService';
import { Auth, User } from '../../services/auth';
import { Router, RouterModule } from '@angular/router';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-school-table',
  standalone: true,
  imports: [CommonModule, RouterModule, AlertDialogComponent, ConfirmDialogComponent],
  templateUrl: './school-table.component.html',
  styleUrls: ['./school-table.component.scss']
})

export class SchoolTableComponent implements OnInit {

  schools: School[] = [];

  alertVisivel = false;
  alertMensagem = '';
  alertTitulo = '';
  alertTipo: 'success' | 'error' | 'warning' = 'error';

  confirmVisivel = false;
  schoolToDelete: School | null = null;

  constructor(
    private schoolsService: SchoolsService,
    private auth: Auth,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.auth.currentUser$.subscribe({
      next: (user: User | null) => {
        if (user) this.loadSchools();
      },
      error: (err) => console.error('Erro ao obter usuário logado:', err)
    });
  }

  loadSchools() {
    this.schoolsService.getAllSchools().subscribe({
      next: (schools) => {
        this.schools = schools;
      },
      error: () => {
        this.mostrarErro('Erro ao carregar escolas.');
      }
    });
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

  openSettings(school: School) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/schools/edit', school.id]);
    });
  }

  deleteSchool(school: School) {
    this.schoolToDelete = school;
    this.confirmVisivel = true;
  }

  confirmarDelete() {
    if (!this.schoolToDelete) return;

    this.schoolsService.deleteSchool(this.schoolToDelete.id).subscribe({
      next: () => {
        this.schools = this.schools.filter(s => s.id !== this.schoolToDelete!.id);
        this.mostrarSucesso('Escola deletada com sucesso!');
      },
      error: () => {
        this.mostrarErro('Erro ao deletar escola. Tente novamente.');
      }
    });

    this.confirmVisivel = false;
    this.schoolToDelete = null;
  }

  cancelarDelete() {
    this.confirmVisivel = false;
    this.schoolToDelete = null;
  }
}
