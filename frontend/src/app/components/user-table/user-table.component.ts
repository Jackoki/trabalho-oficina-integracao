import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService, User } from '../../services/UsersService';
import { Auth } from '../../services/auth';
import { Router, RouterModule } from '@angular/router';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule, RouterModule, AlertDialogComponent, ConfirmDialogComponent],
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})

export class UserTableComponent implements OnInit {

  @Input() title!: string;
  @Input() typeId!: number;

  paginatedUsers: User[] = [];
  pageSize = 5;
  currentPage = 0;
  totalPages = 0;

  alertVisivel = false;
  alertMensagem = '';
  alertTitulo = '';
  alertTipo: 'success' | 'error' | 'warning' = 'error';

  confirmVisivel = false;
  userToDelete: User | null = null;

  constructor(
    private usersService: UsersService,
    private auth: Auth,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.usersService.getUsersByType(this.typeId, this.currentPage, this.pageSize)
      .subscribe({
        next: (page) => {
          this.paginatedUsers = page.content;
          this.totalPages = page.totalPages;
          this.currentPage = page.number;
        },
        error: () =>
          this.mostrarErro(`Erro ao carregar usuários do tipo ${this.title}.`)
      });
  }

  setPage(page: number) {
    if (page < 0 || page >= this.totalPages) return;
    this.currentPage = page;
    this.loadUsers();
  }

  openSettings(user: User) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/users/edit', user.id]);
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

  deleteUser(user: User): void {
    this.userToDelete = user;
    this.confirmVisivel = true;
  }

  confirmarDelete() {
    if (!this.userToDelete) return;

    this.usersService.deleteUser(this.userToDelete.id).subscribe({
      next: () => {
        if (this.paginatedUsers.length === 1 && this.currentPage > 0) {
          this.currentPage--;
        }
        this.loadUsers();
        this.mostrarSucesso('Usuário deletado com sucesso!');
      },
      error: () => {
        this.mostrarErro('Erro ao deletar usuário. Tente novamente.');
      }
    });

    this.confirmVisivel = false;
    this.userToDelete = null;
  }

  cancelarDelete() {
    this.confirmVisivel = false;
    this.userToDelete = null;
  }
}
