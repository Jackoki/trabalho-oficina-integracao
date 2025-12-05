import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { UserWorkshopAddTableComponent } from '../../components/user-workshop-add-table/user-workshop-add-table.component';

@Component({
  selector: 'app-users-workshop-add',
  standalone: true,
  imports: [CommonModule, RouterModule, UserWorkshopAddTableComponent],
  templateUrl: './users-workshop-add.html',
  styleUrls: ['./users-workshop-add.scss']
})

export class UsersWorkshopAdd implements OnInit {
  workshopId!: number;
  typeId!: number;
  typeName!: string;

  constructor(private route: ActivatedRoute, private location: Location) {}

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.workshopId = Number(params['id']);
    this.typeId = Number(params['typeId']);

    this.typeName = this.typeId === 2 ? 'Alunos' :
                    this.typeId === 3 ? 'Professores' :
                    this.typeId === 4 ? 'Tutores' : 'Usuários';
  }

  goBack() {
    this.location.back();
  }
}
