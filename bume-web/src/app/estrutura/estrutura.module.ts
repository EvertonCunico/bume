import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {DialogModule} from 'primeng/dialog';
import {RotuloModule} from '@boom/ui/rotulo/rotulo.module';
import {ReactiveFormsModule} from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import { AppMenuitemComponent } from './menu/menuitem.component';
import { BaseComponent } from './base/base.component';
import { UserDetailComponent } from './top-bar/user-detail/user-detail.component';
import { PrimengModule } from '../shared/primeng/primeng.module';

@NgModule({
    declarations: [
        MenuComponent,
        AppMenuitemComponent,
        UserDetailComponent,
        BaseComponent
    ],
    exports: [
        MenuComponent,
        AppMenuitemComponent,
        UserDetailComponent,
        BaseComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        DialogModule,
        RotuloModule,
        PrimengModule,
        ReactiveFormsModule
    ]
})
export class EstruturaModule {
}
