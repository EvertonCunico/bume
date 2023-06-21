import { Injectable } from '@angular/core';
import { LoginInfo } from '../modelos/login-info';
import { TipoContaLogin } from '../modelos/tipo-conta-login';

@Injectable({
  providedIn: 'root'
})
export class LogadoService {

  loginInfoAutenticado?: LoginInfo;

  /**
   * Obtém o tipo de login do usuário logado (EMPRESA ou ADMIN)
   */
  get tipoLogin(): TipoContaLogin | undefined {
    return this.loginInfoAutenticado?.tipoContaLogin;
  }

}
