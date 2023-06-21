import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BreadCrumbItem } from './breadcrumb-item';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  itens = [];
  item: BreadCrumbItem = { };

  private breadcrumbAtualizadoSource = new Subject<BreadCrumbItem>();
  public breadcrumbAtualizado = this.breadcrumbAtualizadoSource.asObservable();

  constructor() { }

  atualizar(breadCrumbItem?: BreadCrumbItem) {
    if (breadCrumbItem) {
      if (!this.item.descricao || (breadCrumbItem && breadCrumbItem.descricao && this.item.descricao !== breadCrumbItem.descricao)) {
        this.item = breadCrumbItem;
      } else {
        this.item.detalhe = breadCrumbItem.detalhe;
      }
    }
    this.breadcrumbAtualizadoSource.next(this.item);
  }

}
