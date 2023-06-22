import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Coluna } from '@boom/modelos/coluna';

@Component({
  selector: 'app-controles-pesquisa',
  templateUrl: './controles-pesquisa.component.html',
  styleUrls: ['./controles-pesquisa.component.css']
})
export class ControlesPesquisaComponent implements OnInit {

  @Input() exibirBotaoFiltros = false;
  @Input() exibirBotaoNovo = false;
  @Input() rotulo = 'Resultado da pesquisa';
  @Input() colunas: Coluna[] = [];
  @Input() items = [];
  @Input() placeholder = 'pesquisar...';

  formControlFiltroBasico = new FormControl('', [Validators.required]);

  @Output()
  pesquisar: EventEmitter<any> = new EventEmitter();

  exibirFiltros = false;

  constructor() { }

  ngOnInit(): void {
  }

  pesquisaSimplesClick() {
    this.pesquisar.emit();
  }

  pesquisarClick() {
    this.pesquisar.emit();
  }

  pesquisaSimplesKeyup(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.pesquisar.emit();
    }
  }

  limparFiltros() {
     this.formControlFiltroBasico.reset();
  }

  get filtroSimples() {
    return this.formControlFiltroBasico.value;
  }

  isDate(valor) {
    return valor instanceof Date;
  }

}
