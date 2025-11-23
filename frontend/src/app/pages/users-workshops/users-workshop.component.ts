import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UserWorkshopTableComponent } from '../../components/user-workshop-table/user-workshop-table.component';

@Component({
  selector: 'app-users-workshop',
  standalone: true,
  imports: [CommonModule, UserWorkshopTableComponent],
  templateUrl: './users-workshop.component.html',
  styleUrls: ['./users-workshop.component.scss']
})

export class UserWorkshopComponent implements OnInit {
  workshopId!: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.workshopId = Number(this.route.snapshot.paramMap.get('id'));
    console.log("Workshop carregado:", this.workshopId);
  }
}
