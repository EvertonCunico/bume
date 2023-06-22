import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy, CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AppRoutes } from './app.routes';
import { AppComponent } from './app.component';
import { PrimengModule } from './shared/primeng/primeng.module';
import { MenuService } from '@estrutura/menu/app.menu.service';
import { TokenInterceptorService } from '@boom/services/seguranca/token-interceptor.service';
import { DateInterceptorService } from '@boom/services/api/date-interceptor.service';
import { EstruturaModule } from '@estrutura/estrutura.module';
import { LoginModule } from './autenticacao/login/login.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        AppRoutes,
        HttpClientModule,
        BrowserAnimationsModule,
        PrimengModule,
        EstruturaModule,
        ToastModule,
        LoginModule,
        NgxSpinnerModule
    ],
    declarations: [
        AppComponent
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
