import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

import { FormToolbarComponent } from './form-toolbar.component';

@NgModule({
  declarations: [FormToolbarComponent],
  exports: [FormToolbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule
  ]
})
export class FormToolbarModule { }
