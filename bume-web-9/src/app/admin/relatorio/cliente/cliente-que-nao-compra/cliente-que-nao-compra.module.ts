import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ProgramaCrudModule } from '@boom/ui/programas/programa-crud/programa-crud.module';
import { TableModule } from 'primeng/table';
import { TextMaskModule } from 'angular2-text-mask';
import { UsuarioCRUDService } from 'app/services/usuario-crud.service';
import { UsuarioPesquisaService } from 'app/services/usuario-pesquisa.service';
import { FieldsetModule, InputMaskModule, PanelModule, TabViewModule } from 'primeng';
import { AutoCompleteModule } from '@boom/ui/auto-complete/auto-complete.module';
import { DatePickerModule } from '@boom/ui/date-picker/date-picker.module';
import { RelatorioClienteQueNaoCompraAdminComponent } from './relatorio/cliente-que-nao-compra-relatorio-admin.component';
import { ClienteQueNaoCompraPesquisaComponent } from './cliente-que-nao-compra-pesquisa/cliente-que-nao-compra-pesquisa.component';
import { RelatorioPesquisaClienteSemCompra } from 'app/services/relatorio-pesquisa-cliente-sem-compra.service';

@NgModule({
  // Declaração dos componentes de Pesquisa e Manutenção
  declarations: [ClienteQueNaoCompraPesquisaComponent, RelatorioClienteQueNaoCompraAdminComponent],
  imports: [
      ProgramaCrudModule.config({
          // url base da API
          url: 'usuario',
          pesquisa: ClienteQueNaoCompraPesquisaComponent,
          relatorio: RelatorioClienteQueNaoCompraAdminComponent
      }),
      // Imports dos componentes para construção das telas
      InputTextModule,
      ButtonModule,
      DropdownModule,
      TableModule,
      TextMaskModule,
      TabViewModule,
      InputMaskModule,
      AutoCompleteModule,
      FieldsetModule,
      DatePickerModule,
      PanelModule
  ],
  providers: [
    RelatorioPesquisaClienteSemCompra
  ]
})
export class RelatorioClienteQueNaoCompraModule { }
