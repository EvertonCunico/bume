import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule as PrimeNGAutoCompleteModule } from 'primeng/autocomplete';

import { AutoCompleteComponent } from './auto-complete.component';

@NgModule({
  declarations: [AutoCompleteComponent],
  exports: [AutoCompleteComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PrimeNGAutoCompleteModule
  ]
})
export class AutoCompleteModule { }
