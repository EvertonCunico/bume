import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AutenticacaoGuardService } from './shared/services/seguranca/autenticacao-guard.service';
import { AdminGuardService } from './shared/services/seguranca/admin-guard.service';
import { RouteGuardService } from './shared/services/seguranca/route-guard.service';
import { LoginComponent } from './autenticacao/login/login.component';
import { EsqueciSenhaComponent } from './autenticacao/login/esqueci-senha/esqueci-senha.component';

export const routes: Routes = [
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
        canActivate: [ AutenticacaoGuardService, AdminGuardService ]
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

export const AppRoutes: ModuleWithProviders<any> = RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'});
