import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { AutenticacaoService } from 'src/app/autenticacao/services/autenticacao.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(private autenticacaoService: AutenticacaoService) { }

  //  | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.autenticacaoService.isLogado().pipe(
      flatMap(
        canActive => {
          if (canActive) {
            this.autenticacaoService.redirecionarRota();
            return of(canActive);
          } else {
            this.autenticacaoService.requererLogin('');
            return of(canActive);
          }
        }
      )
    );
  }

}
