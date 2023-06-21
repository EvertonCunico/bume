import { Component, OnInit, Injector } from '@angular/core';
import { ViewBase } from '@boom/ui/views/view-base';
import { AppComponent } from 'src/app/app.component';
import { LogadoService } from 'src/app/autenticacao/services/logado.service';

@Component({
    selector: 'app-pagina-inicial',
    templateUrl: './pagina-inicial.component.html',
    styleUrls: ['./pagina-inicial.component.css'],
    providers: [
    ]
})
export class PaginaInicialComponent extends ViewBase implements OnInit {
    contadorVendas: number = 0;
    totalVendas: number = 0;

    constructor(override injector: Injector,
                private logadoService: LogadoService,
                public app: AppComponent) {
        super(injector);
        this.titulo = 'Página Inicial';
    }

    ngOnInit() {
    }
}
