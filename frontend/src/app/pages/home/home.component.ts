import { Component } from '@angular/core';
import { OficinaTableComponent } from '../../components/oficina-table/oficina-table.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [OficinaTableComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {}