import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkshopsService, User } from '../../services/WorkshopsService';
import { RollCallService, RollCallRequest } from '../../services/RollCallService';
import { FrequenciesService } from '../../services/FrequenciesService';
import { Location } from '@angular/common';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';

export interface RollCallRow {
  userId: number;
  userName: string;
  userCode: string;
  isPresent: boolean;
  frequencyId?: number;
}

@Component({
  selector: 'app-classes-rollcall-edit-table',
  standalone: true,
  imports: [CommonModule, FormsModule, AlertDialogComponent],
  templateUrl: './classes-rollcall-edit-table.component.html',
  styleUrls: ['./classes-rollcall-edit-table.component.scss']
})
export class ClassesRollcallEditTableComponent implements OnInit, OnChanges {

  @Input() classId!: number;
  @Input() workshopId!: number;

  rows: RollCallRow[] = [];
  loading = true;

  alertVisivel = false;
  alertMensagem = '';
  alertTitulo = '';
  alertTipo: 'success' | 'error' | 'warning' = 'error';

  constructor(
    private workshopsService: WorkshopsService,
    private rollCallService: RollCallService,
    private frequenciesService: FrequenciesService,
    private location: Location
  ) {}

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

  ngOnInit(): void {
    this.loadData();
  }

  ngOnChanges(): void {
    this.loadData();
  }

  private loadData() {
    if (!this.classId || !this.workshopId) return;

    this.loading = true;

    this.frequenciesService.getFrequenciesByClass(this.classId).subscribe({
      next: (freqs) => {

        const frequencies = (freqs ?? []).map(f => ({
          id: f.id,
          isPresent: f.isPresent,
          userId: f.user.id
        }));

        this.workshopsService.getUsersWorkshops(this.workshopId, 2, 0, 100).subscribe({
          next: (page: { content: User[] }) => {
            const students = page.content ?? [];

            this.rows = students.map(s => {
              const f = frequencies.find(fr => fr.userId === s.id);
              return {
                userId: s.id,
                userName: s.name,
                userCode: s.code,
                isPresent: f?.isPresent ?? false,
                frequencyId: f?.id
              };
            });

            this.loading = false;
          },
          error: () => {
            this.loading = false;
            this.mostrarErro('Erro ao carregar alunos da oficina.');
          }
        });

      },
      error: () => {
        this.loading = false;
        this.mostrarErro('Erro ao carregar frequências desta aula.');
      }
    });
  }

  save() {
    const request: RollCallRequest[] = this.rows.map(r => ({
      userId: r.userId,
      isPresent: r.isPresent
    }));

    this.rollCallService.saveRollCall(this.classId, request).subscribe({
      next: () => {
        this.mostrarSucesso('Chamada salva com sucesso!');

        this.frequenciesService.recalculateWorkshopFrequency(this.workshopId).subscribe();
        
        setTimeout(() => {
          this.location.back();
        }, 3000);
      },
      error: () => {
        this.mostrarErro('Erro ao salvar chamada.');
      }
    });
  }

  goBack() {
    this.location.back();
  }
}
