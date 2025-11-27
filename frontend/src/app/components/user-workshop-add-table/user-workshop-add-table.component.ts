import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WorkshopsService } from '../../services/WorkshopsService';

@Component({
  selector: 'app-user-workshop-add-table',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-workshop-add-table.component.html',
  styleUrls: ['./user-workshop-add-table.component.scss']
})

export class UserWorkshopAddTableComponent implements OnInit, OnChanges {

  @Input() title!: string;
  @Input() typeId!: number;
  @Input() workshopId!: number;

  paginatedUsers: any[] = [];
  pageSize = 10;
  currentPage = 0;
  totalPages = 0;

  loading = true;

  constructor(private workshopService: WorkshopsService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['workshopId'] || changes['typeId']) {
      if (this.workshopId && this.typeId) {
        this.currentPage = 0;
        this.loadUsers();
      }
    }
  }

  loadUsers() {
    this.loading = true;

    this.workshopService
      .getUsersNotLinked(this.workshopId, this.typeId, this.currentPage, this.pageSize)
      .subscribe({
        next: (page) => {
          this.paginatedUsers = page.content;
          this.totalPages = page.totalPages;
          this.currentPage = page.number;
          this.loading = false;
        },
        error: (err) => {
          console.error('Erro ao carregar usuários:', err);
          this.loading = false;
        }
      });
  }

  setPage(page: number) {
    if (page < 0 || page >= this.totalPages) return;
    this.currentPage = page;
    this.loadUsers();
  }

  vincularUsuario(userId: number) {
    this.workshopService.linkUserToWorkshop(this.workshopId, userId)
      .subscribe({
        next: () => {
          alert("✅ Usuário adicionado à oficina!");
          this.loadUsers(); // recarrega após vínculo ✅
        },
        error: err => {
          console.error("Erro ao vincular usuário:", err);
          alert("❌ Falha ao adicionar usuário.");
        }
    });
  }
}
