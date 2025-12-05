import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkshopsService, User } from '../../services/WorkshopsService';
import { RollCallService, RollCallRequest } from '../../services/RollCallService';
import { ClassesService } from '../../services/ClassesService';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';

export interface RollCallForm {
  userId: number;
  isPresent: boolean;
}

@Component({
  selector: 'app-classes-rollcall-table',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, AlertDialogComponent],
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

  alertVisivel = false;
  alertMensagem = '';
  alertTitulo = '';
  alertTipo: 'success' | 'error' | 'warning' = 'error';

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

  constructor(
    private workshopsService: WorkshopsService,
    private rollCallService: RollCallService,
    private classesService: ClassesService,
    private location: Location
  ) {}

  ngOnInit(): void {
    if (!this.isNew && !this.classId) return;
    this.loadStudents();
  }

  goBack() {
    this.location.back();
  }

  loadStudents() {
    this.loading = true;

    this.workshopsService.getUsersWorkshops(this.workshopId, 2, 0, 100).subscribe({
      next: (page: { content: User[] }) => {
        this.students = page.content ?? [];

        this.rollCallForms = this.students.map(s => ({
          userId: s.id,
          isPresent: false
        }));

        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar alunos:', err);
        this.mostrarErro('Erro ao carregar lista de alunos.');
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
        error: () => this.mostrarErro('Erro ao criar a aula.')
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
      next: () => {
        this.mostrarSucesso('Chamada salva com sucesso!');

        setTimeout(() => {
          this.location.back();
        }, 3000);
      },
      error: (err) => {
        console.error('Erro ao salvar chamada:', err);
        this.mostrarErro('Erro ao salvar chamada.');
      }
    });
  }
}
