import { Component, Input } from '@angular/core';
import { StatusLote } from '../../models/lote.model';

const STATUS_CONFIG: Record<StatusLote, { label: string; classes: string }> = {
  PENDENTE:  { label: 'Pendente',  classes: 'badge text-bg-warning' },
  EXPORTADO: { label: 'Exportado', classes: 'badge text-bg-success' },
  REJEITADO: { label: 'Rejeitado', classes: 'badge text-bg-danger'  },
};

@Component({
  selector: 'app-status-badge',
  standalone: true,
  template: `<span [class]="config.classes">{{ config.label }}</span>`,
})
export class StatusBadgeComponent {
  @Input({ required: true }) status!: StatusLote;

  get config() {
    return STATUS_CONFIG[this.status];
  }
}
