import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {
        path: 'genericComponent',
        loadChildren: () => import('./features/generic-component/generic-component.module').then(m => m.GenericComponentModule),
    },
    {
        path: '**',
        redirectTo: 'genericComponent',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
      RouterModule.forRoot(routes)
    ],
    exports: [RouterModule],
  })
  export class AppRoutingModule { }