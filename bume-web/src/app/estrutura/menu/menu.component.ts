import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { AutenticacaoService } from 'src/app/autenticacao/services/autenticacao.service';
import { MenuService } from './menu.service';
import { LoginInfo } from 'src/app/autenticacao/modelos/login-info';
import { TipoContaLogin } from 'src/app/autenticacao/modelos/tipo-conta-login';

@Component({
  selector: 'app-menu',
  template: `
      <ul class="layout-menu">
          <li app-menuitem *ngFor="let menu of model; let i = index;" [item]="menu" (index)="i" (root)="true"></li>
      </ul>
  `
})
export class MenuComponent implements OnInit {

  model!: any[];

  constructor(public app: AppComponent,
              private autenticacaoService: AutenticacaoService,
              private menuService: MenuService,
              ) {
      this.observarLogin();
  }

  ngOnInit() {
  }

  observarLogin() {
      this.autenticacaoService.onLogin.subscribe(
          (loginInfo: LoginInfo) => {
              if (loginInfo.usuario.tipoAcesso === TipoContaLogin.ADMIN_GERAL) {
                  this.model = this.getMenuAdmin();
              } else {
                  this.model = this.getMenuEmpresa();
              }
          }
      );
  }

  getMenuAdmin(): any[] {
    return [
        { nivel: 1, label: 'Página Inicial', icon: 'fa-light fa-house', routerLink: '/admin/pagina-inicial' },
        {
            nivel: 0,
            label: 'Cadastros',
            icon: 'fa-light fa-table-tree',
            items: [
                { nivel: 1, label: 'Usuários', icon: 'fa-light fa-users', routerLink: '/admin/usuario/'}
            ]
        }
    ];
  }

  getMenuEmpresa(): any[] {
      return [
          { nivel: 1, label: 'Página Inicial', icon: 'fa-light fa-house', routerLink: '/empresa/pagina-inicial' }
      ];
  }

  getMenuRH(): any[] {
      return [
          {nivel: 1, label: 'Página Inicial', icon: 'fa-light fa-house', routerLink: '/empresa/pagina-inicial' }
      ];
  }

    getFuncaoAcao(acao: string) {
        return () => this.menuService.acao(acao);
    }

}
