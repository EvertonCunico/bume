import { Component, OnInit, EventEmitter, ContentChild, ViewChild, Input } from '@angular/core';
import { AutofocusDirective } from '@boom/ui/autofocus/autofocus.directive';

@Component({
  selector: 'app-manutencao',
  templateUrl: './manutencao.component.html',
  styleUrls: ['./manutencao.component.css']
})
export class ManutencaoComponent implements OnInit {

  registroId: any;

  @ContentChild(AutofocusDirective, { static: true })
  autoFocus: AutofocusDirective;

  /**
   * Define quais ações podem ser executadas
   */
  @Input()
  acoes = {
    visualizar: true,
    incluir: true,
    atualizar: true,
    deletar: true,
    pesquisar: true,
    cancelar: true,
  };

  onNovo: EventEmitter<void> = new EventEmitter();
  onSalvar: EventEmitter<void> = new EventEmitter();
  onDeletar: EventEmitter<void> = new EventEmitter();
  onCancelar: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {

  }

  focus() {
    if (this.autoFocus) {
      this.autoFocus.getFocus();
    }
  }

  novo() {
    this.onNovo.emit();
  }

  salvar() {
    this.onSalvar.emit();
  }

  cancelar() {
    this.onCancelar.emit();
  }

  deletar() {
    this.onDeletar.emit();
  }

}
