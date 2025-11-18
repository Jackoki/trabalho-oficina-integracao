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

  constructor(
    private workshopsService: WorkshopsService,
    public auth: Auth, // Make auth service public to use in the template
    private router: Router
  ) {}

  ngOnInit(): void {
    this.auth.currentUser$.subscribe({
      next: (user: User | null) => {
        if (user) {
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
    // Placeholder for future implementation
    console.log('Ver lista de chamada da oficina:', workshop);
    alert('Funcionalidade de chamada ainda não implementada.');
  }

  openSettings(workshop: Workshop) {
    // Navigate to the edit page
    this.router.navigate(['/oficina/edit', workshop.id]);
  }

  viewCertificate(workshop: Workshop) {
    // Placeholder for future implementation
    console.log('Ver certificado da oficina:', workshop);
    alert('Funcionalidade de certificado ainda não implementada.');
  }

  deleteWorkshop(workshop: Workshop) {
    if (!confirm(`Deseja realmente excluir a oficina "${workshop.code} - ${workshop.name}"?`)) return;

    this.workshopsService.deleteWorkshop(workshop.id).subscribe({
      next: () => {
        this.workshops = this.workshops.filter(w => w.id !== workshop.id);
        alert('Oficina excluída com sucesso!');
      },
      error: (err) => {
        console.error('Erro ao deletar oficina:', err);
        alert('Erro ao deletar oficina. Tente novamente.');
      }
    });
  }
}
