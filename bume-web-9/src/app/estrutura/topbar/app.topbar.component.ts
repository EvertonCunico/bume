import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';
import { AutenticacaoService } from 'app/autenticacao/services/autenticacao.service';
import { LoginInfo } from 'app/autenticacao/modelos/login-info';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    styleUrls: ['app.topbar.component.css']
})
export class AppTopBarComponent {

    loginInfo: LoginInfo;

    constructor(public app: AppComponent, private autenticacaoService: AutenticacaoService) {
        this.observarLogin();
    }

    observarLogin() {
        this.autenticacaoService.onLogin.subscribe(
            (loginInfo: LoginInfo) => {
                this.loginInfo = loginInfo;
            }
        );
    }
}
