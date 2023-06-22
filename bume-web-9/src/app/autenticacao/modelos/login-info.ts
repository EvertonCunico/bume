import { TipoContaLogin } from './tipo-conta-login';
import { Usuario } from '../../modelos/usuario';

/**
 * Informações
 */
export interface LoginInfo {
    usuario?: Usuario;
    token?: string;
}