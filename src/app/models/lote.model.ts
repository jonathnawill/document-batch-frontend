export type StatusLote = 'PENDENTE' | 'EXPORTADO' | 'REJEITADO';

export interface CriarDocumentoRequest {
  tipo: string;
  nome: string;
}

export interface CriarLoteRequest {
  operador: string;
  processo: string;
  documentos: CriarDocumentoRequest[];
}

export interface Documento {
  id: number;
  tipo: string;
  nome: string;
}

export interface Lote {
  id: number;
  operador: string;
  processo: string;
  status: StatusLote;
  dataCriacao: string;
  documentos: Documento[];
}

export interface PagedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}
