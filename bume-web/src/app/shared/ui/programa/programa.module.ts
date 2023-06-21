import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProgramaComponent } from './programa.component';

@NgModule({
  declarations: [ProgramaComponent],
  exports: [ProgramaComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ProgramaModule { }
