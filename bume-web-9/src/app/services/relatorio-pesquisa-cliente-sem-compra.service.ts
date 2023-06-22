import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PesquisaAPIService } from '@boom/services/api/pesquisa-api.service';
import { Usuario } from '../modelos/usuario';
import { environment } from 'environments/environment';
import { flatMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class RelatorioPesquisaClienteSemCompra extends PesquisaAPIService<Usuario> {

  urlBase = 'relatorio/usuario';

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  pesquisarRelatorioClienteSemCompras(nome:any, dataInicial:any, dataFinal:any) {
    const url = `${environment.api}/` + this.urlBase + `/pesquisaRelatorioSemCompras`;

    const options = {
      params: new HttpParams()
    };
    if (nome) {
        options.params = options.params.set('nome', '' + nome);
    }
    if (dataInicial) {
      options.params = options.params.set('dataInicial', '' + dataInicial);
    }
    if (dataFinal) {
      options.params = options.params.set('dataFinal', '' + dataFinal);
    }
    return this.httpClient.get<any>(url, options).pipe(
    flatMap(
        result => {
            return of(result);
        }
    ));
  }

}