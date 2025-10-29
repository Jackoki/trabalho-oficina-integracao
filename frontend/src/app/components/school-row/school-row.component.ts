import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolTable } from '../../models/school.model';

@Component({
  selector: 'app-school-row',
  standalone: true,
  imports: [CommonModule],
  template: `
    <tr>
      <td>{{ school.name }}</td>
    </tr>
  `
})
export class SchoolRowComponent {
  @Input() school!: SchoolTable;
}
