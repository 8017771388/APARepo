import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DirtyCheckGuard } from '../_shared/guards/dirty-check.guard';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { InitiateDealComponent } from './components/initiate-deal/initiate-deal.component';



const routes: Routes = [
    {
        path: '', pathMatch: 'full', redirectTo: 'admin-page'
    },
    {
        path: 'admin-page',
        component: AdminPageComponent
    },
    {
        path : 'create-deal/:id',
        component : InitiateDealComponent,
        canDeactivate : [DirtyCheckGuard]
    },
    {
        path : 'create-deal',
        component : InitiateDealComponent,
        canDeactivate : [DirtyCheckGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
