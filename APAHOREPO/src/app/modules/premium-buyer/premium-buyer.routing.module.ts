import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PremiumBuyerComponent } from './components/premium-buyer/premium-buyer.component';
import { CreateBuyerProfileComponent } from './components/create-buyer-profile/create-buyer-profile.component';
import { DirtyCheckGuard } from '../_shared/guards/dirty-check.guard';
import { SellerComponent } from './components/seller/seller.component';
import { CreateSellerOpportunityComponent } from './components/create-seller-opportunity/create-seller-opportunity.component';

const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: "premium-buyer-page",
    },
    {
        path: "premium-buyer-page",
        component: PremiumBuyerComponent,
    },
    {
        path: "premium-buyer-page/create-profile",
        component: CreateBuyerProfileComponent,
        canDeactivate : [DirtyCheckGuard]
    },
    {
        path: "premium-buyer-page/create-profile/:id",
        component: CreateBuyerProfileComponent,
        canDeactivate : [DirtyCheckGuard]
    },
    {
        path: "seller",
        component: SellerComponent,
    },
    {
        path: "seller/create-opportunity",
        component: CreateSellerOpportunityComponent,
        canDeactivate : [DirtyCheckGuard]
    },
    {
        path: "seller/create-opportunity/:id",
        component: CreateSellerOpportunityComponent,
        canDeactivate : [DirtyCheckGuard]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PremiumBuyerRoutingModule {}
