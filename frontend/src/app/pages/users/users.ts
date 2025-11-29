import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTableComponent } from '../../components/user-table/user-table.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, UserTableComponent],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UserComponent {}