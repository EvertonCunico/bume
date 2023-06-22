import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AutenticacaoGuardService } from './shared/services/seguranca/autenticacao-guard.service';
import { EmpresaGuardService } from './shared/services/seguranca/empresa-guard.service';
import { AdminGuardService } from './shared/services/seguranca/admin-guard.service';
import { RouteGuardService } from './shared/services/seguranca/route-guard.service';
import { LoginComponent } from './autenticacao/login/login.component';
import {EsqueciSenhaComponent} from './autenticacao/login/esqueci-senha/esqueci-senha.component';

export const routes: Routes = [
    {
        path: 'empresa',
        loadChildren: () => import('./empresa/empresa.module').then(m => m.EmpresaModule),
        canActivate: [ AutenticacaoGuardService, EmpresaGuardService ]
    },
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
        canActivate: [ AutenticacaoGuardService, AdminGuardService ]
    },
    {
        path: 'test',
        loadChildren: () => import('./shared/test/test.module').then(m => m.TestModule),
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'esqueci-senha',
        component: EsqueciSenhaComponent
    },
    {
        path: '',
        component: LoginComponent,
        pathMatch: 'full',
        canActivate: [ RouteGuardService ]
    },
    { path: '*', redirectTo: 'login' }
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'});
