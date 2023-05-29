import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
    {   path: '',
        redirectTo: 'unauthorized',
        pathMatch: 'full'
    },
    {
        path: 'unauthorized',
        loadChildren: () => import('./unauthorized/unauthorized.module').then(m => m.UnauthorizedModule),
    },
    {
        path: 'authorized',
        loadChildren: () => import('./authorized/authorized.module').then(m => m.AuthorizedModule),
        canLoad: [AuthGuard]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
