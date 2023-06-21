import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LazyLoadEvent } from 'primeng/api';

import { RequisicaoPesquisa } from '@boom/modelos/requisicao-pesquisa';
import { AcoesPesquisa } from '@boom/modelos/acoes-pesquisa';
import { FormValidations } from '@boom/forms/services/form-validations';
import { MensagemService } from '@boom/services/programa/mensagem.service';
import { Modelo } from '@boom/modelos/modelo';
import { PesquisaAPIService } from '@boom/services/api/pesquisa-api.service';
import { ResultadoPesquisa } from '@boom/modelos/resultado-pesquisa';

import { InterfaceService } from '@estrutura/services/interface.service';
import { ControlesPesquisaComponent } from './controles-pesquisa/controles-pesquisa.component';
import { Coluna } from '@boom/modelos/coluna';
import { BreadcrumbService } from '@estrutura/breadcumb/breadcrumb.service';

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css']
})
export class PesquisaComponent implements OnInit {

  @ViewChild(ControlesPesquisaComponent, { static: true })
  controlesPesquisa!: ControlesPesquisaComponent;

  @Input() formFiltros?: FormGroup;
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
  service?: PesquisaAPIService<Modelo>;

  pesquisando = false;
  executouUmaPesquisa = false;

  formControlPesquisa = new FormControl('', [Validators.required]);

  registroSelecionado: any;

  resultadoPesquisa?: ResultadoPesquisa<Modelo>;

  exibirPaginator: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private interfaceService: InterfaceService,
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
    if (this.controlesPesquisa.filtroSimples != null) {
      requisicao.valor = this.controlesPesquisa.filtroSimples;
    }

    this.service?.pesquisar(requisicao).subscribe(
      resultadoPesquisa => {
        this.resultadoPesquisa = resultadoPesquisa;
        if (resultadoPesquisa && resultadoPesquisa.data && resultadoPesquisa.data?.length) {
          this.exibirPaginator = true;
        } else {
          this.exibirPaginator = false;
        }
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
    if (this.formFiltros != undefined) {
      if (!this.controlesPesquisa.exibirFiltros || this.formValidations.validar(this.formFiltros)) {
        this.pesquisar({
          pagina: 1
        });
      } else {
        this.mensagemService.notificarFormInvalido('Não é possível pesquisar');
        return;
      }
    }

  }

  /**
   * Evento emitido pela Table ao manipular a paginação
   */
  onCarregarRegistros(e: LazyLoadEvent) {
    if (e != null && e.first && e.rows) {
      const p = Math.floor(e.first / e.rows) + 1;
      this.pesquisar({
        pagina: p
      });
    } else {
      this.pesquisar({
        pagina: 1
      });
    }


  }

  limparFiltros() {
     this.formFiltros?.reset();
  }

  novo() {

  }

  isDate(valor: any) {
    return valor instanceof Date;
  }
// Emite o evento da ação 1
  onAcao1(registro: any) {
    this.acao1.emit(registro);
  }
}
