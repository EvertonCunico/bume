import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { PermissoesService } from 'src/app/autenticacao/services/permissoes.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate, CanActivateChild {

  constructor(private permissoesService: PermissoesService) { }

  //  | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.canActivate(childRoute, state);
  }

  //  | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.permissoesService.canActivateAdmin(route);
  }

}
