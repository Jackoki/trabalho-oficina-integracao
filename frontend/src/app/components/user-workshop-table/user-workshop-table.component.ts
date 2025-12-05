import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WorkshopsService } from '../../services/WorkshopsService';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-user-workshop-table',
  standalone: true,
  imports: [CommonModule, RouterModule, AlertDialogComponent, ConfirmDialogComponent],
  templateUrl: './user-workshop-table.component.html',
  styleUrls: ['./user-workshop-table.component.scss']
})

export class UserWorkshopTableComponent implements OnInit, OnChanges {

  @Input() title!: string;
  @Input() typeId!: number;
  @Input() workshopId!: number;

  paginatedUsers: any[] = [];
  pageSize = 5;
  currentPage = 0;
  totalPages = 0;

  loading = true;

  alertVisivel = false;
  alertMensagem = '';
  alertTitulo = '';
  alertTipo: 'success' | 'error' | 'warning' = 'error';

  confirmVisivel = false;
  confirmTitulo = 'Confirmação';
  confirmMensagem = '';
  confirmUserId: number | null = null;

  constructor(private workshopService: WorkshopsService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['workshopId'] || changes['typeId']) {
      if (this.workshopId && this.typeId) {
        this.currentPage = 0;
        this.loadUsers();
      }
    }
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

  loadUsers() {
    this.loading = true;

    this.workshopService
      .getUsersWorkshops(this.workshopId, this.typeId, this.currentPage, this.pageSize)
      .subscribe({
        next: (page) => {
          this.paginatedUsers = page.content;
          this.totalPages = page.totalPages;
          this.currentPage = page.number;
          this.loading = false;
        },
        error: (err) => {
          console.error('Erro ao carregar usuários da oficina:', err);
          this.mostrarErro('Erro ao carregar usuários.');
          this.loading = false;
        }
      });
  }

  setPage(page: number) {
    if (page < 0 || page >= this.totalPages) return;
    this.currentPage = page;
    this.loadUsers();
  }

  desvincularUsuario(userId: number) {
    this.confirmUserId = userId;
    this.confirmMensagem = "Tem certeza que deseja remover este usuário do workshop?";
    this.confirmVisivel = true;
  }

  onConfirmar() {
    if (!this.confirmUserId) return;

    this.workshopService
      .removeUserFromWorkshop(this.workshopId, this.confirmUserId)
      .subscribe({
        next: () => {
          this.paginatedUsers = this.paginatedUsers.filter(u => u.id !== this.confirmUserId);
          this.mostrarSucesso("Usuário removido da oficina.");
          this.loadUsers();
        },
        error: () => {
          this.mostrarErro("Erro ao remover usuário.");
        }
      });

    this.confirmVisivel = false;
    this.confirmUserId = null;
  }

  onCancelar() {
    this.confirmVisivel = false;
    this.confirmUserId = null;
  }

}
