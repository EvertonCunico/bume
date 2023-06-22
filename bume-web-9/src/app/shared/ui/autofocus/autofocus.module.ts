import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutofocusDirective } from './autofocus.directive';
import { InputMaskModule } from 'primeng/inputmask';

@NgModule({
  declarations: [AutofocusDirective],
  exports: [AutofocusDirective],
  imports: [
    CommonModule,
    InputMaskModule
  ]
})
export class AutofocusModule { }
