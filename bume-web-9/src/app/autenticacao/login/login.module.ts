import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarModule } from 'primeng/sidebar';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RotuloModule } from '@boom/ui/rotulo/rotulo.module';
import { AutofocusModule } from '@boom/ui/autofocus/autofocus.module';
import { LoginComponent } from './login.component';
import { EsqueciSenhaComponent } from './esqueci-senha/esqueci-senha.component';
import {DatePickerModule} from '@boom/ui/date-picker/date-picker.module';
import {InputMaskModule} from 'primeng';

@NgModule({
  declarations: [
    LoginComponent,
    EsqueciSenhaComponent
  ],
  exports: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SidebarModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    ProgressSpinnerModule,
    MessageModule,
    RotuloModule,
    AutofocusModule,
    DatePickerModule,
    InputMaskModule
  ]
})
export class LoginModule { }
