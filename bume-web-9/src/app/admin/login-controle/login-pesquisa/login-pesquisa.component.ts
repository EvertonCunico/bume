import {ViewBase} from '@boom/ui/views/view-base';
import {Component, Injector} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {Coluna} from '@boom/modelos/coluna';
import {TiposCampo} from '@boom/modelos/tipos-campo';
import {LoginControlePesquisaService} from '../../../services/login-controle-pesquisa.service';

@Component({
    selector: 'app-login-pesquisa',
    templateUrl: './login-pesquisa.component.html',
    styleUrls: ['./login-pesquisa.component.css']
})
export class LoginPesquisaComponent extends ViewBase {
    formFiltros: FormGroup;

    perfil = [
        {label: '', value: null},
        {label: 'Administrador', value: 'ADMIN'},
        {label: 'Empresa', value: 'EMPRESA'},
        {label: 'Gerente', value: 'GERENTE'},
        {label: 'Garçom', value: 'GARCOM'},
        {label: 'Cliente', value: 'CLIENTE'}
    ];

    loginControleStatus = [
        {label: '', value: null},
        {label: 'Senha incorreta', value: 'SENHA_INCORRETA'},
        {label: 'Não tem permissão para este perfil', value: 'PERFIL_NEGADO'},
        {label: 'Login bem-sucedido', value: 'LOGIN_SUCESSO'}
    ];

    colunas: Coluna[] = [
        { field: 'id', header: 'Código' },
        {field: 'usuario', header: 'Usuário', tipo: TiposCampo.OBJETO, propriedades: ['id', 'nome']},
        { field: 'dataHora', header: 'Data e Hora', tipo: TiposCampo.DATAHORA },
        { field: 'ip', header: 'IP' },
        {
            field: 'loginControleStatus', header: 'Status',
            tipo: TiposCampo.ENUM, opcoes: {
                SENHA_INCORRETA: 'Senha incorreta',
                PERFIL_NEGADO: 'Não tem permissão para este perfil',
                LOGIN_SUCESSO: 'Login bem-sucedido',
            }
        },
        {
            field: 'perfil', header: 'Perfil',
            tipo: TiposCampo.ENUM, opcoes: {
                ADMIN: 'Administrador',
                EMPRESA: 'Empresa',
                GERENTE: 'Gerente',
                GARCOM: 'Garçom',
                CLIENTE: 'Cliente'
            }
        },
        { field: 'dispositivo', header: 'Dispositivo' },
    ];

    constructor(protected injector: Injector, public loginControlePesquisaService: LoginControlePesquisaService) {
        super(injector);
        this.titulo = 'Técnico / Login Controle';
        this.formFiltros = this.criarFormularioFiltros();
    }

    criarFormularioFiltros(): FormGroup {
        return this.formBuilder.group({
            dataHoraInicio: [''],
            dataHoraFim: [''],
            idEstabelecimento: [''],
            nomeParcialUsuario: [''],
            idUsuario: [''],
            ipParcial: [''],
            perfil: [''],
            loginControleStatus: [''],
        });
    }
}