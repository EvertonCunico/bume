import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ProgramaCrudModule } from '@boom/ui/programas/programa-crud/programa-crud.module';
import { DatePickerModule } from '@boom/ui/date-picker/date-picker.module';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { RotuloModule } from '@boom/ui/rotulo/rotulo.module';
import { InputMaskModule } from 'primeng/inputmask';
import {ToastModule} from 'primeng/toast';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import { TicketCRUDService } from 'app/services/ticket-crud.service';
import { AutoCompleteModule } from '@boom/ui/auto-complete/auto-complete.module';
import { DropdownModule, TabViewModule } from 'primeng';
import { ErroFinalizacaoPesquisaComponent } from './erro-pesquisa/erro-pesquisa.component';
import { ErroFinalizacaoManutencaoComponent } from './erro-manutencao/erro-manutencao.component';
import { ErroFinalizacaoPesquisaService } from 'app/services/erro-finalizacao-pesquisa.service';

@NgModule({
  // Declaração dos componentes de Pesquisa e Manutenção
  declarations: [ErroFinalizacaoPesquisaComponent, ErroFinalizacaoManutencaoComponent],
  imports: [
    ProgramaCrudModule.config({
      // url base da API
      url: 'erro-finalizacao',
      pesquisa: ErroFinalizacaoPesquisaComponent,
      manutencao: ErroFinalizacaoManutencaoComponent
    }),
    // Imports dos componentes para construção das telas
    InputTextModule,
    ButtonModule,
    DatePickerModule,
    TableModule,
    FormsModule,
    RotuloModule,
    InputMaskModule,
    ToastModule,
    ContextMenuModule,
    DialogModule,
    AutoCompleteModule,
    DropdownModule,
    TabViewModule
  ],
  providers: [
    ErroFinalizacaoPesquisaService,
    TicketCRUDService
  ]
})
export class ErroModule { }