import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NgIf],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  userName: string = '';
  isAdmin: boolean = false;

  constructor(private auth: Auth) {}

  ngOnInit(): void {
    this.auth.currentUser$.subscribe({
      next: user => {
        this.userName = user?.name || 'Visitante';
        this.isAdmin = user?.userType?.id === 1;
      },
      error: err => {
        console.error('Erro ao pegar usuário:', err);
        this.userName = 'Visitante';
        this.isAdmin = false;
      }
    });
  }

  logout(): void {
    this.auth.logout().subscribe(() => {
      this.userName = '';
      this.isAdmin = false;
      console.log('Usuário deslogado localmente');
    });
  }


}


