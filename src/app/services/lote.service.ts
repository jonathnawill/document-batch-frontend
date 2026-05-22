import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CriarLoteRequest, Lote, PagedResponse, StatusLote } from '../models/lote.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LoteService {

  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  listar(status?: StatusLote, operador?: string, page = 0, size = 10): Observable<PagedResponse<Lote>> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size);

    if (status) params = params.set('status', status);
    if (operador) params = params.set('operador', operador);

    return this.http.get<PagedResponse<Lote>>(`${this.apiUrl}/lotes`, { params });
  }

  criar(request: CriarLoteRequest): Observable<Lote> {
    return this.http.post<Lote>(`${this.apiUrl}/lotes`, request);
  }

  atualizarStatus(id: number, status: StatusLote): Observable<Lote> {
    return this.http.patch<Lote>(`${this.apiUrl}/lotes/${id}/status`, { status });
  }
}
