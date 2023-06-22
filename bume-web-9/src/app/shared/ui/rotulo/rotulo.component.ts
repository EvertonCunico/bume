import {Component, Input, ContentChild} from '@angular/core';
import {FormControlName, AbstractControl, Validators} from '@angular/forms';

import {FormValidations} from '@boom/forms/services/form-validations';

@Component({
    selector: 'app-rotulo',
    templateUrl: './rotulo.component.html',
    styleUrls: ['./rotulo.component.css']
})
export class RotuloComponent {

    @ContentChild(FormControlName, {static: false})
    set control(formControlName: FormControlName) {
        if (formControlName) {
            this.obrigatorio = this.formValidations.verificarObrigatoriedade(formControlName.control);
            this.mensagem = this.atualizarMensagem(formControlName.control);
            this.observarAlteracaoStatusControl(formControlName.control);
        } else {
            this.obrigatorio = false;
            this.mensagem = null;
        }
    }

    @Input() rotulo: string;

    obrigatorio = false;
    mensagem = '';

    constructor(private formValidations: FormValidations) {
    }

    observarAlteracaoStatusControl(control: AbstractControl) {
        control.statusChanges.subscribe(
            status => {
                this.mensagem = this.atualizarMensagem(control);
            }
        );
    }

    atualizarMensagem(control: AbstractControl): string {
        let mensagem = '';
        if (control && control.touched && control.errors) {
            Object.keys(control.errors).forEach(
                key => {
                    if (key === 'invalidCPF') {
                        mensagem += ', CPF inválido ';
                    } else if (key === 'invalidCNPJ') {
                        mensagem += ', CNPJ inválido';
                    } else if (key === 'required') {
                        mensagem += ', Obrigatório';
                    } else if (key === 'email') {
                        mensagem += ', E-mail inválido';
                    } else if (key === 'min') {
                        mensagem += ', Valor mínimo: ' + control.errors[key].min;
                    } else if (key === 'max') {
                        mensagem += ', Valor máximo: ' + control.errors[key].max;
                    } else if (key === 'minlength') {
                        mensagem += ', Tamanho mínimo: ' + control.errors[key].requiredLength;
                    } else if (key === 'maxlength') {
                        mensagem += ', Tamanho máximo: ' + control.errors[key].requiredLength;
                    } else if (key === 'cnpj') {
                        mensagem += ', CNPJ inválido';
                    } else if (key === 'pattern') {
                        mensagem += ', Valor inválido';
                    } else {
                        console.warn('Mensagem de validação não implementada. Chave: ', key);
                    }
                }
            );
        }
        return mensagem.slice(1);
    }

}
