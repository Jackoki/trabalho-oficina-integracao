import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-oficina-row',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './oficina-row.component.html',
  styleUrls: ['./oficina-row.component.scss']
})
export class OficinaRowComponent {
  @Input() oficina: any;
}