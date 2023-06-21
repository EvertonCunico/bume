import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Observable, of } from 'rxjs';

import { AutenticacaoService } from 'src/app/autenticacao/services/autenticacao.service';

import { flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoGuardService implements CanActivate, CanActivateChild {

  constructor(private autenticacaoService: AutenticacaoService) { }

  //  | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.canActivate(childRoute, state);
  }

  //  | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.autenticacaoService.isLogado().pipe(
      flatMap(
        canActive => {
          if (!canActive) {
            this.autenticacaoService.requererLogin(state.url);
          }
          return of(canActive);
        }
      )
    );
  }

}
