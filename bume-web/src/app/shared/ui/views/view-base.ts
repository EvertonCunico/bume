import { Injector } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { MensagemService } from '@boom/services/programa/mensagem.service';
import { InterfaceService } from '../../../estrutura/services/interface.service';
import { BreadcrumbService } from '@estrutura/breadcumb/breadcrumb.service';

export class ViewBase {

    breadcrumbService: BreadcrumbService;
    formBuilder: FormBuilder;
    mensagemService: MensagemService;
    router: Router;
    interfaceService: InterfaceService;

    constructor(protected injector: Injector) {
        this.breadcrumbService = injector.get(BreadcrumbService);
        this.formBuilder = injector.get(FormBuilder);
        this.mensagemService = injector.get(MensagemService);
        this.router = injector.get(Router);
        this.interfaceService = injector.get(InterfaceService);
    }

    set titulo(titulo: string) {
        this.breadcrumbService.atualizar({ descricao: titulo });
    }

}
