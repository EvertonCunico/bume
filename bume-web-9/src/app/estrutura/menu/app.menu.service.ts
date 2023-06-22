import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class MenuService {

    private menuSource = new Subject<string>();
    private resetSource = new Subject();
    private acaoSource = new Subject();

    menuSource$ = this.menuSource.asObservable();
    resetSource$ = this.resetSource.asObservable();
    acao$ = this.acaoSource.asObservable();

    onMenuStateChange(key: string) {
        this.menuSource.next(key);
    }

    reset() {
        this.resetSource.next();
    }

    acao(key: string) {
        this.acaoSource.next(key);
    }
}
