import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
    { path: '', loadChildren: () => import('./pages/home-dashboard/home-dashboard.module').then(m => m.HomeDashboardPageModule) },
    // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
