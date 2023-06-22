import {Component, OnInit, Input} from '@angular/core';

import {AppComponent} from 'app/app.component';
import {LoginInfo} from 'app/autenticacao/modelos/login-info';
import {AutenticacaoService} from 'app/autenticacao/services/autenticacao.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormValidations} from '@boom/forms/services/form-validations';
import {MessageService} from 'primeng/api';
import {UsuarioCRUDService} from '../../../services/usuario-crud.service';
import {AlterarSenha} from '../../../modelos/alterar_senha';
import { Router } from '@angular/router';


@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.css'],
    providers: [UsuarioCRUDService]
})
export class UserDetailComponent implements OnInit {

    @Input()
    set loginInfo(loginInfo: LoginInfo) {
        if (loginInfo && loginInfo.usuario.login) {
            const nome = loginInfo.usuario.nome.split(' ')[0];
            // this.nomeUsuario = nome.length > 7 ? (nome.slice(0, 7) + '...') : nome;
            this.nomeUsuario = nome;
            this.login = loginInfo.usuario.login.split(' ')[0];
        } else {
            this.nomeUsuario = '';
        }
    }

    nomeUsuario = '';
    login = '';
    alterarSenhaDialog = false;
    formAlterarSenha: FormGroup;
    idUsuario;

    constructor(private formBuilder: FormBuilder,
                private formValidations: FormValidations,
                public app: AppComponent,
                private autenticacaoService: AutenticacaoService,
                private messageService: MessageService,
                private usuarioService: UsuarioCRUDService,
                private routerService: Router) {
        this.formAlterarSenha = this.formBuilder.group({
            senhaAtual: [null, [Validators.required]],
            senhaNova: [null, [Validators.required]],
            senhaConfirmacao: [null, [Validators.required]],
        });
    }

    ngOnInit() {
        this.observarLogin();
        this.formAlterarSenha.get('senhaAtual').setValue(null);
        this.formAlterarSenha.get('senhaNova').setValue(null);
        this.formAlterarSenha.get('senhaConfirmacao').setValue(null);
    }

    logout(event) {
        event.preventDefault();
        this.app.fecharMenuTopBar();
        this.autenticacaoService.logout().subscribe();
    }

    edituser(event) {
        event.preventDefault();
        this.app.fecharMenuTopBar();
    }

    validarSenha() {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%*()_+^&?]{5,16}$/;
        const senhaAtual = this.formAlterarSenha.get('senhaAtual').value;
        const senhaNova = this.formAlterarSenha.get('senhaNova').value;
        const senhaConfirmacao = this.formAlterarSenha.get('senhaConfirmacao').value;
        if (senhaNova !== null && senhaConfirmacao !== null && senhaAtual !== null) {
            if (senhaNova === senhaConfirmacao) {
                if (regex.test(senhaNova)) {
                    this.alterarSenha(senhaAtual, senhaNova, senhaConfirmacao);
                } else {
                    this.messageService.add({
                        severity: 'warn',
                        summary: 'Atenção!!',
                        detail: 'A senha deve ter pelo menos 5 e no máximo 16 caracteres, incluindo pelo menos um dígito, uma letra minúscula e uma letra maiúscula.',
                        life: 6000
                    });
                }
            } else {
                this.messageService.add({
                    severity: 'warn',
                    summary: 'Senha nova não coincide confirmação!',
                    detail: 'A senha de confirmação não coincide com a nova senha.'
                });
            }
        } else {
            this.messageService.add({
                severity: 'warn',
                summary: 'Campo vazio!',
                detail: 'Verifique os campos.'
            });
        }
    }

    alterarSenha(senhaAtual, senhaNova, senhaConfirmacao) {
        this.usuarioService
            .alterarSenha(new AlterarSenha(this.login, senhaAtual, senhaNova, senhaConfirmacao))
            .subscribe(
                () => {
                    this.alterarSenhaDialog = false;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Senha alterada com sucesso!',
                        detail: 'Senha alterada com sucesso'
                    });
                    this.formAlterarSenha.get('senhaAtual').setValue(null);
                    this.formAlterarSenha.get('senhaNova').setValue(null);
                    this.formAlterarSenha.get('senhaConfirmacao').setValue(null);
                },
                error => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erro em alterar senha!',
                        detail: error.error
                    });
                }
            );
    }
    cancelarAlterarSenha() {
        this.formAlterarSenha.get('senhaAtual').setValue(null);
        this.formAlterarSenha.get('senhaNova').setValue(null);
        this.formAlterarSenha.get('senhaConfirmacao').setValue(null);
        this.alterarSenhaDialog = false;
    }

    observarLogin() {
        this.autenticacaoService.onLogin.subscribe(
            (loginInfo: LoginInfo) => {
                this.idUsuario = loginInfo.usuario.id;
            }
        );
    }

    acessarPerfil(){
        this.routerService.navigateByUrl('/admin/usuario/' +  this.idUsuario);
    }
}
