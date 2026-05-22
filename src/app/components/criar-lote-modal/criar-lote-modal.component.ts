import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoteService } from '../../services/lote.service';

@Component({
  selector: 'app-criar-lote-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './criar-lote-modal.component.html',
  styleUrl: './criar-lote-modal.component.scss',
})
export class CriarLoteModalComponent {
  @Output() loteCriado = new EventEmitter<void>();
  @Output() fechado = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private loteService = inject(LoteService);

  enviando = false;
  erro: string | null = null;

  form = this.fb.group({
    operador: ['', Validators.required],
    processo: ['', Validators.required],
    documentos: this.fb.array([this.novoDocumento()]),
  });

  get documentos(): FormArray {
    return this.form.get('documentos') as FormArray;
  }

  get documentoGroups(): FormGroup[] {
    return this.documentos.controls as FormGroup[];
  }

  novoDocumento(): FormGroup {
    return this.fb.group({
      tipo: ['', Validators.required],
      nome: ['', Validators.required],
    });
  }

  adicionarDocumento(): void {
    this.documentos.push(this.novoDocumento());
  }

  removerDocumento(index: number): void {
    if (this.documentos.length > 1) {
      this.documentos.removeAt(index);
    }
  }

  confirmar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.enviando = true;
    this.erro = null;

    this.loteService.criar({
      operador: this.form.get('operador')?.value ?? '',
      processo: this.form.get('processo')?.value ?? '',
      documentos: this.documentoGroups.map((g) => ({
        tipo: g.get('tipo')?.value ?? '',
        nome: g.get('nome')?.value ?? '',
      })),
    }).subscribe({
      next: () => this.loteCriado.emit(),
      error: (err) => {
        this.erro = err.error?.message ?? 'Erro ao criar o lote.';
        this.enviando = false;
      },
    });
  }

  fechar(): void {
    this.fechado.emit();
  }
}
