import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkshopTable } from '../../models/workshop.model';

@Component({
  selector: 'app-workshop-row',
  standalone: true,
  imports: [CommonModule],
  template: `
    <tr>
      <td>{{ workshop.code }}</td>
      <td>{{ workshop.name }}</td>
      <td>{{ workshop.classes }}</td>
    </tr>
  `
})
export class WorkshopRowComponent {
  @Input() workshop!: WorkshopTable;
}
