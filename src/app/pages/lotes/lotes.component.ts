import { Component, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { LoteService } from '../../services/lote.service';
import { Lote, StatusLote } from '../../models/lote.model';
import { StatusBadgeComponent } from '../../components/status-badge/status-badge.component';
import { StatusModalComponent } from '../../components/status-modal/status-modal.component';
import { CriarLoteModalComponent } from '../../components/criar-lote-modal/criar-lote-modal.component';

@Component({
  selector: 'app-lotes',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe, StatusBadgeComponent, StatusModalComponent, CriarLoteModalComponent],
  templateUrl: './lotes.component.html',
  styleUrl: './lotes.component.scss',
})
export class LotesComponent implements OnInit {
  lotes = signal<Lote[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  totalPages = signal(0);
  currentPage = signal(0);
  loteSelecionado = signal<Lote | null>(null);
  modalCriarAberto = signal(false);

  readonly pageSize = 10;

  statusFiltro = new FormControl<StatusLote | ''>('');
  operadorFiltro = new FormControl('');

  readonly opcoesStatus: { value: StatusLote | ''; label: string }[] = [
    { value: '', label: 'Todos' },
    { value: 'PENDENTE', label: 'Pendente' },
    { value: 'EXPORTADO', label: 'Exportado' },
    { value: 'REJEITADO', label: 'Rejeitado' },
  ];

  constructor(private loteService: LoteService) {}

  ngOnInit(): void {
    this.carregarLotes();

    this.statusFiltro.valueChanges.subscribe(() => {
      this.currentPage.set(0);
      this.carregarLotes();
    });

    this.operadorFiltro.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
    ).subscribe(() => {
      this.currentPage.set(0);
      this.carregarLotes();
    });
  }

  carregarLotes(): void {
    this.loading.set(true);
    this.error.set(null);

    const status = this.statusFiltro.value || undefined;
    const operador = this.operadorFiltro.value || undefined;

    this.loteService.listar(status as StatusLote | undefined, operador, this.currentPage(), this.pageSize).subscribe({
      next: (response) => {
        this.lotes.set(response.content);
        this.totalPages.set(response.totalPages);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Erro ao carregar os lotes. Verifique se o servidor está rodando.');
        this.loading.set(false);
      },
    });
  }

  abrirModalCriar(): void {
    this.modalCriarAberto.set(true);
  }

  fecharModalCriar(): void {
    this.modalCriarAberto.set(false);
  }

  onLoteCriado(): void {
    this.fecharModalCriar();
    this.currentPage.set(0);
    this.carregarLotes();
  }

  abrirModal(lote: Lote): void {
    this.loteSelecionado.set(lote);
  }

  fecharModal(): void {
    this.loteSelecionado.set(null);
  }

  salvarStatus(novoStatus: StatusLote): void {
    const lote = this.loteSelecionado();
    if (!lote) return;

    this.loteService.atualizarStatus(lote.id, novoStatus).subscribe({
      next: () => {
        this.fecharModal();
        this.carregarLotes();
      },
      error: (err) => {
        const mensagem = err.error?.message ?? 'Erro ao atualizar o status.';
        this.error.set(mensagem);
        this.fecharModal();
      },
    });
  }

  irParaPagina(pagina: number): void {
    this.currentPage.set(pagina);
    this.carregarLotes();
  }

  get paginas(): number[] {
    return Array.from({ length: this.totalPages() }, (_, i) => i);
  }
}
