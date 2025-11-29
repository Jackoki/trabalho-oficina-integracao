import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ClassesService } from '../../services/ClassesService';
import { Auth } from '../../services/auth';

export interface Class {
  id: number;
  classNumber: number;
  isFinished: boolean;
}

@Component({
  selector: 'app-classes-table',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './classes-table.component.html',
  styleUrls: ['./classes-table.component.scss']
})

export class ClassesTableComponent implements OnChanges {
  @Input() workshopId!: number;
  classes: Class[] = [];
  
  pageSize = 5;
  currentPage = 0;
  totalPages = 0;
  loading = true;

  constructor(
    private classesService: ClassesService,
    private router: Router,
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

  setPage(page: number) {
    if (page < 0 || page >= this.totalPages) return;
    this.currentPage = page;
    this.loadClasses();
  }

  createClassPrompt() {
    const classNumber = Number(prompt('Número da aula:'));
    if (!classNumber) return;

    this.classesService.createClass(this.workshopId, classNumber).subscribe({
      next: () => this.loadClasses(),
      error: () => alert('Erro ao criar aula.')
    });
  }

  deleteClass(clazz: Class) {
    if (!confirm(`Deseja excluir a aula ${clazz.classNumber}?`)) return;

    this.classesService.deleteClass(this.workshopId, clazz.id).subscribe({
      next: () => this.loadClasses(),
      error: () => alert('Erro ao deletar aula.')
    });
  }
}
