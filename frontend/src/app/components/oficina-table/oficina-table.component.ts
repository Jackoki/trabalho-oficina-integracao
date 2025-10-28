import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkshopsService, Workshop } from '../../services/WorkshopsService';
import { Auth, User } from '../../services/auth';

@Component({
  selector: 'app-oficina-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './oficina-table.component.html',
  styleUrls: ['./oficina-table.component.scss']
})
export class OficinaTableComponent implements OnInit {
  oficinas: Workshop[] = [];

  constructor(private workshopsService: WorkshopsService, private auth: Auth) {}

  ngOnInit(): void {
    this.auth.currentUser$.subscribe({
      next: (user: User | null) => {
        if (user) this.loadWorkshops(user.id);
      },
      error: (err) => console.error('Erro ao obter usuário logado:', err)
    });
  }

  loadWorkshops(userId: number) {
    this.workshopsService.getWorkshopsByUser(userId).subscribe({
      next: (workshops) => {
        this.oficinas = workshops;
      },
      error: (err) => console.error('Erro ao carregar workshops:', err)
    });
  }
}
