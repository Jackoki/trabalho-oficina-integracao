import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ClassesRollcallTableComponent } from '../../components/classes-rollcall-table/classes-rollcall-table.component';

@Component({
  selector: 'app-classes-rollcall',
  standalone: true,
  imports: [CommonModule, ClassesRollcallTableComponent],
  templateUrl: './classes-rollcall.html',
  styleUrls: ['./classes-rollcall.scss']
})

export class ClassesRollcallPage implements OnInit {
  classId!: number;
  workshopId!: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.classId = Number(this.route.snapshot.paramMap.get('classId'));
    this.workshopId = Number(this.route.snapshot.paramMap.get('workshopId'));
  }
}
