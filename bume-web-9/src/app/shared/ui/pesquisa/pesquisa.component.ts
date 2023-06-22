import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LazyLoadEvent } from 'primeng/api';

import { RequisicaoPesquisa } from '@boom/modelos/requisicao-pesquisa';
import { AcoesPesquisa } from '@boom/modelos/acoes-pesquisa';
import { FormValidations } from '@boom/forms/services/form-validations';
import { MensagemService } from '@boom/services/programa/mensagem.service';
import { Modelo } from '@boom/modelos/modelo';
import { PesquisaAPIService } from '@boom/services/api/pesquisa-api.service';
import { ResultadoPesquisa } from '@boom/modelos/resultado-pesquisa';

import { InterfaceService } from '@estrutura/services/interface.service';
import { BreadcrumbService } from '@estrutura/breadcrumb/breadcrumb.service';
import { ControlesPesquisaComponent } from './controles-pesquisa/controles-pesquisa.component';
import { Coluna } from '@boom/modelos/coluna';

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css']
})
export class PesquisaComponent implements OnInit {

  @ViewChild(ControlesPesquisaComponent, { static: true }) controlesPesquisa: ControlesPesquisaComponent;

  @Input() formFiltros: FormGroup;
  @Input() rotulo = 'Resultado da pesquisa';
  @Input() colunas: Coluna[] = [];
  @Input() placeHolderControles = 'pesquisar...';
  // Cria um evento para disparar ao clicar no botão da "ação personalizada 1"
  @Output() acao1: EventEmitter<any> = new EventEmitter<any>();
  // Evento disparado após execução de cada pesquisa
  @Output() pesquisaConcluida: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Define quais ações podem ser executadas
   */
  @Input()
  acoes: AcoesPesquisa = {
    editar: true,
    incluir: true,
    visualizar: true,
    filtrar: true,
    acao1: false,
    pesquisar: true
  };

  @Input()
  service: PesquisaAPIService<Modelo>;

  pesquisando = false;
  executouUmaPesquisa = false;

  formControlPesquisa = new FormControl('', [Validators.required]);

  registroSelecionado;

  resultadoPesquisa: ResultadoPesquisa<Modelo>;

  constructor(private interfaceService: InterfaceService,
              private formValidations: FormValidations,
              private breadcrumbService: BreadcrumbService,
              private mensagemService: MensagemService) {
    this.breadcrumbService.atualizar({ detalhe: 'Pesquisa' });
  }

  ngOnInit(): void { }

  pesquisar(requisicao: RequisicaoPesquisa = { } as RequisicaoPesquisa) {

    this.pesquisando = true;
    this.interfaceService.bloquear();

    requisicao.filtro = this.formFiltros ? this.formFiltros.getRawValue() : null;
    requisicao.valor = this.controlesPesquisa.filtroSimples;

    this.service.pesquisar(requisicao).subscribe(
      resultadoPesquisa => {
        this.resultadoPesquisa = resultadoPesquisa;
        this.pesquisando = false;
        this.executouUmaPesquisa = true;
        this.interfaceService.desbloquear();
        this.pesquisaConcluida.emit(
          {
            requisicao: requisicao,
            resposta: resultadoPesquisa
          }
        );
      },
      erro => {
        this.pesquisando = false;
        this.executouUmaPesquisa = true;
        this.resultadoPesquisa = {
          data: [],
          pageNumber: 50,
          totalRows: 0
        } as ResultadoPesquisa<any>;
        this.interfaceService.desbloquear();
      }
    );
  }

  onPesquisar(event?: any) {
    if (!this.controlesPesquisa.exibirFiltros || this.formValidations.validar(this.formFiltros)) {
      this.pesquisar({
        pagina: 1
      });
    } else {
      this.mensagemService.notificarFormInvalido('Não é possível pesquisar');
      return;
    }
  }

  /**
   * Evento emitido pela Table ao manipular a paginação
   */
  onCarregarRegistros(e: LazyLoadEvent) {
    const pagina = Math.floor(e.first / e.rows) + 1;
    this.pesquisar({
      pagina
    });
  }

  limparFiltros() {
     this.formFiltros.reset();
  }

  novo() {

  }

  isDate(valor) {
    return valor instanceof Date;
  }
// Emite o evento da ação 1
  onAcao1(registro: any) {
    this.acao1.emit(registro);
  }
}
