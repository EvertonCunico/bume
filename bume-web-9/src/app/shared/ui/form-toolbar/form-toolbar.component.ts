import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AcoesCRUD } from '@boom/modelos/acoes-crud';

@Component({
  selector: 'app-form-toolbar',
  templateUrl: './form-toolbar.component.html',
  styleUrls: ['./form-toolbar.component.css']
})
export class FormToolbarComponent implements OnInit {

  /**
   * Define quais ações podem ser executadas
   */
  @Input()
  acoes: AcoesCRUD = {
    incluir: true,
    deletar: true
  };

  @Input()
  registroId: any;

  @Output()
  deletar: EventEmitter<void> = new EventEmitter();

  @Output()
  novo: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {

  }

  novoClick() {
    this.novo.emit();
  }

  deletarClick() {
    if (confirm('Tem certeza que deseja deletar este registro?')) {
      this.deletar.emit();
    }
  }

  get exibirBotaoNovo(): boolean {
    return this.acoes.incluir;
  }

  get exibirBotaoDeletar(): boolean {
    return this.acoes.deletar && this.registroId;
  }

  get exibirPesquisar(): boolean {
    return this.acoes.pesquisar;
  }

}
