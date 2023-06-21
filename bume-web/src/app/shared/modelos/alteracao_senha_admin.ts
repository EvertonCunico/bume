export class AlteracaoSenhaAdmin {
    idUsuario?: number;
    senha?: string;

    constructor(idUsuario: number, senha: string) {
        this.idUsuario = idUsuario;
        this.senha = senha;
    }
}