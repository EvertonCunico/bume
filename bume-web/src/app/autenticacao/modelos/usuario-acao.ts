import { Usuario } from './usuario';
import {Modelo} from '@boom/modelos/modelo';

enum Acao {
    INSERCAO = 'Inserção',
    ATUALIZACAO = 'Atualização',
    EXCLUSAO = 'Exclusão',
}

enum TipoAlteracao {
    SENHA = 'Senha',
}

export class UsuarioAcao extends Modelo {
    usuario: number;
    usuarioAcao: Usuario;
    dataHora: Date;
    acao: Acao;
    tipoAlteracao: TipoAlteracao;

    constructor() {
      super();
      this.id = 0;
      this.usuario = 0;
      this.usuarioAcao = new Usuario();
      this.dataHora = new Date();
      this.acao = Acao.INSERCAO;
      this.tipoAlteracao = TipoAlteracao.SENHA;
    }
}
