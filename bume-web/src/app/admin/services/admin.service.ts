import { Injectable } from '@angular/core';
import { InterfaceService } from '@estrutura/services/interface.service';
import { Subscription } from 'rxjs';
import { AutenticacaoService } from 'src/app/autenticacao/services/autenticacao.service';
import { LoginInfo } from 'src/app/autenticacao/modelos/login-info';
import { BreadcrumbService } from '@estrutura/breadcumb/breadcrumb.service';

@Injectable()
export class AdminService {

  dados?: {
    nome: string
  };

  subscriptionOnLogin: Subscription;

  constructor(private interfaceService: InterfaceService,
              private breadcrumbService: BreadcrumbService,
              private autenticacaoService: AutenticacaoService) {
    this.subscriptionOnLogin = this.autenticacaoService.onLogin.subscribe(
      ( loginInfo: LoginInfo) => {
        this.setTituloMenuByLoginInfo(loginInfo);
      }
    );
    if (this.autenticacaoService.loginInfo != null) {
      this.setTituloMenuByLoginInfo(this.autenticacaoService.loginInfo);
    }
  }

  setTituloMenuByLoginInfo(loginInfo: LoginInfo) {
    this.interfaceService.tituloMenu = 'BumeAPP';
    this.breadcrumbService.atualizar();
  }

  atualizarDados(dados: { nome: any; }) {
    this.dados = dados;
    this.interfaceService.tituloMenu = dados.nome;
    this.breadcrumbService.atualizar();
  }
}
