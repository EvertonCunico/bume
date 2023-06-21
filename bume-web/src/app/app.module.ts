import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BaseComponent } from './estrutura/base/base.component';
import { TopBarComponent } from './estrutura/top-bar/top-bar.component';
import { BreadcrumbComponent } from './estrutura/breadcumb/breadcrumb.component';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LOCALE_ID } from '@angular/core';
import { AppRoutes } from './app.routes';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { EstruturaModule } from '@estrutura/estrutura.module';
import { LoginModule } from './autenticacao/login/login.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MenuService } from '@estrutura/menu/menu.service';
import { MessageService } from 'primeng/api';
import { TokenInterceptorService } from '@boom/services/seguranca/token-interceptor.service';
import { DateInterceptorService } from '@boom/services/api/date-interceptor.service';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    AppComponent,
    BreadcrumbComponent,
    TopBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    AppRoutes,
    HttpClientModule,
    EstruturaModule,
    LoginModule,
    NgxSpinnerModule,
    ToastModule,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptorService,
        multi: true
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: DateInterceptorService,
        multi: true
    },
    {
        provide: LOCALE_ID,
        useValue: 'pt-BR'
    },
    MenuService,
    MessageService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
