import { Component, Injector } from '@angular/core';
import { ViewBase } from '@boom/ui/views/view-base';
import { Coluna } from '@boom/modelos/coluna';
import { FormGroup } from '@angular/forms';
import { TiposCampo } from '@boom/modelos/tipos-campo';
import { NavigationExtras } from '@angular/router';
import { RequisicaoPesquisa } from '@boom/modelos/requisicao-pesquisa';
import { ResultadoPesquisa } from '@boom/modelos/resultado-pesquisa';
import { Usuario } from 'app/modelos/usuario';
import { RelatorioPesquisaClienteSemCompra } from 'app/services/relatorio-pesquisa-cliente-sem-compra.service';

@Component({
  selector: 'app-cliente-que-nao-compra-pesquisa',
  templateUrl: './cliente-que-nao-compra-pesquisa.component.html',
  styleUrls: ['./cliente-que-nao-compra-pesquisa.component.css']
})
export class ClienteQueNaoCompraPesquisaComponent extends ViewBase {
  formFiltros: FormGroup;
  colunas: Coluna[] = [
    { field: 'id', header: 'Código' },
    { field: 'nome', header: 'Nome' },
    { field: 'telefone', header: 'Telefone', mascara: '(##) #####-####'},
    { field: 'email', header: 'E-mail', tipo: TiposCampo.ENUM},
  ];

  pesquisado: boolean = false;

  constructor(protected injector: Injector, public relatorioPesquisaClienteSemCompra: RelatorioPesquisaClienteSemCompra) {
    super(injector);
    this.titulo = 'Relatório / Clientes que não fizeram compra';
    this.formFiltros = this.criarFormularioFiltros();
  }

  criarFormularioFiltros(): FormGroup {
    return this.formBuilder.group({
      nome: '',
      dataInicial: '',
      dataFinal: '',      
      email: ''
    });
  }

  pesquisaConcluida(pesquisa: { requisicao: RequisicaoPesquisa, resultado: ResultadoPesquisa<Usuario> }) {
    this.pesquisado = true;
  }

  relatorio() {
    
    let dataInicial = '';
    if (this.formFiltros.get('dataInicial').value) {
      dataInicial = this.formFiltros.get('dataInicial').value;
    }

    let dataFinal = '';
    if (this.formFiltros.get('dataFinal').value) {
      dataFinal = this.formFiltros.get('dataFinal').value;
    }

    let nome = '';
    if (this.formFiltros.get('nome').value) {
      nome = this.formFiltros.get('nome').value;
    }

    const navigationExtras: NavigationExtras = {
      queryParams: {
        dataInicial: dataInicial,
        nome: nome,
        dataFinal: dataFinal
      }
    };
    this.router.navigate(['/admin/admin-relatorio-cliente-nao-compra/relatorio'], navigationExtras);
  }
}
