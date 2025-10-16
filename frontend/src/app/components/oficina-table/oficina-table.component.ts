import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OficinaRowComponent } from '../oficina-row/oficina-row.component';

interface Oficina {
  codigo: string;
  nome: string;
  aulas: string;
}

@Component({
  selector: 'app-oficina-table',
  standalone: true,
  imports: [CommonModule, OficinaRowComponent],
  templateUrl: './oficina-table.component.html',
  styleUrls: ['./oficina-table.component.scss']
})
export class OficinaTableComponent {
  oficinas: Oficina[] = [
    { codigo: 'A-2504170', nome: 'Robótica-2025.2', aulas: '5/16' },
    { codigo: 'A-2504171', nome: 'Informática-2025.1', aulas: '2/14' }
  ];
}