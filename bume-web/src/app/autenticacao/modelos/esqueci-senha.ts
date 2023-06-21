export class RecuperarSenha {
    dataNascimento: Date;
    cpf: string;
    email: string;

    constructor() {
      this.cpf = '';
      this.dataNascimento = new Date();
      this.email = '';
    }
}
