import {Component, OnInit} from '@angular/core';
import {AppComponent} from '../../app.component';
import {MenuService} from './app.menu.service';
import {AutenticacaoService} from 'app/autenticacao/services/autenticacao.service';
import {LoginInfo} from 'app/autenticacao/modelos/login-info';
import {TipoContaLogin} from 'app/autenticacao/modelos/tipo-conta-login';
import { RolesUser } from 'app/modelos/roles';

@Component({
    selector: 'app-menu',
    template: `
        <ul class="layout-menu">
            <li app-menuitem *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true"></li>
        </ul>
    `
})
export class AppMenuComponent implements OnInit {
    model: any[];
    idEmpresa: any;
    perfil: RolesUser;

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
                if (loginInfo.usuario.tipoAcesso.toString() === "ADMIN_GERAL") {
                    this.model = this.getMenuAdmin();
                } else {
                    this.model = this.getMenuEmpresa();
                    this.perfil = loginInfo.usuario.tipoAcesso;
                }
            }
        );
    }

    getMenuAdmin(): any[] {
        return [
            { label: 'Página Inicial', icon: 'fa-light fa-house', routerLink: '/admin/pagina-inicial' },
            {
                label: 'Cadastros',
                icon: 'fa-light fa-table-tree',
                items: [
                    { label: 'Usuários', icon: 'fa-light fa-users', routerLink: '/admin/usuario/'}
                ]
            }
        ];
    }

    getMenuEmpresa(): any[] {
        return [
            { label: 'Página Inicial', icon: 'fa-light fa-house', routerLink: '/empresa/pagina-inicial' },
            { label: 'Usuários', icon: 'fa-light fa-users', routerLink: '/empresa/usuario/'},
        ];
    }

    getFuncaoAcao(acao: string) {
        return () => this.menuService.acao(acao);
    }
}
