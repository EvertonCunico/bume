import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';

import { MensagemErro } from '@boom/modelos/mensagem-erro';

/**
 * Classe de serviço responsável pelas mensagens do sistema.
 * É um singleton com uma instância criada no início da aplicação.
 * Para utilizar, basta injetar no construtor da classe.
 */
@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  constructor(private messageService: MessageService) { }

  /**
   * Mensagem padrão de inclusão de novos registros
   * @param registroId
   * @param assunto
   * @default assunto = 'Registro deletado com sucesso!'
   */
  notificarRegistroIncluidoComSucesso(registroId: any, assunto?: string) {
    this.messageService.add({
      severity: 'success',
      summary: assunto ? assunto : 'Registro incluído com sucesso!',
      detail: 'Código do registro ' + registroId
    });
  }

  /**
   * Mensagem padrão de alteração de registros
   * @param registroId
   * @param assunto
   * @default assunto = 'Registro deletado com sucesso!'
   */
  notificarRegistroAtualizadoComSucesso(registroId: any, assunto?: string) {
    this.messageService.add({
      severity: 'success',
      summary: assunto ? assunto : 'Registro atualizado com sucesso!',
      detail: 'Código do registro ' + registroId
    });
  }

  /**
   * Mensagem padrão de exclusão de registros
   * @param registroId
   * @param assunto
   * @default assunto = 'Registro deletado com sucesso!'
   */
  notificarRegistroDeletadoComSucesso(registroId: any, assunto?: string) {
    this.messageService.add({
      severity: 'success',
      summary: assunto ? assunto : 'Registro deletado com sucesso!',
      detail: 'Código do registro ' + registroId
    });
  }

  /**
   * Mensagem padrão de exclusão de registros
   * @param registroId
   * @param assunto
   * @default assunto = 'Registro deletado com sucesso!'
   */
  notificarMensagem(assunto?: string, detalhes?: string) {
    this.messageService.add({
      severity: 'success',
      summary: assunto ? assunto : '',
      detail: detalhes ? detalhes : ''
    });
  }

  notificarMensagemAlerta(assunto?: string, detalhes?: string) {
    this.messageService.add({
      severity: 'warn',
      summary: assunto ? assunto : '',
      detail: detalhes ? detalhes : ''
    });
  }

  /**
   * Mensagem padrão de validação de formulário
   * @param assunto
   */
  notificarFormInvalido(assunto?: string) {
    this.messageService.add({
      severity: 'warn',
      summary: assunto ? assunto : 'Não é possível salvar!',
      detail: 'Verifique os campos do formulário e tente novamente',
    });
  }

  /**
   * Mensagem padrão de notificação de erros de sistema
   * @param mensagemErro
   */
  notificarErro(mensagemErro: MensagemErro) {
    let assunto = 'Não foi possível realizar a ação!';
    let detalhes = '';
    if (mensagemErro) {
      if (mensagemErro.assunto) {
        assunto = mensagemErro.assunto;
      }
      if (mensagemErro.detalhes) {
        detalhes = mensagemErro.detalhes;
      }
      if (mensagemErro.erro) {
        detalhes += this.getDetalhesErro(mensagemErro.erro);
      }
    }
    this.messageService.add({
      severity: 'warn',
      summary: assunto,
      detail: detalhes
    });
  }

  /**
   * Método de obtenção de detalhes de erros
   */
  getDetalhesErro(erro: any): string {
    if (erro instanceof HttpErrorResponse) {
      if (typeof erro.error === 'string') {
        return erro.error;
      } else {
        if (erro.error.mensagens && erro.error.mensagens.length === 1) {
          const msg = erro.error.mensagens[0];
          /*
            if (msg === 'Error invoking subclass method') { } else { }
          */
          return 'Ocorreu um erro inesperado no servidor. Detalhes: ' + msg;
        } else {
          return 'Ocorreu um erro inesperado no servidor';
        }
      }
    } else {
      return erro;
    }
  }
}
