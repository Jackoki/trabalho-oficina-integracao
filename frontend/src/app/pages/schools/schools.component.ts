import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolTableComponent } from '../../components/school-table/school-table.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SchoolTableComponent],
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.scss']
})

export class SchoolComponent {}