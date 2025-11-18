import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../services/auth';
import { SchoolTableComponent } from '../../components/school-table/school-table.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgIf, RouterModule, SchoolTableComponent],
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.scss']
})
export class SchoolComponent implements OnInit {
  isAdmin: boolean = false;

  constructor(private auth: Auth) {}

  ngOnInit(): void {
    this.auth.currentUser$.subscribe(user => {
      this.isAdmin = user?.userType?.id === 1;
    });
  }
}
