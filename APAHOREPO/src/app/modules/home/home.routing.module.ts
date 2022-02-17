import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomePageComponent } from "./components/home-page/home-page.component";
import { CreateTasksComponent } from "../_shared/components/create-tasks/create-tasks.component";
import { ViewDealsComponent } from "./components/view-deals/view-deals.component";
import { ViewDealNewComponent } from "./components/view-deal-new/view-deal-new.component";
import { TaskDetComponent } from "./components/task-det/task-det.component";
import { BuildDealComponent } from "./components/build-deal/build-deal.component";
import { DirtyCheckGuard } from "../_shared/guards/dirty-check.guard";


//import { AuthGuardService } from '../_shared/guards/auth.guard';

const routes: Routes = [
    // {
    //     path: '', pathMatch: 'full', redirectTo: 'home-page'
    // },
    
    {
        path: "",
        component: HomePageComponent,
    },    
    {
        path: "view-deals",
        component: ViewDealsComponent,
    },
    {
        path: "build-deal/:dealID/:dealTypeID",
        component: BuildDealComponent,
        canDeactivate: [DirtyCheckGuard]
    },
    {
        path: "view-deals-new/:dealID/:dealTypeID",
        component: ViewDealNewComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeRoutingModule {}
