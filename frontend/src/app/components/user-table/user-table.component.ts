import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService, User } from '../../services/UsersService';
import { Auth } from '../../services/auth';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule, RouterModule],
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

  constructor(private usersService: UsersService, private auth: Auth, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.usersService.getUsersByType(this.typeId, this.currentPage, this.pageSize).subscribe({
      next: (page) => {
        this.paginatedUsers = page.content;
        this.totalPages = page.totalPages;
        this.currentPage = page.number;
      },
      error: (err) => console.error(`Erro ao carregar usuários do tipo ${this.title}:`, err)
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

  deleteUser(user: User): void {
    if (!confirm(`Deseja realmente excluir o usuário "${user.name}"?`)) return;

    this.usersService.deleteUser(user.id).subscribe({
      next: () => {
        if (this.paginatedUsers.length === 1 && this.currentPage > 0) {
          this.currentPage--;
        }
        this.loadUsers();
      },
      error: (err) => {
        console.error('Erro ao deletar usuário:', err);
        alert('Erro ao deletar usuário. Tente novamente.');
      }
    });
  }
}
