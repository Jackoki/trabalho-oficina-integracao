import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkshopsService, User } from '../../services/WorkshopsService';
import { RollCallService, RollCallRequest } from '../../services/RollCallService';
import { ClassesService } from '../../services/ClassesService'; // <-- Importar
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

export interface RollCallForm {
  userId: number;
  isPresent: boolean;
}

@Component({
  selector: 'app-classes-rollcall-table',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './classes-rollcall-table.component.html',
  styleUrls: ['./classes-rollcall-table.component.scss']
})

export class ClassesRollcallTableComponent implements OnInit {
  @Input() classId?: number;
  @Input() workshopId!: number;
  @Input() isNew = false;

  students: User[] = [];
  rollCallForms: RollCallForm[] = [];
  loading = true;

  constructor(
    private workshopsService: WorkshopsService,
    private rollCallService: RollCallService,
    private classesService: ClassesService
  ) {}

  ngOnInit(): void {
    if (!this.isNew && !this.classId) return; 
    this.loadStudents();
  }

  loadStudents() {
    this.loading = true;
    this.workshopsService.getUsersWorkshops(this.workshopId, 2, 0, 100).subscribe({
      next: (page: { content: User[] }) => {
        this.students = page.content;
        this.rollCallForms = this.students.map(s => ({
          userId: s.id,
          isPresent: false
        }));
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Erro ao carregar alunos:', err);
        this.loading = false;
      }
    });
  }

  togglePresence(userId: number, event: any) {
    const form = this.rollCallForms.find(f => f.userId === userId);
    if (form) form.isPresent = event.target.checked;
  }

  saveRollCall() {
    if (this.isNew) {
      this.classesService.createClass(this.workshopId).subscribe({
        next: (newClass: any) => {
          this.classId = newClass.id;
          this.isNew = false;
          this.savePresence();
        },
        error: () => alert('Erro ao criar a aula.')
      });
    } else {
      this.savePresence();
    }
  }

  private savePresence() {
    if (!this.classId) return;

    const request: RollCallRequest[] = this.rollCallForms.map(f => ({
      userId: f.userId,
      isPresent: f.isPresent
    }));

    this.rollCallService.saveRollCall(this.classId, request).subscribe({
      next: () => alert('Chamada salva com sucesso!'),
      error: (err) => {
        console.error('Erro ao salvar chamada:', err);
        alert('Erro ao salvar chamada');
      }
    });
  }
}
