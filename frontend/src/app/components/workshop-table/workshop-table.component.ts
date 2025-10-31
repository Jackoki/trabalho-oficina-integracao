import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkshopsService, Workshop } from '../../services/WorkshopsService';
import { Auth, User } from '../../services/auth';

@Component({
  selector: 'app-workshop-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './workshop-table.component.html',
  styleUrls: ['./workshop-table.component.scss']
})
export class WorkshopTableComponent implements OnInit {
  workshops: Workshop[] = [];

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
        this.workshops = workshops;
      },
      error: (err) => console.error('Erro ao carregar workshops:', err)
    });
  }

  viewList(workshop: Workshop) {
    console.log('Ver lista da oficina:', workshop);
  }

  viewProfile(workshop: Workshop) {
    console.log('Ver perfil:', workshop);
  }

  markComplete(workshop: Workshop) {
    console.log('Concluir oficina:', workshop);
  }

  openSettings(workshop: Workshop) {
    console.log('Abrir configurações:', workshop);
  }

  viewCertificate(workshop: Workshop) {
    console.log('Ver certificado:', workshop);
  }

}
