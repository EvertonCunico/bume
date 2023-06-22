import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PesquisaAPIService } from '@boom/services/api/pesquisa-api.service';
import { Usuario } from '../modelos/usuario';
import { environment } from 'environments/environment';
import { flatMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class UsuarioPesquisaService extends PesquisaAPIService<Usuario> {
  urlBase = 'usuario';

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  pesquisarRelatorio(valor:any, estabelecimento:any, nome:any, cpf:any, grupo:any) {
    const url = `${environment.api}/` + this.urlBase + `/pesquisaRelatorio`;

    const options = {
      params: new HttpParams()
    };
    if (valor) {
        options.params = options.params.set('valor', '' + valor);
    }
    if(estabelecimento){
        options.params = options.params.set('estabelecimento', '' + estabelecimento);
    }
    if (nome) {
        options.params = options.params.set('nome', '' + nome);
    }
    if (cpf) {
        options.params = options.params.set('cpf', '' + cpf);
    }
    if (grupo) {
        options.params = options.params.set('grupo', '' + grupo);
    }
    return this.httpClient.get<any>(url, options).pipe(
    flatMap(
        result => {
            return of(result);
        }
    ));
  }
}