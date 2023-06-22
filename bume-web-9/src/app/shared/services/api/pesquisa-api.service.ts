import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { environment } from 'environments/environment';
import { Modelo } from '@boom/modelos/modelo';
import { PesquisaAPIInterface } from './pesquisa-api.interface';
import { ResultadoPesquisa } from '@boom/modelos/resultado-pesquisa';
import { RequisicaoPesquisa } from '@boom/modelos/requisicao-pesquisa';
import { flatMap } from 'rxjs/operators';
import * as moment from 'moment';
import {DecryptionComponent} from "../../utils/decryption.component";

export class PesquisaAPIService<T extends Modelo> implements PesquisaAPIInterface<T> {

    urlBase: string;

    resultadoPesquisaCache: ResultadoPesquisa<T>;

    regexDataPadraoAngular = /^[A-Z][a-z]{2}\s[A-Z][a-z]{2}\s\d{2}\s\d{4}\s\d{2}:\d{2}:\d{2}\sGMT[-+]\d{4}\s\(.+\)$/;

    constructor(protected httpClient: HttpClient) { }

    pesquisar(requisicao: RequisicaoPesquisa): Observable<ResultadoPesquisa<T>> {
        const url = `${environment.api}/${ requisicao.url ? requisicao.url : this.urlBase + '/pesquisa' }`;
        return this.httpClient.post<ResultadoPesquisa<T>>(url, requisicao).pipe(
            flatMap(
                result => {
                    result = DecryptionComponent.decryptData(result);
                    if (result.data || result.pageSize) {
                        return of(result);
                    } else {
                        const resultadoPesquisa = {
                            data: result,
                            pageNumber: 1,
                            totalRows: result instanceof Array ? result.length : 0,
                            pageSize: result instanceof Array ? result.length : 0
                        } as ResultadoPesquisa<T>;
                        return of(resultadoPesquisa);
                    }
                }
            )
        );
    }

    estatisticas(requisicao: RequisicaoPesquisa): Observable<any> {
        const url = `${environment.api}/${ requisicao.url ? requisicao.url : this.urlBase + '/estatisticas' }`;
        const options = {
            params: new HttpParams()
        };
        if (requisicao.pagina) {
            options.params = options.params.set('pagina', '' + requisicao.pagina);
        }
        if (requisicao.valor) {
            options.params = options.params.set('valor', '' + requisicao.valor);
        }
        if (requisicao.filtro) {
            Object.keys(requisicao.filtro).forEach(
                key => {
                    if (requisicao.filtro[key] || requisicao.filtro[key] === 0) {
                        if (requisicao.filtro[key].id) {
                            options.params = options.params.set(key, requisicao.filtro[key].id);
                        } else {
                            options.params = options.params.set(key, requisicao.filtro[key]);
                        }
                    }
                }
            );
        }
        return this.httpClient.get<any>(url, options);
    }

    transformarDataPadraoAngularParaLocalDateTime(obj: any) {
        if (this.regexDataPadraoAngular.test(obj)) {
            const momentObj = moment(obj);
            if (momentObj.format('HH:mm:ss') !== '00:00:00') {
                obj = momentObj.format('YYYY-MM-DDTHH:mm:ss');
            } else {
                obj = momentObj.format('YYYY-MM-DD');
            }
        } else if (Array.isArray(obj)) {
            obj.forEach(item => this.transformarDataPadraoAngularParaLocalDateTime(item));
        } else if (typeof obj === 'object' && obj !== null) {
            Object.keys(obj).forEach(key => {
                obj[key] = this.transformarDataPadraoAngularParaLocalDateTime(obj[key]);
            });
        }
        return obj;
    }
}
