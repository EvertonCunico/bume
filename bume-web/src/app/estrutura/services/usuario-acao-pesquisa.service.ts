import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { PesquisaAPIService } from '@boom/services/api/pesquisa-api.service';
import { UsuarioAcao } from 'src/app/autenticacao/modelos/usuario-acao';

@Injectable()
export class UsuarioAcaoPesquisaService extends PesquisaAPIService<UsuarioAcao> {
    override urlBase = 'usuario/acao';

    constructor(protected override httpClient: HttpClient) {
        super(httpClient);
    }
}
