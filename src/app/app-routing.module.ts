import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './lib/core/guards/auth.guard';
import { NotAuthGuard } from './lib/core/guards/not-auth.guard';
import { PanelLayoutComponent } from './lib/shared/layouts/panel-layout/panel-layout.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'auth',
    canActivate: [NotAuthGuard],
    loadChildren: () => import('./lib/modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    component: PanelLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        loadChildren: () => import('./lib/modules/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
    ]
  },
  // { path: '**', component: PathNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
