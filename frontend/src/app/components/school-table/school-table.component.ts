import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolsService, School } from '../../services/SchoolsService';
import { Auth, User } from '../../services/auth';

@Component({
  selector: 'app-school-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './school-table.component.html',
  styleUrls: ['./school-table.component.scss']
})
export class SchoolTableComponent implements OnInit {
  schools: School[] = [];

  constructor(private schoolsService: SchoolsService, private auth: Auth) {}

  ngOnInit(): void {
    this.auth.currentUser$.subscribe({
      next: (user: User | null) => {
        if (user) this.loadSchools();
      },
      error: (err) => console.error('Erro ao obter usuário logado:', err)
    });
  }

  loadSchools() {
    this.schoolsService.getAllSchools().subscribe({
      next: (schools) => {
        this.schools = schools;
      },
      error: (err) => console.error('Erro ao carregar escolas:', err)
    });
  }

  openSettings(school: School) {
    console.log('Abrir configurações da escola:', school);
  }

deleteSchool(school: School) {
  if (!confirm(`Deseja realmente excluir a escola "${school.name}"?`)) {
    return;
  }

  this.schoolsService.deleteSchool(school.id).subscribe({
    next: () => {
      this.schools = this.schools.filter(s => s.id !== school.id);
    },
    error: (err) => {
      alert('Erro ao deletar escola. Tente novamente.');
    }
  });
}

}
