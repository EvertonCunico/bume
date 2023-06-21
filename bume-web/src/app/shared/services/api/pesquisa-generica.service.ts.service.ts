import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Modelo } from '@boom/modelos/modelo';
import { ResultadoPesquisa } from '@boom/modelos/resultado-pesquisa';
import { PesquisaAPIService } from './pesquisa-api.service';
import { RequisicaoPesquisa } from '@boom/modelos/requisicao-pesquisa';

@Injectable({
  providedIn: 'root'
})
export class PesquisaGenericaService<T extends Modelo> extends PesquisaAPIService<T> {

  override urlBase: string = '';

  constructor(override httpClient: HttpClient) {
    super(httpClient);
  }

  override pesquisar(requisicao: RequisicaoPesquisa): Observable<ResultadoPesquisa<T>> {
    return super.pesquisar(requisicao);
  }
}
