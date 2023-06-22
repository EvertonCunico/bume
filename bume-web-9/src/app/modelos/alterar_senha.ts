export class AlterarSenha {

    login?: string;
    senhaAtual?: string;
    senhaNova?: string;
    senhaConfirmacao?: string;


    constructor(login: string, senhaAtual: string, senhaNova: string, senhaConfirmacao: string) {
        this.login = login;
        this.senhaAtual = senhaAtual;
        this.senhaNova = senhaNova;
        this.senhaConfirmacao = senhaConfirmacao;
    }
}