import { Injectable, NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PreloadAllModules, RouterModule, RouterStateSnapshot, Routes, TitleStrategy } from '@angular/router';
import { AuthGuard } from './lib/core/guards/auth.guard';
import { NotAuthGuard } from './lib/core/guards/not-auth.guard';
import { PanelLayoutComponent } from './lib/shared/layouts/panel-layout/panel-layout.component';

@Injectable({ providedIn: 'root' })
export class TemplatePageTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      this.title.setTitle(`RepairX | ${title}`);
    }
  }
}

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'inicio' },
  {
    path: 'auth',
    title: 'Autenticación',
    canActivate: [NotAuthGuard],
    loadChildren: () => import('./lib/modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    component: PanelLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'inicio',
        title: 'Inicio',
        loadChildren: () => import('./lib/modules/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'catalogos',
        loadChildren: () => import('./lib/modules/catalogs/catalogs.module').then(m => m.CatalogsModule)
      },
      {
        path: 'clientes',
        loadChildren: () => import('./lib/modules/customers/customers.module').then(m => m.CustomersModule)
      },
      {
        path: 'ordenes-reparacion',
        loadChildren: () => import('./lib/modules/order-repairs/order-repairs.module').then(m => m.OrderRepairsModule)
      },
      {
        path: 'configuraciones',
        loadChildren: () => import('./lib/modules/settings/settings.module').then(m => m.SettingsModule)
      },
    ]
  },
  // { path: '**', component: PathNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
  providers: [
    { provide: TitleStrategy, useClass: TemplatePageTitleStrategy },
  ]
})
export class AppRoutingModule { }
