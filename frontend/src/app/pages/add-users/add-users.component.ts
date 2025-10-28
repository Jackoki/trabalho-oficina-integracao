import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent {
  usuarios = [
    { nome: 'Luis Augusto', codigo: 'T-03092025', selecionado: false }
  ];

  constructor(private router: Router) {}

  voltar() {
    this.router.navigate(['/']);
  }

  confirmar() {
    const selecionados = this.usuarios.filter(u => u.selecionado);
    console.log('Usuários confirmados:', selecionados);
    this.router.navigate(['/']);
  }
}
