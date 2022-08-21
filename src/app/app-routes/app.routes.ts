import { Routes, RouterModule } from '@angular/router';


import { PageComponent } from '../features/primary/page/page.component';


const appRoutes: Routes = [
    { path: 'page/:id', component: PageComponent }
];

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(appRoutes);