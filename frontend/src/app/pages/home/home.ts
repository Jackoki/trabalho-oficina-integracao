import { Component } from '@angular/core';
import { WorkshopTableComponent } from '../../components/workshop-table/workshop-table.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [WorkshopTableComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent {}