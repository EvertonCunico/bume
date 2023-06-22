import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ProgramaCrudModule } from '@boom/ui/programas/programa-crud/programa-crud.module';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RotuloModule } from '@boom/ui/rotulo/rotulo.module';
import { InputMaskModule } from 'primeng/inputmask';
import { AutoCompleteModule } from '@boom/ui/auto-complete/auto-complete.module';
import { DatePickerModule } from '@boom/ui/date-picker/date-picker.module';
import {LoginPesquisaComponent} from './login-pesquisa/login-pesquisa.component';
import {LoginControlePesquisaService} from '../../services/login-controle-pesquisa.service';

@NgModule({
  declarations: [LoginPesquisaComponent],
  imports: [
    ProgramaCrudModule.config({
      url: 'controle/login',
      pesquisa: LoginPesquisaComponent,
    }),
    InputTextModule,
    ButtonModule,
    DropdownModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    RotuloModule,
    InputMaskModule,
    AutoCompleteModule,
    DatePickerModule
  ],
  providers: [
      LoginControlePesquisaService
  ]
})
export class LoginControleModule {}