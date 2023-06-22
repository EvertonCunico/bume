import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BaseModuloEmpresaComponent } from './base-modulo-empresa/base-modulo-empresa.component';
import { PrimengModule } from 'app/shared/primeng/primeng.module';
import {PaginaInicialComponent} from './pagina-inicial/pagina-inicial.component';

const routes = [
  {
    path: '',
    component: BaseModuloEmpresaComponent,
    children: [
      { path: 'pagina-inicial', component: PaginaInicialComponent },
      {
        path: 'usuario',
        loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule)
      },
      { path: '', redirectTo: 'pagina-inicial', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  declarations: [
    PaginaInicialComponent,
    BaseModuloEmpresaComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    PrimengModule
  ],
  providers: [
  ]
})
export class EmpresaModule { }
