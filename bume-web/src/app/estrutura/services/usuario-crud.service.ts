import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {of, Observable} from 'rxjs';
import {CRUDAPIService} from '@boom/services/api/crud-api.service';
import { Usuario } from 'src/app/autenticacao/modelos/usuario';
import { AlterarSenha } from '@boom/modelos/alterar_senha';
import { AlteracaoSenhaAdmin } from '@boom/modelos/alteracao_senha_admin';
import { environment } from 'src/environments/environment';

@Injectable()
export class UsuarioCRUDService extends CRUDAPIService<Usuario> {
    override urlBase = 'usuario';

    constructor(protected override httpClient: HttpClient) {
        super(httpClient);
    }

    override novo(args?: any): Observable<Usuario> {
        return of({} as Usuario);
    }

    override put(registro: Usuario): Observable<Usuario> {
        let object: any;
        object = registro;
        return super.put(object);
    }

    override post(registro: Usuario): Observable<Usuario> {
        let object: any;
        object = registro;
        return super.post(object);
    }

    alterarSenha(alterarSenha: AlterarSenha): Observable<string> {
        const url = `${environment.api}/${this.urlBase}/altera-senha`;
        return this.httpClient.put<string>(url, alterarSenha);
    }

    alterarSenhaAdmin(alteracaoSenhaAdmin: AlteracaoSenhaAdmin): Observable<string> {
        const url = `${environment.api}/${this.urlBase}/altera/senha/admin`;
        return this.httpClient.put<string>(url, alteracaoSenhaAdmin);
    }
}
