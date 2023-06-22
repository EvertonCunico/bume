import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FieldsetModule } from 'primeng/fieldset';
import { CardModule } from 'primeng/card';

import { AutofocusModule } from '@boom/ui/autofocus/autofocus.module';
import { PesquisaComponent } from './pesquisa.component';
import { ControlesPesquisaComponent } from './controles-pesquisa/controles-pesquisa.component';
import { CampoPipeModule } from 'app/shared/pipes/campo-pipe/campo-pipe.module';

@NgModule({
  declarations: [PesquisaComponent, ControlesPesquisaComponent],
  exports: [PesquisaComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    AutofocusModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    FieldsetModule,
    CardModule,
    CampoPipeModule
  ]
})
export class PesquisaModule { }
