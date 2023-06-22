import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormValidations} from '@boom/forms/services/form-validations';
import {AutenticacaoService} from '../../services/autenticacao.service';
import { version } from '../../../../../package.json';
import {RecuperarSenha} from '../../modelos/esqueci-senha';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-esqueci-senha',
  templateUrl: './esqueci-senha.component.html',
  styleUrls: ['./esqueci-senha.component.css']
})
export class EsqueciSenhaComponent implements OnInit {
  nomeApp = 'bume';
  versao = '0.0.0';

  visivel = false;
  aguardar = false;
  formEsqueciSenha: FormGroup;
  msgErroLogin: string;

  constructor(private formBuilder: FormBuilder,
              private formValidations: FormValidations,
              private autenticacaoService: AutenticacaoService,
              private messageService: MessageService) {
    this.nomeApp = name;
    this.versao = version;
    this.formEsqueciSenha = this.formBuilder.group({
      dataNascimento: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      email: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.visivel = true;
  }

  async submeterFormRecuperarSenha() {
    if (this.formValidations.validar(this.formEsqueciSenha)) {
      this.aguardar = true;
      this.msgErroLogin = '';
      const recuperarSenha: RecuperarSenha = {
        email: this.formEsqueciSenha.get('email')?.value,
        dataNascimento: this.formEsqueciSenha.get('dataNascimento')?.value,
        cpf: this.formEsqueciSenha.get('cpf')?.value,
      };
      this.recuperarSenha(recuperarSenha);
    }
  }

  recuperarSenha(recuperarSenha: RecuperarSenha) {
    this.autenticacaoService.recuperarSenha(recuperarSenha).subscribe(
        () => {
          this.aguardar = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Recuperação de senha bem sucedida!',
            detail: 'Verifique seu E-Mail'
          });
        },
        error => {
          this.aguardar = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Erro em recuperar senha!',
            detail: error.error
          });
        }
    );
  }

}
