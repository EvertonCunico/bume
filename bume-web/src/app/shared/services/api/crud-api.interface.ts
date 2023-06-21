import { Observable } from 'rxjs';
import { Modelo } from '@boom/modelos/modelo';

export interface CrudAPIInterface<T extends Modelo> {

    urlBase: string;

    novo(args: any): Observable<T>;

    get(registroId: any): Observable<T>;

    post(registro: T): Observable<T>;

    put(registro: T): Observable<T>;

    delete(registroId: any): Observable<T>;

}
