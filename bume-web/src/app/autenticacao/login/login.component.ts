import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacaoService } from '../services/autenticacao.service';
import { FormValidations } from '@boom/forms/services/form-validations';
import { LoginArgs } from '../modelos/login-args';
import { TipoContaLogin } from '../modelos/tipo-conta-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  nomeApp = 'chillpass';
  versao = '0.0.0';

  visivel = false;
  aguardar = false;
  formLogin: FormGroup;
  msgErroLogin?: string;

  constructor(private formBuilder: FormBuilder,
    private formValidations: FormValidations,
    private autenticacaoService: AutenticacaoService,
    private router: Router) {
    this.nomeApp = 'BumeAPP';
    this.versao = '1.0.0';
    this.formLogin = this.formBuilder.group({
      usulogin: ['', [Validators.required]],
      ususenha: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.visivel = true;
  }

  /**
   * Submeter formulário de login
   */
  async submeterFormLogin() {
    if (this.formValidations.validar(this.formLogin)) {
      this.aguardar = true;
      this.msgErroLogin = '';
      const login: LoginArgs = {
        login: this.formLogin.get('usulogin')?.value,
        senha: this.formLogin.get('ususenha')?.value,
      };
      this.acessar(login);
    }
  }

  /**
   * Acessar sistema com as informações de Login obtidas do formulário
   * @param loginArgs Informações de Login
   */
  acessar(loginArgs: LoginArgs) {
    this.autenticacaoService.loginEmpresa(loginArgs).subscribe(
      loginResult => {
        this.aguardar = false;
        this.visivel = false;
      },
      loginErro => {
        this.aguardar = false;
        this.msgErroLogin = loginErro;
      }
    );
  }
}
