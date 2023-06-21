import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from '@boom/ui/auto-complete/auto-complete.module';
import { RotuloModule } from '@boom/ui/rotulo/rotulo.module';
import { BaseModuloAdminComponent } from './base-modulo-admin/base-modulo-admin.component';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { AdminService } from './services/admin.service';

const routes: Route[] = [
  {
    path: '',
    component: BaseModuloAdminComponent,
    children: [
      { path: 'pagina-inicial', component: PaginaInicialComponent },
      {
        path: 'usuario',
        loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule)
      },
      { path: '', redirectTo: 'pagina-inicial', pathMatch: 'full' },
    ]
  }
];


@NgModule({
  declarations: [
    PaginaInicialComponent,
    BaseModuloAdminComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    RotuloModule
  ],
  providers: [
    AdminService
  ]
})
export class AdminModule { }
