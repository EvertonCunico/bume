import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AppBreadcrumbComponent} from './breadcrumb/app.breadcrumb.component';
import {AppMenuComponent} from './menu/app.menu.component';
import {AppMenuitemComponent} from './menu/app.menuitem.component';
import {AppTopBarComponent} from './topbar/app.topbar.component';
import {UserDetailComponent} from './topbar/user-detail/user-detail.component';
import {AppBaseComponent} from './app-base/app-base.component';
import {DialogModule} from 'primeng';
import {RotuloModule} from '@boom/ui/rotulo/rotulo.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        AppBreadcrumbComponent,
        AppMenuComponent,
        AppMenuitemComponent,
        AppTopBarComponent,
        UserDetailComponent,
        AppBaseComponent
    ],
    exports: [
        AppBreadcrumbComponent,
        AppMenuComponent,
        AppMenuitemComponent,
        AppTopBarComponent,
        UserDetailComponent,
        AppBaseComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        DialogModule,
        RotuloModule,
        ReactiveFormsModule
    ]
})
export class EstruturaModule {
}
