import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../_shared/shared.module";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { ModalModule } from "ngx-bootstrap/modal";
import { DxDataGridModule } from "devextreme-angular";
import { DxDateBoxModule, DxSelectBoxModule } from 'devextreme-angular';
import { PremiumBuyerComponent } from "./components/premium-buyer/premium-buyer.component";
import { CreateBuyerProfileComponent } from './components/create-buyer-profile/create-buyer-profile.component';
import {CreateSellerOpportunityComponent} from './components/create-seller-opportunity/create-seller-opportunity.component';
import { PremiumBuyerListComponent } from './components/premium-buyer-list/premium-buyer-list.component';
import { TabsModule } from "ngx-bootstrap/tabs";
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
//import { AssurancePlanService } from "./services/assurance-plan.service";
import { PremiumBuyerRoutingModule } from "./premium-buyer.routing.module";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { SellerComponent } from './components/seller/seller.component';
import { SellerListComponent } from './components/seller-list/seller-list.component';

@NgModule({
  declarations: [PremiumBuyerComponent, CreateBuyerProfileComponent, PremiumBuyerListComponent, SellerComponent, CreateSellerOpportunityComponent, SellerListComponent],
  imports: [
    CommonModule,
        SharedModule,
        PremiumBuyerRoutingModule,
        DxDataGridModule,
        DxDateBoxModule,
        DxSelectBoxModule,
        TabsModule.forRoot(),
        BsDatepickerModule.forRoot(),
        CollapseModule.forRoot(),
        ModalModule.forRoot(),
        TypeaheadModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
  ],
  exports: [PremiumBuyerListComponent,CreateBuyerProfileComponent, SellerComponent,CreateSellerOpportunityComponent, SellerListComponent],
  entryComponents: [],
  providers: [],
})
export class PremiumBuyerModule { }
