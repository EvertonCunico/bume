import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AutenticacaoService } from './autenticacao.service';
import { RolesUser } from 'app/modelos/roles';

@Injectable({
  providedIn: 'root'
})
export class PermissoesService {
  constructor(private autenticacaoService: AutenticacaoService) { }

  canActivateAdmin(r: any): Observable<boolean> {
    const ok = this.autenticacaoService.loginInfo ? this.autenticacaoService.loginInfo.usuario.tipoAcesso.toString() == "ADMIN_GERAL" : true;
    if (!ok && !this.autenticacaoService.primeiroAcesso) {
      alert('Você não tem acesso a essa rota (#1).');
    }
    return of(ok);
  }

  canActivateEmpresa(r: any): Observable<boolean> {
    const ok = this.autenticacaoService.loginInfo ? this.autenticacaoService.loginInfo.usuario.tipoAcesso.toString() == "ADMIN_EMPRESA" || this.autenticacaoService.loginInfo.usuario.tipoAcesso.toString() === "RH_EMPRESA" : true;
    if (!ok && !this.autenticacaoService.primeiroAcesso) {
      alert('Você não tem acesso a essa rota (#2).');
    }
    return of(ok);
  }
}
