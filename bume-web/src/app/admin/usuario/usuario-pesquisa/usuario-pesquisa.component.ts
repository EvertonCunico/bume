import { Component, Injector } from '@angular/core';
import { ViewBase } from '@boom/ui/views/view-base';
import { Coluna } from '@boom/modelos/coluna';
import { FormGroup } from '@angular/forms';
import { TiposCampo } from '@boom/modelos/tipos-campo';
import { NavigationExtras } from '@angular/router';
import { RequisicaoPesquisa } from '@boom/modelos/requisicao-pesquisa';
import { ResultadoPesquisa } from '@boom/modelos/resultado-pesquisa';
import { UsuarioPesquisaService } from '@estrutura/services/usuario-pesquisa.service';
import { Usuario } from 'src/app/autenticacao/modelos/usuario';

@Component({
  selector: 'app-usuario-pesquisa',
  templateUrl: './usuario-pesquisa.component.html',
  styleUrls: ['./usuario-pesquisa.component.css']
})
export class UsuarioPesquisaComponent extends ViewBase {
  formFiltros: FormGroup;
  colunas: Coluna[] = [
    { field: 'id', header: 'Código' },
    { field: 'nome', header: 'Nome' },
    {field: 'email', header: 'E-mail', tipo: TiposCampo.ENUM},
    { field: 'cpf', header: 'CPF', mascara: '###.###.###-##'},
    { field: 'telefoneCelular', header: 'Telefone', mascara: '(##) #####-####'},
    { field: 'ativo', header: 'Ativo', tipo: TiposCampo.ENUM, opcoes: { S: 'Sim', N: 'Não'}}
  ];
  permissoes = [
    { label: '', value: '' },
    { value: 'ADMIN_GERAL', label: 'Administrador Geral' },
    { value: 'ADMIN_EMPRESA', label: 'Administrador Empresa' },
    { value: 'RH_EMPRESA', label: 'RH Empresa' },
  ];

  pesquisado: boolean = false;

  constructor(override injector: Injector, public usuarioPesquisaService: UsuarioPesquisaService) {
    super(injector);
    this.titulo = 'Cadastros / Usuários';
    this.formFiltros = this.criarFormularioFiltros();
  }

  criarFormularioFiltros(): FormGroup {
    return this.formBuilder.group({
      nome: '',
      cpf: '',
      email: ''
    });
  }

  pesquisaConcluida(pesquisa: { requisicao: RequisicaoPesquisa, resultado: ResultadoPesquisa<Usuario> }) {
    this.pesquisado = true;
  }

  relatorio() {
    let nome = '';
    if (this.formFiltros.get('nome')?.value) {
      nome = this.formFiltros.get('nome')?.value;
    }

    let cpf = '';
    if (this.formFiltros.get('cpf')?.value) {
      cpf = this.formFiltros.get('cpf')?.value;
    }
    let email = '';
    if (this.formFiltros.get('email')?.value) {
      email = this.formFiltros.get('email')?.value;
    }

    const navigationExtras: NavigationExtras = {
      queryParams: {
        nome: nome,
        cpf: cpf,
        email: email,
      }
    };
    this.router.navigate(['/admin/usuario/relatorio'], navigationExtras);
  }
}
