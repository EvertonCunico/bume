import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InterfaceService {

  tituloMenu = 'Menu';

  onBloquear: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  bloquear() {
    this.onBloquear.emit(true);
  }

  desbloquear() {
    this.onBloquear.emit(false);
  }
}

