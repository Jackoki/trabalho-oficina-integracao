import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService, User } from '../../services/UsersService';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {
  @Input() title!: string;
  @Input() typeId!: number;

  users: User[] = [];

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.usersService.getUsersByType(this.typeId).subscribe({
      next: (users) => (this.users = users),
      error: (err) => console.error(`Erro ao carregar usuários do tipo ${this.title}:`, err)
    });
  }

  openSettings(user: User) {
    console.log('Abrir configurações do usuário:', user);
  }

  deleteUser(user: User) {
    console.log('Excluir usuário:', user);
  }
}
