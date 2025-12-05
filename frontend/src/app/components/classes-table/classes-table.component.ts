import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassesService } from '../../services/ClassesService';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';


export interface WorkshopClass {
  id: number;
  classNumber: number;
}

@Component({
  selector: 'app-classes-table',
  standalone: true,
  imports: [CommonModule, AlertDialogComponent, ConfirmDialogComponent],
  templateUrl: './classes-table.component.html',
  styleUrls: ['./classes-table.component.scss']
})

export class ClassesTableComponent implements OnChanges {
  @Input() workshopId!: number;
  classes: WorkshopClass[] = [];

  pageSize = 5;
  currentPage = 0;
  totalPages = 0;
  loading = true;

  confirmVisible = false;
  alertVisible = false;
  alertType: 'success' | 'error' | 'warning' = 'error';

  alertTitle = '';
  alertMessage = '';
  classToDelete: WorkshopClass | null = null;

  constructor(
    private classesService: ClassesService,
    public auth: Auth,
    private router: Router
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['workshopId'] && this.workshopId) {
      this.currentPage = 0;
      this.loadClasses();
    }
  }

  loadClasses() {
    this.loading = true;
    this.classesService
      .getClassesByWorkshop(this.workshopId, this.currentPage, this.pageSize)
      .subscribe({
        next: (page) => {
          this.classes = page.content;
          this.totalPages = page.totalPages;
          this.currentPage = page.number;
          this.loading = false;
        },
        error: (err) => {          
          this.showAlert('Erro', 'Erro ao carregar as aulas.', 'error');
          this.loading = false;
        }
      });
  }

  changePage(page: number) {
    if (page < 0 || page >= this.totalPages) return;
    this.currentPage = page;
    this.loadClasses();
  }

  createNextClass() {
    this.router.navigate([`/workshops/${this.workshopId}/classes-rollcall/0`], {
      queryParams: { new: true }
    });
  }

  editClass(clazz: WorkshopClass) {
    this.router.navigate([
      `/workshops/${this.workshopId}/classes-rollcall/edit/${clazz.id}`
    ]);
  }

  deleteClass(clazz: WorkshopClass) {
    this.classToDelete = clazz;
    this.confirmVisible = true;
  }

  onConfirmDelete() {
    if (!this.classToDelete) return;

    this.classesService
      .deleteClass(this.workshopId, this.classToDelete.id)
      .subscribe({
        next: () => {

          const lastClassId =
            this.classes.length > 0
              ? this.classes[this.classes.length - 1].id
              : 0;

          this.classesService
            .recalculateWorkshopFrequency(lastClassId, this.workshopId)
            .subscribe({
              next: () => console.log('Frequências recalculadas'),
              error: () => console.warn('Falha ao recalcular frequências')
            });

          if (
            this.classes.length === 1 &&
            this.currentPage === this.totalPages - 1 &&
            this.currentPage > 0
          ) {
            this.currentPage--;
          }

          this.loadClasses();
        },
        error: () => {
          this.showAlert('Erro', 'Erro ao deletar aula.', 'error');
        }
      });

    this.confirmVisible = false;
    this.classToDelete = null;
  }

  onCancelDelete() {
    this.confirmVisible = false;
    this.classToDelete = null;
  }

  showAlert(title: string, message: string, type: 'success' | 'error' | 'warning') {
    this.alertTitle = title;
    this.alertMessage = message;
    this.alertType = type;
    this.alertVisible = true;
  }
}
