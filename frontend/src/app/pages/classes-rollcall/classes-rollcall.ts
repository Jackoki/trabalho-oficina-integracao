import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassesRollcallTableComponent } from '../../components/classes-rollcall-table/classes-rollcall-table.component';

@Component({
  selector: 'app-classes-rollcall',
  standalone: true,
  imports: [CommonModule, ClassesRollcallTableComponent],
  templateUrl: './classes-rollcall.html',
  styleUrls: ['./classes-rollcall.scss']
})

export class ClassesRollcallPage implements OnInit {
  classId?: number;
  workshopId!: number;
  isNew = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.workshopId = Number(this.route.snapshot.paramMap.get('workshopId'));
    const classIdParam = this.route.snapshot.paramMap.get('classId');
    this.isNew = this.route.snapshot.queryParamMap.get('new') === 'true';
    this.classId = classIdParam ? Number(classIdParam) : undefined;
  }
}
