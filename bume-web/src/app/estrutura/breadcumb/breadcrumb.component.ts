import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from './breadcrumb.service';
import { InterfaceService } from '../services/interface.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html'
})
export class BreadcrumbComponent {

  tituloRota = 'carregando...';

  constructor(private breadcrumbService: BreadcrumbService, private interfaceService: InterfaceService) {
      this.breadcrumbService.breadcrumbAtualizado.subscribe(
          itens => {
              let titulo = this.interfaceService.tituloMenu === undefined ? 'Bume APP' : this.interfaceService.tituloMenu;
              titulo += (itens && itens.descricao ? ' / '  + itens.descricao : '');
              titulo += (itens && itens.detalhe ? ' / '  + itens.detalhe : '');
              this.tituloRota = titulo;
          }
      );
  }

}
