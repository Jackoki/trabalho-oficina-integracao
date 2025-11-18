import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface School {
  id: number;
  name: string;
}

interface UserType {
  id: number;
  name: string;
}

interface User {
  id: number;
  name: string;
  code: string;
  userType: UserType;
  school: School;
}

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.scss']
})

export class EditUserComponent implements OnInit {
  userId: number | null = null;

  userData = {
    name: '',
    code: '',
    userTypeId: null as number | null,
    schoolId: null as number | null
  };

  userTypes: UserType[] = [];
  schools: School[] = [];
  isLoading = false;
  formSubmitted = false;
  errorMsg = '';
  successMsg = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadUserTypes();
    this.loadSchools();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.userId = +id;
        this.loadUser(this.userId);
      }
    });
  }

  loadUser(id: number): void {
    this.http.get<User>(`http://localhost:8080/users/${id}`, { withCredentials: true }).subscribe({
      next: (user) => {
        this.userData.name = user.name;
        this.userData.code = user.code;
        this.userData.userTypeId = user.userType?.id || null;
        this.userData.schoolId = user.school?.id || null;
      },
      error: (err) => {
        console.error('Erro ao carregar usuário:', err);
        this.errorMsg = 'Erro ao carregar dados do usuário.';
      }
    });
  }

  loadUserTypes(): void {
    this.http.get<UserType[]>('http://localhost:8080/usertype', { withCredentials: true }).subscribe({
      next: (data) => this.userTypes = data,
      error: (err) => console.error('Erro ao carregar tipos de usuário:', err)
    });
  }

  loadSchools(): void {
    this.http.get<School[]>('http://localhost:8080/schools', { withCredentials: true }).subscribe({
      next: (data) => this.schools = data,
      error: (err) => console.error('Erro ao carregar escolas:', err)
    });
  }

  saveUser(): void {
    this.formSubmitted = true;

    if (!this.userData.name.trim() || !this.userData.code.trim() || !this.userData.userTypeId || !this.userData.schoolId) {
      this.errorMsg = 'Preencha todos os campos obrigatórios.';
      return;
    }

    this.isLoading = true;
    this.errorMsg = '';
    this.successMsg = '';

    const payload = {
      name: this.userData.name.trim(),
      code: this.userData.code.trim(),
      userType: { id: this.userData.userTypeId },
      school: { id: this.userData.schoolId }
    };

    this.http.put(`http://localhost:8080/users/${this.userId}`, payload, { withCredentials: true }).subscribe({
      next: () => {
        this.successMsg = 'Usuário atualizado com sucesso!';
        this.isLoading = false;
        setTimeout(() => this.router.navigate(['/users']), 1000);
      },
      error: (err) => {
        console.error(err);
        this.errorMsg = err.error?.message || 'Erro ao atualizar usuário.';
        this.isLoading = false;
      }
    });
  }

  voltar(): void {
    this.router.navigate(['/users']);
  }
}
