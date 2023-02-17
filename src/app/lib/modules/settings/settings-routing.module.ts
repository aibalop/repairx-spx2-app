import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'mi-perfil',
        title: 'Mi Perfil',
        loadChildren: () => import('./pages/my-profile/my-profile.module').then(m => m.MyProfilePageModule)
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SettingsRoutingModule { }
