import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OficinaTabela } from '../../models/oficina.model';

@Component({
  selector: 'app-oficina-row',
  standalone: true,
  imports: [CommonModule],
  template: `
    <tr>
      <td>{{ oficina.codigo }}</td>
      <td>{{ oficina.nome }}</td>
      <td>{{ oficina.aulas }}</td>
      <td class="icons">
        <i class="fa fa-users"></i>
        <i class="fa fa-check-circle"></i>
        <i class="fa fa-cog"></i>
      </td>
    </tr>
  `
})
export class OficinaRowComponent {
  @Input() oficina!: OficinaTabela;
}
