import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, flatMap, tap } from 'rxjs/operators';
import { LoginInfo } from '../modelos/login-info';
import { TipoContaLogin } from '../modelos/tipo-conta-login';
import { LoginArgs } from '../modelos/login-args';
import { HttpClient } from '@angular/common/http';
import { LogadoService } from './logado.service';
import {RecuperarSenha} from '../modelos/esqueci-senha';
import { environment } from 'src/environments/environment';
import { Usuario } from '../modelos/usuario';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {
  primeiroAcesso = true;
  loginInfoAutenticado?: LoginInfo | undefined | null;
  rota?: string | undefined | null;

  onLogin: EventEmitter<LoginInfo> = new EventEmitter<LoginInfo>();
  onLogout: EventEmitter<LoginInfo> = new EventEmitter<LoginInfo>();

  tipoLogin?: TipoContaLogin;

  constructor(private router: Router, private http: HttpClient, private logadoService: LogadoService) { }

  /**
   * Requisita o método de login da API para as empresas
   */
  loginEmpresa(loginArgs: LoginArgs): Observable<LoginInfo> {
    this.tipoLogin = TipoContaLogin.ADMIN_EMPRESA;
    return this.login(loginArgs, []).pipe(
      tap(
        loginInfo => of(loginInfo)
      )
    );
  }

  /**
   * Requisita o método de login da API para Boome
   */
  loginChill(loginArgs: LoginArgs): Observable<LoginInfo> {
    this.tipoLogin = TipoContaLogin.ADMIN_GERAL;
    return this.login(loginArgs, []).pipe(
      tap(
        loginInfo => of(loginInfo)
      )
    );
  }

  login(loginArgs: LoginArgs, headers: any): Observable<LoginInfo> {
    const url = `${environment.api}/login`;
    const options = {
      headers
    };
    return this.http.post<LoginInfo>(url, loginArgs, options).pipe(
      flatMap(
        result => of(this.finalizarLogin(result))
      ),
      catchError(
        erro => {
          this.requererLogin('');
          const msg = erro && erro.error ? erro.error : 'Não foi possível fazer o login';
          return throwError(msg);
        }
      )
    );
  }

  finalizarLogin(loginInfo: LoginInfo): any {
    this.loginInfoAutenticado = loginInfo;
    localStorage.setItem('loginInfo', JSON.stringify(this.loginInfoAutenticado));
    if (this.loginInfoAutenticado.token) {
      localStorage.setItem('token', this.loginInfoAutenticado.token);
    }
    localStorage.setItem('tipoLogin', this.tipoLogin!);
    this.loginInfoAutenticado.tipoContaLogin = loginInfo.usuario?.tipoAcesso;
    this.registrarLogin(this.loginInfoAutenticado);
    this.redirecionarRota();
  }

  getUsuarioLogado(): Observable<Usuario> {
    const url = `${environment.api}/usuario/logado`;
    return this.http.get<Usuario>(url);
  }

  requererLogin(rota: string) {
    this.rota = rota;
    this.router.navigate(['login']);
  }

  registrarLogin(loginInfo: LoginInfo) {
    this.primeiroAcesso = false;
    this.loginInfoAutenticado = loginInfo;
    this.logadoService.loginInfoAutenticado = loginInfo;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.onLogin.next(this.loginInfo!);
  }

  redirecionarRota() {
    let rota = this.rota;
    this.rota = null;
    if (!rota) {
      if (this.loginInfo?.usuario.tipoAcesso === TipoContaLogin.ADMIN_EMPRESA || this.loginInfo?.tipoContaLogin === TipoContaLogin.RH_EMPRESA) {
        rota = 'empresa';
      } else {
        rota = 'admin';
      }
    }
    this.router.navigate([rota]);
  }

  isLogado(): Observable<boolean> {
    // TODO Refatorar
    if (this.loginInfo) {
      const isLogado = true;
      return of(isLogado);
    } else {
      const tokenInfoStr = localStorage.getItem('token');
      const loginInfoLocalStorage = localStorage.getItem('loginInfo');
      const tipoContaStr = localStorage.getItem('tipoLogin');
      if (tokenInfoStr) {
        try {
          let tokenInfo : LoginInfo;
          if (loginInfoLocalStorage != null) {
            tokenInfo = JSON.parse(loginInfoLocalStorage);
            this.tipoLogin = tipoContaStr as TipoContaLogin;
            return this.finalizarLogin(tokenInfo).pipe(
              flatMap(
                loginInfo => of(this.loginInfo && this.loginInfo.token ? true : false)
              )
            );
          } else{
            return of(false);
          }
        } catch (e) {
          return of(false);
        }
      }
      return of(false);
    }
  }

  logout(): Observable<LoginInfo | any> {
    localStorage.removeItem('a');
    const rotaLogin = 'login';
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.onLogout.next(this.loginInfo!);
    this.loginInfoAutenticado = null;
    this.router.navigate([rotaLogin]);
    return of(this.loginInfo).pipe(
      delay(1000)
    );
  }

  recuperarSenha(recuperarSenha: RecuperarSenha): Observable<string> {
    const url = `${environment.api}/login/recuperar-senha`;
    return this.http.post<string>(url, recuperarSenha);
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  get loginInfo(): LoginInfo | undefined | null {
    return this.loginInfoAutenticado;
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  get authorization() {
    return localStorage.getItem('token');
  }

  toBase64(dado: string): string {
    return btoa(dado);
  }
}
