import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AssurancePlanComponent } from "./components/assurance-plan/assurance-plan.component";
import { CreateProfileComponent } from "./components/create-profile/create-profile.component";
import { DirtyCheckGuard } from '../_shared/guards/dirty-check.guard';

const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: "assurance-plan-page",
    },
    {
        path: "assurance-plan-page",
        component: AssurancePlanComponent,
    },
    {
        path: "create-profile",
        component: CreateProfileComponent,
        canDeactivate : [DirtyCheckGuard]
    },
    {
        path: "create-profile/:id",
        component: CreateProfileComponent,
        canDeactivate : [DirtyCheckGuard]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AssurancePlanRoutingModule {}
