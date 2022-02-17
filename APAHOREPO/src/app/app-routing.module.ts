import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthenticationService } from "./modules/_shared/services/authentication.service";
import { ErrorComponent } from "./modules/error/component/error.component";
import { SignOutComponent } from "./modules/_shared/components/sign-out/sign-out.component";

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    {
        path: "home",
        loadChildren: () =>
            import("./modules/home/home.module").then((m) => m.HomeModule),
        //loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
        resolve: { auth: AuthenticationService },
    },
    {
        path: "admin",
        loadChildren: () =>
            import("./modules/admin/admin.module").then((m) => m.AdminModule),
        //loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
        resolve: { auth: AuthenticationService },
    },
    {
        path: "valuation",
        loadChildren: () =>
            import("./modules/valuation/valuation.module").then(
                (m) => m.ValuationModule
            ),
        //loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
        resolve: { auth: AuthenticationService },
    },
    {
        path: "master-library",
        loadChildren: () =>
            import("./modules/master-library/master-library.module").then(
                (m) => m.MasterLibraryModule
            ),
        //loadChildren: () => import('./modules/master-library/master-library.module').then(m => m.MasterLibraryModule),
        resolve: { auth: AuthenticationService },
    },
    {
        path: "assurance-plan",
        loadChildren: () =>
            import("./modules/assurance-plan/assurance-plan.module").then(
                (m) => m.AssurancePlanModule
            ),
        //loadChildren: () => import('./modules/master-library/master-library.module').then(m => m.MasterLibraryModule),
        resolve: { auth: AuthenticationService },
    },
    {
        path: "premium-buyer",
        loadChildren: () =>
            import("./modules/premium-buyer/premium-buyer.module").then(
                (m) => m.PremiumBuyerModule
            ),
        //loadChildren: () => import('./modules/master-library/master-library.module').then(m => m.MasterLibraryModule),
        resolve: { auth: AuthenticationService },
    },
    { path: "error", component: ErrorComponent, data: { title: "Error" } },
    { path: "signout", component: SignOutComponent },
    { path: "**", redirectTo: "/error" },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            useHash: false,
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
