import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe, CurrencyPipe } from '@angular/common';

import { CampoPipe } from './campo.pipe';

@NgModule({
  declarations: [CampoPipe],
  exports: [CampoPipe],
  imports: [
    CommonModule
  ],
  providers: [
    DatePipe,
    DecimalPipe,
    CurrencyPipe
  ]
})
export class CampoPipeModule { }
