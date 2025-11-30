import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassesService } from '../../services/ClassesService';
import { Auth } from '../../services/auth';

export interface WorkshopClass {
  id: number;
  classNumber: number;
}

@Component({
  selector: 'app-classes-table',
  standalone: true,
  imports: [CommonModule],
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

  constructor(
    private classesService: ClassesService,
    public auth: Auth
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
          console.error('Erro ao carregar aulas:', err);
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
    this.classesService.createClass(this.workshopId).subscribe({
      next: () => this.loadClasses(),
      error: () => alert('Erro ao criar aula.')
    });
  }

  deleteClass(clazz: WorkshopClass) {
    if (!confirm(`Deseja excluir a aula ${clazz.classNumber}?`)) return;

    this.classesService.deleteClass(this.workshopId, clazz.id).subscribe({
      next: () => {
        if (this.classes.length === 1 && this.currentPage === this.totalPages - 1 && this.currentPage > 0) {
          this.currentPage--;
        }
        this.loadClasses();
      },
      error: () => alert('Erro ao deletar aula.')
    });
  }

}
