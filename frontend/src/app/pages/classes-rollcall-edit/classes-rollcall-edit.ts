import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ClassesRollcallEditTableComponent } from '../../components/classes-rollcall-edit-table/classes-rollcall-edit-table.component';

@Component({
  selector: 'app-classes-rollcall-edit',
  standalone: true,
  imports: [CommonModule, ClassesRollcallEditTableComponent],
  templateUrl: './classes-rollcall-edit.html',
  styleUrls: ['./classes-rollcall-edit.scss']
})

export class ClassesRollcallEdit implements OnInit {
  classId!: number;
  workshopId!: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.workshopId = Number(this.route.snapshot.paramMap.get('workshopId'));
    this.classId = Number(this.route.snapshot.paramMap.get('classId'));
  }
}
