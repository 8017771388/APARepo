import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomeRoutingModule } from "./home.routing.module";
import { SharedModule } from "../_shared/shared.module";
import { BsDatepickerModule} from "ngx-bootstrap/datepicker";
import { CollapseModule } from 'ngx-bootstrap/collapse'
import { ModalModule }from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HomePageComponent } from "./components/home-page/home-page.component";
import { ViewDealService } from "./services/view-deal.service";
import { DxDataGridModule } from "devextreme-angular";
import { UiSwitchModule } from "ngx-ui-switch";
import { HomeService } from "./services/home.service";
import { TypeaheadModule } from "ngx-bootstrap/typeahead";
import { OrderModule } from "ngx-order-pipe";
//import { NgSelectModule } from "@ng-select/ng-select";
import { MatchingDealsComponent } from "./components/matching-deals/matching-deals.component";
import { MyTaskComponent } from "./components/my-task/my-task.component";
import { ViewDealsComponent } from "./components/view-deals/view-deals.component";
import { ViewDealNewComponent } from "./components/view-deal-new/view-deal-new.component";
import { TaskDetComponent } from "./components/task-det/task-det.component";
import { BuildDealComponent } from "./components/build-deal/build-deal.component";
import { MyDealsComponent } from "./components/my-deals/my-deals.component";

@NgModule({
    declarations: [
        HomePageComponent,
        MatchingDealsComponent,
        MyTaskComponent,
        ViewDealsComponent,
        ViewDealNewComponent,
        TaskDetComponent,
        BuildDealComponent,
        MyDealsComponent,
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        SharedModule,
        DxDataGridModule,
        BsDatepickerModule.forRoot(),
        CollapseModule.forRoot(),
        ModalModule.forRoot(),
        BsDropdownModule.forRoot(),
        UiSwitchModule.forRoot({
            size: "small",
            color: "#3f681c",
            switchColor: "#ffffff",
            defaultBgColor: "#ecebeb",
            defaultBoColor: "#094f00",
            checkedLabel: "Deselect",
            uncheckedLabel: "Select",
        }),
        TypeaheadModule.forRoot(),
        OrderModule,
       
    ],
    providers: [ViewDealService, HomeService],
    entryComponents: [],
})
export class HomeModule {}
