import { Component, OnInit } from '@angular/core';
import { MenuService } from '@estrutura/menu/app.menu.service';

@Component({
  selector: 'app-base-modulo-empresa',
  templateUrl: './base-modulo-empresa.component.html',
  styleUrls: ['./base-modulo-empresa.component.css']
})
export class BaseModuloEmpresaComponent implements OnInit {

  constructor(private menuService: MenuService) {

  }

  ngOnInit(): void {
    this.menuService.acao$.subscribe(
      acao => {
      }
    );
  }

}
