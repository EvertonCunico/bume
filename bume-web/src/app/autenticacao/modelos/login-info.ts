import { TipoContaLogin } from './tipo-conta-login';
import { Usuario } from './usuario';

/**
 * Informações
 */
export interface LoginInfo {
    usuario: Usuario;
    tipoContaLogin?: TipoContaLogin;
    token?: string;
}
