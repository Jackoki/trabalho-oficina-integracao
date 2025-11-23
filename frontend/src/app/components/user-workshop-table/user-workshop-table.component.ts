import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../services/UsersService';
import { WorkshopsService } from '../../services/WorkshopsService';
import { Auth } from '../../services/auth';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-workshop-table',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-workshop-table.component.html',
  styleUrls: ['./user-workshop-table.component.scss']
})
export class UserWorkshopTableComponent implements OnInit, OnChanges {
  @Input() title!: string;
  @Input() typeId!: number;
  @Input() workshopId!: number;

  loading: boolean = true;
  users: User[] = [];

  constructor(private workshopService: WorkshopsService, private auth: Auth, private router: Router) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['workshopId'] || changes['typeId']) {
      if (this.workshopId != null && this.typeId != null) {
        this.loadUsers();
      }
    }
  }

  loadUsers() {
    this.loading = true;
    this.workshopService.getUsersWorkshops(this.workshopId, this.typeId).subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }
}
