import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  @Input() titulo: string = 'Confirmação';
  @Input() mensagem: string = 'Tem certeza que deseja continuar?';
  @Input() visivel: boolean = false;

  @Output() confirmar = new EventEmitter<void>();
  @Output() cancelar = new EventEmitter<void>();

  onConfirmar() {
    this.confirmar.emit();
    this.visivel = false;
  }

  onCancelar() {
    this.cancelar.emit();
    this.visivel = false;
  }
}
