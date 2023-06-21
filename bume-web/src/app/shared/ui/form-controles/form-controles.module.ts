import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

import { FormControlesComponent } from './form-controles.component';

@NgModule({
  declarations: [FormControlesComponent],
  exports: [FormControlesComponent],
  imports: [
    CommonModule,
    ButtonModule
  ]
})
export class FormControlesModule { }
