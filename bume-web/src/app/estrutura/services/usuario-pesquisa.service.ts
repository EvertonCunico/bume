import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PesquisaAPIService } from '@boom/services/api/pesquisa-api.service';
import { flatMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Usuario } from 'src/app/autenticacao/modelos/usuario';
import { environment } from 'src/environments/environment';

@Injectable()
export class UsuarioPesquisaService extends PesquisaAPIService<Usuario> {
  override urlBase = 'usuario';

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
  }

  pesquisarRelatorio(valor:any, nome:any, cpf:any) {
    const url = `${environment.api}/` + this.urlBase + `/pesquisaRelatorio`;

    const options = {
      params: new HttpParams()
    };
    if (valor) {
        options.params = options.params.set('valor', '' + valor);
    }
    if (nome) {
        options.params = options.params.set('nome', '' + nome);
    }
    if (cpf) {
        options.params = options.params.set('cpf', '' + cpf);
    }
    return this.httpClient.get<any>(url, options).pipe(
    flatMap(
        result => {
            return of(result);
        }
    ));
  }
}
