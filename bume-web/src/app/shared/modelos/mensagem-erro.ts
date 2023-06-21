export class MensagemErro {
    assunto?: string;
    detalhes?: string;
    erro?: any;
    error?: any;

    constructor(assunto: string, detalhes: string, erro: any, error: any) {
        this.assunto = assunto;
        this.detalhes = detalhes;
        this.erro = erro;
        this.error = error;
    }
}
