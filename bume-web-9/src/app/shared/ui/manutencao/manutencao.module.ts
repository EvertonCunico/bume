import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormControlesModule } from '@boom/ui/form-controles/form-controles.module';
import { FormToolbarModule } from '@boom/ui/form-toolbar/form-toolbar.module';
import { ManutencaoComponent } from './manutencao.component';

@NgModule({
  declarations: [ManutencaoComponent],
  exports: [ManutencaoComponent],
  imports: [
    CommonModule,
    FormControlesModule,
    FormToolbarModule
  ]
})
export class ManutencaoModule { }
