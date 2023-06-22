import { Component, Injector } from '@angular/core';
import { ViewBase } from '@boom/ui/views/view-base';
import { Coluna } from '@boom/modelos/coluna';
import { FormGroup } from '@angular/forms';
import { EstabelecimentoCRUDService } from 'app/services/estabelecimento-crud.service';
import { TiposCampo } from '@boom/modelos/tipos-campo';
import { ErroFinalizacaoPesquisaService } from 'app/services/erro-finalizacao-pesquisa.service';
import { distinctUntilChanged, pairwise } from 'rxjs/operators';

@Component({
  selector: 'app-erro-pesquisa',
  templateUrl: './erro-pesquisa.component.html',
  styleUrls: ['./erro-pesquisa.component.css'],
  providers: [EstabelecimentoCRUDService]
})
export class ErroFinalizacaoPesquisaComponent extends ViewBase {
  formFiltros: FormGroup;
  situacoes = [
    { label: '', value: null },
    { label: 'Aberto', value: 'ABERTO' },
    { label: 'Cancelado', value: 'CANCELADO' },
    { label: 'Parcialmente Pago', value: 'PARCIALMENTE_PAGO' },
    { label: 'Finalizado', value: 'FINALIZADO' },
  ];
  colunas: Coluna[] = [
    { field: 'id', header: 'Código' },
    { field: 'comanda', header: 'Número Pedido' },
    { field: 'estabelecimento', header: 'Estabelecimento', tipo: TiposCampo.OBJETO, propriedades: ['id', 'nome'] },
    { field: 'cliente', header: 'Cliente', tipo: TiposCampo.OBJETO, propriedades: ['id', 'nome'] },
    { field: 'mesa', header: 'Mesa', tipo: TiposCampo.OBJETO, propriedades: ['id', 'descricao'] },
    { field: 'dataHoraInclusao', header: 'Data Abertura', tipo: TiposCampo.DATAHORA },
    { field: 'situacao', header: 'Situação', tipo: TiposCampo.ENUM, opcoes: { ABERTO: 'Aberto', CANCELADO: 'Cancelado', PARCIALMENTE_PAGO: 'Parcialmente Pago', FINALIZADO: 'Finalizado'}},
  ];

  constructor(
    protected injector: Injector,
    public erroPesquisaService: ErroFinalizacaoPesquisaService,
    public estabelecimentoCRUDService: EstabelecimentoCRUDService) {
    super(injector);
    this.titulo = 'Técnico / Logs / Erros de finalização no ERP';
    this.formFiltros = this.criarFormularioFiltros();
    this.desabilitaCampoMesa();
    this._changeEstabelecimento();
    this.formFiltros.get('estabelecimento').setValue(null);
  }

  desabilitaCampoMesa() {
    this.formFiltros.get('mesa').disable();
  }

  _changeEstabelecimento() {    
    this.formFiltros.get('estabelecimento').valueChanges
      .pipe(   
        distinctUntilChanged(), pairwise()
      )
      .subscribe(([previous_value, value]) => {
        if (!value){
          this.formFiltros.get('mesa').setValue(null);
          this.formFiltros.get('mesa').disable();
        } else if (value?.id && previous_value?.id !== value?.id) {
          this.formFiltros.get('mesa').enable();
          this.formFiltros.get('mesa').setValue(null);
        }
      });
  }

  criarFormularioFiltros(): FormGroup {
    return this.formBuilder.group({
      estabelecimento: undefined,
      mesa: undefined,
      cliente: undefined,
      situacao: undefined,
      dataInicial: '',
      dataFinal: ''
    });
  }

  get estabelecimentoId(): number {
    return this.formFiltros.get('estabelecimento').value ? this.formFiltros.value.estabelecimento.id : 0;
  }

}