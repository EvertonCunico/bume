import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AutenticacaoService } from './autenticacao.service';
import { TipoContaLogin } from '../modelos/tipo-conta-login';

@Injectable({
  providedIn: 'root'
})
export class PermissoesService {
  constructor(private autenticacaoService: AutenticacaoService) { }

  canActivateAdmin(r: any): Observable<boolean> {
    const ok = this.autenticacaoService.loginInfo ? this.autenticacaoService.loginInfo.usuario.tipoAcesso === TipoContaLogin.ADMIN_GERAL : true;
    if (!ok && !this.autenticacaoService.primeiroAcesso) {
      alert('Você não tem acesso a essa rota (#1).');
    }
    return of(ok);
  }

  canActivateEmpresa(r: any): Observable<boolean> {
    const ok = this.autenticacaoService.loginInfo ? this.autenticacaoService.loginInfo.usuario.tipoAcesso === TipoContaLogin.ADMIN_EMPRESA : true;
    if (!ok && !this.autenticacaoService.primeiroAcesso) {
      alert('Você não tem acesso a essa rota (#2).');
    }
    return of(ok);
  }
}
