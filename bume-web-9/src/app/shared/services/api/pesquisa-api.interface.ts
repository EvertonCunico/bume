import { Observable } from 'rxjs';

import { Modelo } from '@boom/modelos/modelo';
import { ResultadoPesquisa } from '@boom/modelos/resultado-pesquisa';
import { RequisicaoPesquisa } from '@boom/modelos/requisicao-pesquisa';

export interface PesquisaAPIInterface<T extends Modelo> {

    urlBase: string;

    pesquisar(requisicao: RequisicaoPesquisa): Observable<ResultadoPesquisa<T>>;

}
