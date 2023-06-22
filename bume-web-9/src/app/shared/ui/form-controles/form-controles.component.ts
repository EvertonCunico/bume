import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AcoesCRUD } from '@boom/modelos/acoes-crud';

@Component({
  selector: 'app-form-controles',
  templateUrl: './form-controles.component.html',
  styleUrls: ['./form-controles.component.css']
})
export class FormControlesComponent implements OnInit {

  /**
   * Define quais ações podem ser executadas
   */
  @Input()
  acoes: AcoesCRUD = {
    incluir: true,
    atualizar: true,
  };

  @Input()
  registroId: any;

  @Output()
  salvar: EventEmitter<void> = new EventEmitter();

  @Output()
  cancelar: EventEmitter<void> = new EventEmitter();

  ngOnInit(): void {
  }

  salvarClick() {
    this.salvar.emit();
  }

  cancelarClick() {
    this.cancelar.emit();
  }

  get exibirBotaoSalvar(): boolean {
    return this.registroId ? this.acoes.atualizar : this.acoes.incluir;
  }

  get exibirBotaoCancelar(): boolean {
    return this.acoes.cancelar;
  }

  get exibirPesquisar(): boolean {
    return this.acoes.pesquisar ;
  }

}
