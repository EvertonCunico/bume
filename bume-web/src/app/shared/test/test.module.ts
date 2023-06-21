import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { RotuloModule } from '@boom/ui/rotulo/rotulo.module';
import { ApiTestComponent } from './api-test/api-test.component';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';

const routes: Routes = [
  {
    path: 'api',
    component: ApiTestComponent
  }
];

@NgModule({
  declarations: [ApiTestComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    DropdownModule,
    CardModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    InputTextareaModule,
    RotuloModule,
    ProgressBarModule
  ]
})
export class TestModule { }
