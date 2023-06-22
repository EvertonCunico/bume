import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ProgramaCrudModule } from '@boom/ui/programas/programa-crud/programa-crud.module';
import { TableModule } from 'primeng/table';
import { TextMaskModule } from 'angular2-text-mask';
import { UsuarioPesquisaComponent } from './usuario-pesquisa/usuario-pesquisa.component';
import { UsuarioManutencaoComponent } from './usuario-manutencao/usuario-manutencao.component';
import { UsuarioCRUDService } from 'app/services/usuario-crud.service';
import { UsuarioPesquisaService } from 'app/services/usuario-pesquisa.service';
import { FieldsetModule, InputMaskModule, PanelModule, TabViewModule } from 'primeng';
import { AutoCompleteModule } from '@boom/ui/auto-complete/auto-complete.module';
import { DatePickerModule } from '@boom/ui/date-picker/date-picker.module';
import { RelatorioUsuarioAdminComponent } from './relatorio/usuario-relatorio-admin.component';

@NgModule({
  // Declaração dos componentes de Pesquisa e Manutenção
  declarations: [UsuarioPesquisaComponent, UsuarioManutencaoComponent, RelatorioUsuarioAdminComponent],
  imports: [
      ProgramaCrudModule.config({
          // url base da API
          url: 'usuario',
          pesquisa: UsuarioPesquisaComponent,
          manutencao: UsuarioManutencaoComponent,
          relatorio: RelatorioUsuarioAdminComponent
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
    UsuarioCRUDService,
    UsuarioPesquisaService
  ]
})
export class UsuarioModule { }
