import { Component } from '@angular/core';
import { BaseApp } from './estrutura/base-app';
import { InterfaceService } from './estrutura/services/interface.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseApp {

    constructor(public interfaceService: InterfaceService,
                private spinner: NgxSpinnerService) {
        super();
    }

    mostraSpinner() {
        this.spinner.show();
    }

    fechaSpinner() {
        this.spinner.hide();
    }
}
