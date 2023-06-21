import { Modelo } from '@boom/modelos/modelo';
import { TipoContaLogin } from './tipo-conta-login';

export class Usuario extends Modelo {
    nome: string;
    cpf?: string;
    rg?: string;
    dataNascimento?: Date;
    email?: string;
    telefoneCelular?: string;
    login?: string;
    senha?: string;
    ativo?: boolean;
    tipoAcesso?: TipoContaLogin;

    constructor() {
      super();
      this.nome = '';
      this.cpf = '';
      this.rg = '';
      this.dataNascimento = new Date();
      this.email = '';
      this.telefoneCelular = '';
      this.login = '';
      this.senha = '';
      this.ativo = false;
      this.tipoAcesso = TipoContaLogin.ADMIN_GERAL;
    }
}
