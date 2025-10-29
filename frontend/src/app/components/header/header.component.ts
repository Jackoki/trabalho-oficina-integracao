import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { Auth } from '../../services/auth';
import { Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NgIf, RouterModule], // 👈 adiciona aqui
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userName: string = '';
  isAdmin: boolean = false;
  isLoggingOut: boolean = false; // 👈 novo estado

  constructor(private auth: Auth, private router: Router) {}

  ngOnInit(): void {
    this.auth.currentUser$.subscribe({
      next: user => {
        if (this.isLoggingOut) return;

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
    this.isLoggingOut = true;
    this.auth.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
