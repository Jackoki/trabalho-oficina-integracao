import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { OficinaTableComponent } from '../../components/oficina-table/oficina-table.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, OficinaTableComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {}