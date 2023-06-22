import { TipoContaLogin } from "./tipo-conta-login";

/**
 * Argumentos para método de login.
 * `usuario` ou `senha` devem ser preenchidos
 */
export interface LoginArgs {
    login: string;
    senha: string;
}