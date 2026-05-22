import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CriarLoteRequest, Lote, PagedResponse, StatusLote } from '../models/lote.model';

const API_URL = 'http://localhost:8080/api';

@Injectable({ providedIn: 'root' })
export class LoteService {

  constructor(private http: HttpClient) {}

  listar(status?: StatusLote, page = 0, size = 10): Observable<PagedResponse<Lote>> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size);

    if (status) {
      params = params.set('status', status);
    }

    return this.http.get<PagedResponse<Lote>>(`${API_URL}/lotes`, { params });
  }

  criar(request: CriarLoteRequest): Observable<Lote> {
    return this.http.post<Lote>(`${API_URL}/lotes`, request);
  }

  atualizarStatus(id: number, status: StatusLote): Observable<Lote> {
    return this.http.patch<Lote>(`${API_URL}/lotes/${id}/status`, { status });
  }
}
