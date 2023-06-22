import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Modelo } from '@boom/modelos/modelo';
import { RegistroService } from '../api/registro.service.ts.service';

@Injectable({
  providedIn: 'root'
})
export class RegistroResolverService<T> implements Resolve<Modelo> {

  constructor(private router: Router, private registroService: RegistroService<Modelo>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Modelo> | Observable<never> {
    const registroId = route.paramMap.get('id');
    return registroId ? this.registroService.get(registroId, route.data.url) : of(null);
  }
}
