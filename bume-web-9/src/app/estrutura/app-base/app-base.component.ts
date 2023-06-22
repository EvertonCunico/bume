import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { InterfaceService } from '../services/interface.service';

@Component({
  selector: 'app-app-base',
  templateUrl: './app-base.component.html',
  styleUrls: ['./app-base.component.css']
})
export class AppBaseComponent implements OnInit {

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
