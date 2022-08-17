import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'cargos',
        title: 'Cargos',
        loadChildren: () => import('./charges/pages/charges/charges.module').then(m => m.ChargesPageModule)
    },
    {
        path: 'servicios',
        title: 'Servicios',
        loadChildren: () => import('./works/pages/works/works.module').then(m => m.WorksPageModule)
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CatalogsRoutingModule { }
