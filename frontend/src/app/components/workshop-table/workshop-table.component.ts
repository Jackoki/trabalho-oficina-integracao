import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkshopsService, Workshop } from '../../services/WorkshopsService';
import { Auth, User } from '../../services/auth';
import { Router, RouterModule } from '@angular/router';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { CertificateService } from '../../services/CertificateService';

@Component({
  selector: 'app-workshop-table',
  standalone: true,
  imports: [CommonModule, RouterModule, AlertDialogComponent, ConfirmDialogComponent],
  templateUrl: './workshop-table.component.html',
  styleUrls: ['./workshop-table.component.scss']
})
export class WorkshopTableComponent implements OnInit {
  
  workshops: Workshop[] = [];
  classesDone: Record<number, number> = {};

  currentPage = 0;
  pageSize = 10;
  totalPages = 0;

  isProfessor: boolean = false;
  userId!: number;

  // ALERTA
  alertVisivel = false;
  alertTitulo = '';
  alertMensagem = '';
  alertTipo: 'success' | 'error' | 'warning' = 'error';

  // CONFIRMAÇÃO
  confirmVisivel = false;
  confirmTitulo = '';
  confirmMensagem = '';
  confirmAcao: (() => void) | null = null;

  constructor(
    private workshopsService: WorkshopsService,
    private certificateService: CertificateService,
    public auth: Auth,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.auth.currentUser$.subscribe({
      next: (user: User | null) => {
        if (user) {
          this.userId = user.id;
          this.isProfessor = user.userType?.id === 2;
          this.loadWorkshops();
        }
      },
      error: (err) => console.error('Erro ao obter usuário logado:', err)
    });
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

  abrirConfirmacao(titulo: string, mensagem: string, acao: () => void) {
    this.confirmTitulo = titulo;
    this.confirmMensagem = mensagem;
    this.confirmAcao = acao;
    this.confirmVisivel = true;
  }

  confirmarAcao() {
    if (this.confirmAcao) this.confirmAcao();
    this.confirmVisivel = false;
  }

  cancelarConfirmacao() {
    this.confirmVisivel = false;
  }


  loadWorkshops() {
    this.workshopsService
      .getWorkshopsByUserPaginated(this.userId, this.currentPage, this.pageSize)
      .subscribe({
        next: (page) => {
          this.workshops = page.content;
          this.totalPages = page.totalPages;
          this.currentPage = page.number;

          this.workshops.forEach(w => {
            this.workshopsService.getClassesDone(w.id).subscribe({
              next: (count) => {
                this.classesDone[w.id] = count;
              },
              error: (err) => console.error(`Erro ao contar aulas da oficina ${w.id}`, err)
            });
          });
        },
        error: () => this.mostrarErro('Erro ao carregar oficinas.')
      });
  }

  setPage(page: number) {
    if (page < 0 || page >= this.totalPages) return;
    this.currentPage = page;
    this.loadWorkshops();
  }

  markComplete(workshop: Workshop) {
    if (workshop.isFinished === 1) {
      this.mostrarAviso(`A oficina "${workshop.name}" já foi concluída.`);
      return;
    }

    const done = this.classesDone[workshop.id] ?? workshop.actualNumberClasses ?? 0;
    const planned = workshop.numberClasses ?? 0;

    if (planned === 0) {
      this.mostrarErro(`A oficina "${workshop.name}" não possui aulas previstas.`);
      return;
    }

    if (done !== planned) {
      this.mostrarErro(`Não é possível concluir a oficina "${workshop.name}".  Aulas previstas: ${planned}, aulas registradas: ${done}.`);
      return;
    }

    this.abrirConfirmacao(
      'Concluir Oficina',
      `Deseja realmente concluir a oficina "${workshop.name}"?`,
      () => {
        this.workshopsService.finalizeWorkshop(workshop.id).subscribe({
          next: () => {
            workshop.isFinished = 1;
            this.mostrarSucesso('Oficina concluída com sucesso!');
          },
          error: (err) => {
            const msg = err?.error?.message || err?.statusText || 'Erro ao concluir oficina.';
            this.mostrarErro(msg);
          }
        });
      }
    );
  }


  viewAttendance(workshop: Workshop) {  
    this.router.navigate(['workshops', workshop.id, 'classes']);
  }

  viewList(workshop: Workshop) {
    this.router.navigate(['/workshops/workshop-users', workshop.id]); 
  }

  openSettings(workshop: Workshop) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/workshops/edit', workshop.id]);
    });
  }

  viewCertificate(workshop: Workshop) {
    this.auth.currentUser$.subscribe(user => {
      if (!user) return;

      this.certificateService.getCertificate(user.id, workshop.id).subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          window.open(url, '_blank');
        },
        error: (err) => {
          if (err.error instanceof Blob) {
            const reader = new FileReader();

            reader.onload = () => {
              const text = reader.result as string;
              this.mostrarErro(text || "Não foi possível gerar o certificado. Oficina não finalizada ou aluno com menos de 75% de presença");
            };

            reader.readAsText(err.error);
            return;
          }

          const backendMessage =  err?.error?.message || err?.error || "Não foi possível gerar o certificado.";
          this.mostrarErro(backendMessage);
        }
      });
    });
  }

  deleteWorkshop(workshop: Workshop) {
    this.abrirConfirmacao(
      'Excluir Oficina',
      `Deseja realmente excluir a oficina "${workshop.code}"?`,
      () => {
        this.workshopsService.deleteWorkshop(workshop.id).subscribe({
          next: () => {
            if (this.workshops.length === 1 && this.currentPage > 0) {
              this.currentPage--;
            }
            this.loadWorkshops();
            this.mostrarSucesso('Oficina excluída com sucesso!');
          },
          error: () => this.mostrarErro('Erro ao deletar oficina.')
        });
      }
    );
  }
}
