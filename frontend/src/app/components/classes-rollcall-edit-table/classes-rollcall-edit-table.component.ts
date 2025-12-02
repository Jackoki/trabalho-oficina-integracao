import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkshopsService, User } from '../../services/WorkshopsService';
import { RollCallService, RollCallRequest } from '../../services/RollCallService';
import { FrequenciesService } from '../../services/FrequenciesService';

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
  imports: [CommonModule, FormsModule],
  templateUrl: './classes-rollcall-edit-table.component.html',
  styleUrls: ['./classes-rollcall-edit-table.component.scss']
})

export class ClassesRollcallEditTableComponent implements OnInit, OnChanges {

  @Input() classId!: number;
  @Input() workshopId!: number;

  rows: RollCallRow[] = [];
  loading = true;

  constructor(
    private workshopsService: WorkshopsService,
    private rollCallService: RollCallService,
    private frequenciesService: FrequenciesService
  ) {}

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
        }});
     }}
    );
  }

  save() {
    const request: RollCallRequest[] = this.rows.map(r => ({
      userId: r.userId,
      isPresent: r.isPresent
    }));

    this.rollCallService.saveRollCall(this.classId, request).subscribe({
      next: () => {
        alert('Chamada salva com sucesso!');

        this.frequenciesService.recalculateWorkshopFrequency(this.workshopId).subscribe();
      },
      error: () => alert('Erro ao salvar chamada')
    });
  }
}
