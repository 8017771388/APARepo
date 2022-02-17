import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StageComponent } from './components/stage/stage.component';
import { MasterLibraryPageComponent } from './components/master-library-page/master-library-page.component';
//import { AuthGuardService } from '../_shared/guards/auth.guard';
//import { ADMIN, GUEST } from '../_shared/constants/global.constant';



const routes: Routes = [
    {
        path: 'stage',
        component: StageComponent
    },
    {
        path: 'master-library-page',
        component: MasterLibraryPageComponent
        
       
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MasterLibraryRoutingModule { }
