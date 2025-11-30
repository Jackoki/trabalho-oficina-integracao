import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ClassesTableComponent } from '../../components/classes-table/classes-table.component';

@Component({
  selector: 'app-classes-page',
  standalone: true,
  imports: [CommonModule, ClassesTableComponent],
  templateUrl: './classes.html',
  styleUrls: ['./classes.scss']
})

export class ClassesPage implements OnInit {
  workshopId!: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.workshopId = Number(this.route.snapshot.paramMap.get('id'));
  }
}
