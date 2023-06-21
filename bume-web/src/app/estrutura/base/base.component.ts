import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { InterfaceService } from '../services/interface.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  bloquear = false;

  navegando = false;
  bloquearInterface = false;

  constructor(private router: Router, private interfaceService: InterfaceService) {

    this.router.events.subscribe(
      event => {
        if (event instanceof NavigationStart) {
          this.navegando = true;
        } else if (event instanceof NavigationEnd) {
          this.navegando = false;
        } else if (event instanceof NavigationCancel) {
          this.navegando = false;
        } else if (event instanceof NavigationError) {
          this.navegando = false;
        }
        this.atualizarBloqueio();
      }
    );

    this.interfaceService.onBloquear.subscribe(
      bloquear => {
        this.bloquearInterface = bloquear;
        this.atualizarBloqueio();
      }
    );
  }

  atualizarBloqueio() {
    this.bloquear = this.navegando || this.bloquearInterface;
  }

  ngOnInit(): void {
  }

}
