import { Observable, of, throwError } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Modelo } from '@boom/modelos/modelo';
import { CrudAPIInterface } from './crud-api.interface';
import { environment } from 'environments/environment';
import * as moment from 'moment';

/**
 * Classe base para serviços de CRUD da API
 */
export class CRUDAPIService<T extends Modelo> implements CrudAPIInterface<T> {

    urlBase: string;
    regexDataPadraoAngular = /^[A-Z][a-z]{2}\s[A-Z][a-z]{2}\s\d{2}\s\d{4}\s\d{2}:\d{2}:\d{2}\sGMT[-+]\d{4}\s\(.+\)$/;

    constructor(protected httpClient: HttpClient) { }
    /**
     * Gerar um registro novo
     */
    novo(args?: any): Observable<T> {
        return of({} as T);
    }

    /**
     * Executa uma requisição de carga de registro na API
     */
    get(registroId: any): Observable<T> {
        const url = `${environment.api}/${this.urlBase}/${registroId}`;
        if (!registroId) {
            return throwError('É necessário informar o id do registro para atualizá-lo.');
        }
        return this.httpClient.get<T>(url);
    }

    /**
     * Executa uma requisição de inclusão de registro na API
     */
    post(registro: T): Observable<T> {
        this.transformarDataPadraoAngularParaLocalDateTime(registro);
        const url = `${environment.api}/${this.urlBase}`;
        return this.httpClient.post<T>(url, registro);
    }

    /**
     * Executa uma requisição de atualização de registro na API
     */
    put(registro: T): Observable<T> {
        /*
        if (!registro.id) {
            return throwError('É necessário informar o id do registro para atualizá-lo.');
        }
        */
        this.transformarDataPadraoAngularParaLocalDateTime(registro);
        const url = `${environment.api}/${this.urlBase}`;
        return this.httpClient.put<T>(url, registro);
    }

    transformarDataPadraoAngularParaLocalDateTime(obj: any) {
        if (this.regexDataPadraoAngular.test(obj)) {
            const momentObj = moment(obj);
            if (momentObj.format('HH:mm:ss') !== '00:00:00') {
                obj = momentObj.format('YYYY-MM-DDTHH:mm:ss');
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

    /**
     * Executa uma requisição de remoção de registro na API
     */
    delete(registroId: any): Observable<any> {
        if (!registroId) {
            return throwError('É necessário informar o id do registro para deletá-lo.');
        }
        const url = `${environment.api}/${this.urlBase}/${registroId}`;
        return this.httpClient.delete<void>(url).pipe(
            flatMap(
                r => of(registroId)
            )
        );
    }


}
