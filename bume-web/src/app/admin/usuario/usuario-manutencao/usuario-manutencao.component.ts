import {Component, Injector, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

import {Coluna} from '@boom/modelos/coluna';
import {ManutencaoViewBase} from '@boom/ui/views/manutencao-view-base';

import {cpf} from 'cpf-cnpj-validator';
import {MessageService} from 'primeng/api';
import {TiposCampo} from '@boom/modelos/tipos-campo';
import { UsuarioCRUDService } from '@estrutura/services/usuario-crud.service';
import { Usuario } from 'src/app/autenticacao/modelos/usuario';
import { UsuarioAcaoPesquisaService } from '@estrutura/services/usuario-acao-pesquisa.service';
import { AlteracaoSenhaAdmin } from '@boom/modelos/alteracao_senha_admin';
import { LabelValue } from '@boom/modelos/label-value';

export function verificarCPFValido(control: AbstractControl): { [key: string]: any } | null {
    if (control.value == null) {
        return null;
    }
    const cpfSemMascara = control.value.replace(/\D/g, '');
    const cpfValido = cpf.isValid(cpfSemMascara);
    if (!cpfValido) {
        return {invalidCPF: {value: control.value}};
    }
    return null;
}


@Component({
    selector: 'app-usuario-manutencao',
    templateUrl: './usuario-manutencao.component.html',
    styleUrls: ['./usuario-manutencao.component.css'],
    providers: [UsuarioAcaoPesquisaService]
})
export class UsuarioManutencaoComponent extends ManutencaoViewBase<Usuario> implements OnInit {

    formFiltrosAcao?: FormGroup;

    idUsuario: any = null;

    situacoes: LabelValue[] = [
        {label: 'Sim', value: 'S'},
        {label: 'Não', value: 'N'}
    ];

    permissoes: LabelValue[] = [
      //TODO - Adicionar permissões conforme enum do tipo de permissão.
    ];

    colunasTermos: Coluna[] = [
        {field: 'id', header: 'Código'},
        {field: 'titulo', header: 'Título'}
    ];

    colunasAcao: Coluna[] = [
        {field: 'usuarioAcao', header: 'Executor', tipo: TiposCampo.OBJETO, propriedades: ['id', 'nome']},
        {
            field: 'acao', header: 'Ação',
            tipo: TiposCampo.ENUM, opcoes: {
                INSERCAO: 'Inserção',
                ATUALIZACAO: 'Atualização',
                EXCLUSAO: 'Exclusão',
            }
        },
        {field: 'dataHora', header: 'Data e Hora', tipo: TiposCampo.DATAHORA},
        {
            field: 'tipoAlteracao', header: 'Histórico',
            tipo: TiposCampo.ENUM, opcoes: {
                SENHA: 'Senha Alterada',
            }
        }
    ];

    formAlterarSenha: FormGroup;

    constructor(override injector: Injector,
                public userCRUDService: UsuarioCRUDService,
                public usuarioAcaoPesquisaService: UsuarioAcaoPesquisaService,
                private messageService: MessageService,) {
        super(injector, userCRUDService);
        this.titulo = 'Cadastros / Usuário';
        this.form = this.formBuilder.group({
            nome: ['', [Validators.required, Validators.maxLength(100)]],
            email: ['', [Validators.required, Validators.maxLength(100), Validators.email]],
            login: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
            cpf: ['', [verificarCPFValido, Validators.required, Validators.minLength(11), Validators.maxLength(15)]],
            telefoneCelular: ['', [Validators.minLength(10), Validators.maxLength(15)]],
            dataNascimento: [new Date(), [Validators.required, Validators.minLength(8), Validators.maxLength(10)]],
            ativo: ['S', [Validators.required]],
            tipoAcesso: ['', Validators.required]
        });
        this.formAlterarSenha = this.formBuilder.group({
            idUsuario: [null, [Validators.required]],
            senha: [null, [Validators.required]],
        });
    }

    validarSenha() {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%*()_+^&?]{5,16}$/;
        const senha = this.formAlterarSenha.get('senha')?.value;
        if (senha !== null) {
            if (regex.test(senha)) {
                this.alterarSenha(senha);
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
                summary: 'Campo vazio!',
                detail: 'Verifique os campos.'
            });
        }
    }

    alterarSenha(senha: string) {
        this.userCRUDService
            .alterarSenhaAdmin(new AlteracaoSenhaAdmin(this.idUsuario, senha))
            .subscribe(
                () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Senha alterada com sucesso!',
                        detail: 'Senha alterada com sucesso'
                    });
                    this.formAlterarSenha.get('senhaAtual')?.setValue(null);
                    this.formAlterarSenha.get('senhaNova')?.setValue(null);
                    this.formAlterarSenha.get('senhaConfirmacao')?.setValue(null);
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

    override ngOnInit(): void {
        this.form?.get('dataInclusao')?.disable();
        this.form?.get('dataAlteracao')?.disable();
        super.ngOnInit();
        this.idUsuario = this.route.snapshot.paramMap.get('id');
        this.formFiltrosAcao = this.formBuilder.group({
            idUsuario: this.registroId
        });
    }
}
