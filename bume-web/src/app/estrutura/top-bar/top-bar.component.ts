import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { LoginInfo } from 'src/app/autenticacao/modelos/login-info';
import { AutenticacaoService } from 'src/app/autenticacao/services/autenticacao.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {

  loginInfo!: LoginInfo;

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
