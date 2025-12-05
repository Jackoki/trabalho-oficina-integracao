import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WorkshopsService } from '../../services/WorkshopsService';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-user-workshop-add-table',
  standalone: true,
  imports: [CommonModule, RouterModule, AlertDialogComponent, ConfirmDialogComponent],
  templateUrl: './user-workshop-add-table.component.html',
  styleUrls: ['./user-workshop-add-table.component.scss']
})

export class UserWorkshopAddTableComponent implements OnInit, OnChanges {

  @Input() title!: string;
  @Input() typeId!: number;
  @Input() workshopId!: number;

  paginatedUsers: any[] = [];
  pageSize = 10;
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

  loadUsers() {
    this.loading = true;

    this.workshopService
      .getUsersNotLinked(this.workshopId, this.typeId, this.currentPage, this.pageSize)
      .subscribe({
        next: (page) => {
          this.paginatedUsers = page.content;
          this.totalPages = page.totalPages;
          this.currentPage = page.number;
          this.loading = false;
        },
        error: (err) => {
          console.error('Erro ao carregar usuários:', err);
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

  confirmarVinculo(userId: number, userName: string) {
    this.confirmUserId = userId;
    this.confirmMensagem = `Tem certeza que deseja adicionar o usuário "${userName}" à oficina?`;
    this.confirmVisivel = true;
  }

  onConfirmar() {
    if (!this.confirmUserId) return;

    this.vincularUsuario(this.confirmUserId);
    this.confirmVisivel = false;
    this.confirmUserId = null;
  }

  onCancelar() {
    this.confirmVisivel = false;
    this.confirmUserId = null;
  }

  vincularUsuario(userId: number) {
    this.workshopService
      .linkUserToWorkshop(this.workshopId, userId)
      .subscribe({
        next: () => {
          this.mostrarSucesso('Usuário adicionado à oficina!');
          this.loadUsers();
        },
        error: () => {
          this.mostrarErro('Falha ao adicionar usuário.');
        }
      });
  }
}
