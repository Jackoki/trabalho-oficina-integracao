import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkshopsService, Workshop } from '../../services/WorkshopsService';
import { Auth, User } from '../../services/auth';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-workshop-table',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './workshop-table.component.html',
  styleUrls: ['./workshop-table.component.scss']
})
export class WorkshopTableComponent implements OnInit {
  workshops: Workshop[] = [];
  isProfessor: boolean = false;

  constructor(
    private workshopsService: WorkshopsService,
    private auth: Auth,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.auth.currentUser$.subscribe({
      next: (user: User | null) => {
        if (user) {
          this.isProfessor = user.userType?.id === 2; // ← id 2 = Professor (ajuste se for outro valor)
          this.loadWorkshops(user.id);
        }
      },
      error: (err) => console.error('Erro ao obter usuário logado:', err)
    });
  }

  loadWorkshops(userId: number) {
    this.workshopsService.getWorkshopsByUser(userId).subscribe({
      next: (workshops) => (this.workshops = workshops),
      error: (err) => console.error('Erro ao carregar workshops:', err)
    });
  }

  markComplete(workshop: Workshop) {
    if (!confirm(`Deseja concluir a oficina "${workshop.name}"?`)) return;

    this.workshopsService.finalizeWorkshop(workshop.id).subscribe({
      next: () => {
        workshop.isFinished = 1;
        alert('Oficina concluída com sucesso!');
      },
      error: (err) => {
        console.error('Erro ao concluir oficina:', err);
        alert('Erro ao concluir oficina.');
      }
    });
  }

  viewList(workshop: Workshop) {
    console.log('Ver lista da oficina:', workshop);
  }

  viewProfile(workshop: Workshop) {
    console.log('Ver perfil:', workshop);
  }

  openSettings(workshop: Workshop) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/workshops/edit', workshop.id]);
    });
  }

  viewCertificate(workshop: Workshop) {
    console.log('Ver certificado:', workshop);
  }

  deleteWorkshop(workshop: Workshop) {
    if (!confirm(`Deseja realmente excluir a oficina "${workshop.code}"?`)) return;

    this.workshopsService.deleteWorkshop(workshop.id).subscribe({
      next: () => {
        this.workshops = this.workshops.filter(w => w.id !== workshop.id);
      },
      error: () => alert('Erro ao deletar oficina. Tente novamente.')
    });
  }
}
