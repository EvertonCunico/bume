import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';

import { ProgramaComponent } from '@boom/ui/programa/programa.component';
import { RegistroResolverService } from '@boom/services/programa/registro-resolver.service';
import { AutofocusModule } from '@boom/ui/autofocus/autofocus.module';
import { RotuloModule } from '@boom/ui/rotulo/rotulo.module';
import { FormToolbarModule } from '@boom/ui/form-toolbar/form-toolbar.module';
import { FormControlesModule } from '@boom/ui/form-controles/form-controles.module';
import { ManutencaoModule } from '@boom/ui/manutencao/manutencao.module';
import { ProgramaModule } from '@boom/ui/programa/programa.module';

import { ProgramaCrudOptions } from './programa-crud-options';
import { PesquisaModule } from '@boom/ui/pesquisa/pesquisa.module';

/**
 * Módulo padrão para programas CRUD com Pesquisa e Manutenção/Visualização
 * Configuração do ProgramaCrud
 * Este módulo já configura as rotas filhas padrões:
 *    - /pesquisa: página de pesquisa
 *    - /novo: criação de novos registros
 *    - /id: edição do registro de id = id
 * e importa vários módulos paddrões:
 *    - CommonModule
 *    - ReactiveFormsModule
 *    - PesquisaModule
 *    - CardModule
 *    - RotuloModule
 *    - AutofocusModule
 *    - FormToolbarModule
 *    - FormControlesModule
 *    - ManutencaoModule
 *    - ProgramaModule
 */
@NgModule({
  exports: [
    CommonModule,
    ReactiveFormsModule,
    PesquisaModule,
    CardModule,
    RotuloModule,
    AutofocusModule,
    FormToolbarModule,
    FormControlesModule,
    ManutencaoModule,
    ProgramaModule,
  ]
})
export class ProgramaCrudModule {

  static config(options?: ProgramaCrudOptions): ModuleWithProviders<ProgramaCrudModule> {

    var providersModulo = RouterModule.forChild([
      {
        path: '',
        component: ProgramaComponent,
        children: [
          { path: 'pesquisa', component: options?.pesquisa },
          { path: 'novo', component: options?.manutencao },
          { path: 'relatorio', component: options?.relatorio },
          {
            path: ':id',
            component: options?.manutencao,
            data: {
              url: options?.url
            },
            resolve: {
              registro: RegistroResolverService
            }
          },
          { path: '', redirectTo: 'pesquisa', pathMatch: 'full' }
        ]
      }
    ]).providers;

    if (providersModulo == null) {
      providersModulo = [];
    }

    return ({
      ngModule: ProgramaCrudModule,
      providers: [
        providersModulo
      ]
    });

  }

}
