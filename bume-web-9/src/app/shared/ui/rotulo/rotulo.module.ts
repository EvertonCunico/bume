import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RotuloComponent } from './rotulo.component';

@NgModule({
  declarations: [RotuloComponent],
  exports: [RotuloComponent],
  imports: [
    CommonModule
  ]
})
export class RotuloModule { }
