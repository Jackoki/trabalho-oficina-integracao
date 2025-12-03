import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent {
  @Input() visivel: boolean = false;
  @Input() titulo: string = 'Alerta';
  @Input() mensagem: string = '';
  @Input() tipo: 'success' | 'error' | 'warning' = 'error'; // para mudar o tema

  @Output() fechar = new EventEmitter<void>();

  fecharAlerta() {
    this.visivel = false;
    this.fechar.emit();
  }
}
