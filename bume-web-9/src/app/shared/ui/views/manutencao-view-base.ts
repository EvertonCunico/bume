import { Injector, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';

import { ManutencaoComponent } from '@boom/ui/manutencao/manutencao.component';
import { CRUDAPIService } from '@boom/services/api/crud-api.service';
import { FormValidations } from '@boom/forms/services/form-validations';
import { Modelo } from '@boom/modelos/modelo';

import { ViewBase } from './view-base';
import { OnRegistroIncluido } from '../interfaces/on-registro-incluido';
import { OnRegistroAtualizado } from '../interfaces/on-registro-atualizado';
import { OnRegistroExcluido } from '../interfaces/on-registro-excluido';
import { OnRegistroNovo } from '../interfaces/on-registro-novo';
import { OnRegistroCarregado } from '../interfaces/on-registro-carregado';
import { OnRegistroValidar } from '../interfaces/on-registro-validar';

export class ManutencaoViewBase<T extends Modelo> extends ViewBase implements OnInit {

    @ViewChild(ManutencaoComponent, { static: true })
    manutencao: ManutencaoComponent;

    route: ActivatedRoute;
    formValidations: FormValidations;
    form: FormGroup;
    registroIntacto: T;
    permiteDeletar = true;
    registroAlterado = new FormControl(false);

    constructor(protected injector: Injector, protected crudAPIService: CRUDAPIService<T>) {
        super(injector);
        this.route = injector.get(ActivatedRoute);
        this.formValidations = injector.get(FormValidations);
    }

    ngOnInit(): void {
        this.route.data
            .subscribe((data: any) => {
                if (data && data.registro) {
                    this.registro = data.registro;
                    this.formValue = this.registro;
                    if ('onRegistroCarregado' in this) {
                        (this as OnRegistroCarregado).onRegistroCarregado(data.registro);
                    }
                    this.breadcrumbService.atualizar({ detalhe: this.registroId });
                } else {
                    // this.novo();
                    this.breadcrumbService.atualizar({ detalhe: 'Novo' });
                }
            }
        );
        this.configurarMetodos();
    }

    configurarMetodos() {
        this.manutencao.onNovo.subscribe(
            () => {
                this.novo();
            }
        );
        this.manutencao.onSalvar.subscribe(
            () => {
                const obj = Object.assign({}, this.registro, this.formValue);
                if ('onRegistroValidar' in this) {
                    if (!(this as OnRegistroValidar).onRegistroValidar(obj)) {
                        return;
                    }
                }
                if (this.formValidations.validar(this.form)) {
                    this.interfaceService.bloquear();
                    if (this.registroId) {
                        const registroId = this.registroId;
                        this.crudAPIService.put(obj).subscribe(
                            result => {
                                if (result) {
                                    this.formValue = result;
                                    this.mensagemService.notificarRegistroAtualizadoComSucesso(registroId);
                                    this.crudAPIService.get(registroId).subscribe(
                                        registro => {
                                            this.registro = registro;
                                            this.formValue = registro;

                                            this.registroAlterado.setValue(true);
                                            this.interfaceService.desbloquear();
                                        }
                                    );
                                } else {
                                    alert('Erro!');
                                    this.interfaceService.desbloquear();
                                }
                            },
                            erro => {
                                this.mensagemService.notificarErro({ erro });
                                this.interfaceService.desbloquear();
                            }
                        );
                    } else {
                        this.interfaceService.bloquear();
                        this.crudAPIService.post(obj).subscribe(
                            registroId => {
                                this.interfaceService.desbloquear();
                                this.mensagemService.notificarRegistroIncluidoComSucesso(registroId);
                                this.router.navigate(['../' + registroId], { relativeTo: this.route });
                                if ('onRegistroIncluido' in this) {
                                    (this as OnRegistroIncluido).onRegistroIncluido(registroId);
                                }
                            },
                            erro => {
                                this.mensagemService.notificarErro({ erro });
                                this.interfaceService.desbloquear();
                            }
                        );
                    }
                } else {
                    this.mensagemService.notificarFormInvalido();
                }
            }
        );
        this.manutencao.onCancelar.subscribe(
            () => {
                this.interfaceService.bloquear();
                if (this.registroId) {
                    this.crudAPIService.get(this.registroId).subscribe(
                        registro => {
                            this.formValue = this.registro;
                            this.interfaceService.desbloquear();
                            if ('onRegistroCarregado' in this) {
                                (this as OnRegistroCarregado).onRegistroCarregado(registro);
                            }
                        },
                        erro => {
                            this.mensagemService.notificarErro({ erro });
                            this.interfaceService.desbloquear();
                        }
                    );
                } else {
                    this.crudAPIService.novo().subscribe(
                        registro => {
                            this.formValue = this.registro;
                            this.interfaceService.desbloquear();
                            if ('onRegistroNovo' in this) {
                                (this as OnRegistroNovo).onRegistroNovo();
                            }
                        },
                        erro => {
                            this.mensagemService.notificarErro({ erro });
                            this.interfaceService.desbloquear();
                        }
                    );
                }
            }
        );
        this.manutencao.onDeletar.subscribe(
            () => {
                if (this.permiteDeletar) {
                    const registroId = this.registroId;
                    this.crudAPIService.delete(registroId).subscribe(
                        registro => {
                            this.mensagemService.notificarRegistroDeletadoComSucesso(this.registroId);
                            this.novo();
                            // this.router.navigate(['../novo'], { relativeTo: this.route });
                            if ('onRegistroExcluido' in this) {
                                (this as OnRegistroExcluido).onRegistroExcluido(registroId);
                            }
                        },
                        erro => {
                            this.mensagemService.notificarErro({ erro });
                            this.interfaceService.desbloquear();
                        }
                    );
                } else {
                    this.mensagemService.notificarMensagem('Atenção!', 'Esse registro não pode ser excluído!');
                }
            }
        );
    }

    novo() {
        this.router.navigate(['../novo'], { relativeTo: this.route }).then(
            r => {
                this.interfaceService.bloquear();
                this.crudAPIService.novo().subscribe(
                    registro => {
                        this.registro = registro;
                        this.formValue = this.registro;
                        this.interfaceService.desbloquear();
                        if (this.manutencao) {
                            this.manutencao.focus();
                        }
                        if ('onRegistroNovo' in this) {
                            (this as OnRegistroNovo).onRegistroNovo();
                        }
                    },
                    erro => {
                        this.mensagemService.notificarErro({ erro });
                    }
                );
            }
        );
    }

    get formValue(): any {
        return this.form.getRawValue();
    }

    set formValue(value: any) {
        this.form.reset();
        if (value) {
            this.form.patchValue(value);
        }
    }

    get registroAlteradoGet() {
        return this.registroAlterado;
    }

    /**
     * Esta variável armazena o registro em seu estado inicial.
     * Em inclusão de novo registro, armazena os valores padrões sugeridos de um novo registro.
     * Em alteração, armazena os valores do registro carregados da API.
     */
    get registro(): T {
        return this.registroIntacto;
    }

    set registro(registro: T) {
        this.registroIntacto = registro;
        this.manutencao.registroId = this.registroId;
    }

    /**
     * Obtém o registro do objeto que está em edição. Retorna null em caso de inclusão.
     */
    get registroId(): any {
        if (this.registro) {
            if (this.registro.id) {
                return this.registro.id;
            } else {
                for (const key in this.registro) {
                    if (key.toLowerCase().indexOf('codigo') !== -1) {
                        return this.registro[key];
                    }
                }
            }
        }
        return null;
    }

    /**
     * Verifica se a tela está em edição
     */
    get isEdicao(): boolean {
        return !!this.registroId;
    }

}
