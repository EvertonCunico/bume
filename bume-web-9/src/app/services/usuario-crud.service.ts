import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {of, Observable} from 'rxjs';
import {CRUDAPIService} from '@boom/services/api/crud-api.service';
import {Usuario} from 'app/modelos/usuario';
import {AlterarSenha} from '../modelos/alterar_senha';
import {environment} from '../../environments/environment';
import {AlteracaoSenhaAdmin} from '../modelos/alteracao_senha_admin';

@Injectable()
export class UsuarioCRUDService extends CRUDAPIService<Usuario> {
    urlBase = 'usuario';

    constructor(protected httpClient: HttpClient) {
        super(httpClient);
    }

    novo(args?: any): Observable<Usuario> {
        return of({} as Usuario);
    }

    put(registro: Usuario): Observable<Usuario> {
        let object: any;
        object = registro;
        return super.put(object);
    }

    post(registro: Usuario): Observable<Usuario> {
        let object: any;
        object = registro;
        return super.post(object);
    }

    alterarSenha(alterarSenha: AlterarSenha): Observable<string> {
        const url = `${environment.api}/${this.urlBase}/altera-senha`;
        return this.httpClient.put<string>(url, alterarSenha);
    }

    alterarSenhaAdmin(alteracaoSenhaAdmin: AlteracaoSenhaAdmin): Observable<string> {
        const url = `${environment.api}/${this.urlBase}/altera-senha-admin`;
        return this.httpClient.put<string>(url, alteracaoSenhaAdmin);
    }
}