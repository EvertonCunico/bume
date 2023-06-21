import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Modelo } from '@boom/modelos/modelo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistroService<T extends Modelo> {

  constructor(private httpClient: HttpClient) { }

  get(registroId: string, urlBase: string): Observable<T> {
    const url = `${environment.api}/${urlBase}/${registroId}`;
    return this.httpClient.get<T>(url);
  }
}
