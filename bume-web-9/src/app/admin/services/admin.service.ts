import { Injectable } from '@angular/core';
import { InterfaceService } from '@estrutura/services/interface.service';
import { BreadcrumbService } from '@estrutura/breadcrumb/breadcrumb.service';
import { Subscription } from 'rxjs';
import { AutenticacaoService } from 'app/autenticacao/services/autenticacao.service';
import { LoginInfo } from 'app/autenticacao/modelos/login-info';

@Injectable()
export class AdminService {

  dados: {
    nome: string
  };

  subscriptionOnLogin: Subscription;

  constructor(private interfaceService: InterfaceService,
              private breadcrumbService: BreadcrumbService,
              private autenticacaoService: AutenticacaoService) {
    this.subscriptionOnLogin = this.autenticacaoService.onLogin.subscribe(
      loginInfo => {
        this.setTituloMenuByLoginInfo(loginInfo);
      }
    );
    this.setTituloMenuByLoginInfo(this.autenticacaoService.loginInfo);
  }

  setTituloMenuByLoginInfo(loginInfo: LoginInfo) {
    this.interfaceService.tituloMenu = 'BUME';
    this.breadcrumbService.atualizar();
  }

  atualizarDados(dados: { nome: any; }) {
    this.dados = dados;
    this.interfaceService.tituloMenu = dados.nome;
    this.breadcrumbService.atualizar();
  }
}
