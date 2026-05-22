import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Lote, StatusLote } from '../../models/lote.model';

@Component({
  selector: 'app-status-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './status-modal.component.html',
  styleUrl: './status-modal.component.scss',
})
export class StatusModalComponent implements OnChanges {
  @Input() lote: Lote | null = null;
  @Output() statusAlterado = new EventEmitter<StatusLote>();
  @Output() fechado = new EventEmitter<void>();

  statusControl = new FormControl<StatusLote>('PENDENTE', { nonNullable: true });

  readonly opcoes: { value: StatusLote; label: string }[] = [
    { value: 'PENDENTE', label: 'Pendente' },
    { value: 'EXPORTADO', label: 'Exportado' },
    { value: 'REJEITADO', label: 'Rejeitado' },
  ];

  ngOnChanges(): void {
    if (this.lote) {
      this.statusControl.setValue(this.lote.status);
    }
  }

  confirmar(): void {
    this.statusAlterado.emit(this.statusControl.value);
  }

  fechar(): void {
    this.fechado.emit();
  }
}
