import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OficinaRowComponent } from '../oficina-row/oficina-row.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

interface Oficina {
  codigo: string;
  nome: string;
  aulas: string;
}

@Component({
  selector: 'app-oficina-table',
  standalone: true,
  imports: [CommonModule, OficinaRowComponent, ConfirmDialogComponent],
  templateUrl: './oficina-table.component.html',
  styleUrls: ['./oficina-table.component.scss']
})
export class OficinaTableComponent {
  oficinas: Oficina[] = [
    { codigo: 'A-2504170', nome: 'Robótica-2025.2', aulas: '5/16' },
    { codigo: 'A-2504171', nome: 'Informática-2025.1', aulas: '2/14' }
  ];
  dialogVisivel = false;
  oficinaSelecionada?: Oficina;

  abrirConfirmacao(oficina: Oficina) {
    this.oficinaSelecionada = oficina;
    this.dialogVisivel = true;
  }

  confirmarExclusao() {
    if (this.oficinaSelecionada) {
      this.oficinas = this.oficinas.filter(o => o !== this.oficinaSelecionada);
      this.oficinaSelecionada = undefined;
    }
  }

  cancelarExclusao() {
    this.oficinaSelecionada = undefined;
  }
}