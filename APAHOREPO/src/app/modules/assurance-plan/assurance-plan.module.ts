import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../_shared/shared.module";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { ModalModule } from "ngx-bootstrap/modal";
import { DxDataGridModule } from "devextreme-angular";
import { AssurancePlanComponent } from "./components/assurance-plan/assurance-plan.component";
import { TabsModule } from "ngx-bootstrap/tabs";
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { AssurancePlanService } from "./services/assurance-plan.service";
import { AssurancePlanRoutingModule } from "./assurance-plan.routing.module";
import { AssurancePlanListComponent } from "./components/assurance-plan-list/assurance-plan-list.component";
import { CreateProfileComponent } from './components/create-profile/create-profile.component';
import { AdvisorService } from "../admin/services/advisor.service";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [AssurancePlanComponent, AssurancePlanListComponent, CreateProfileComponent],
    imports: [
        CommonModule,
        SharedModule,
        AssurancePlanRoutingModule,
        DxDataGridModule,
        TabsModule.forRoot(),
        BsDatepickerModule.forRoot(),
        CollapseModule.forRoot(),
        ModalModule.forRoot(),
        TypeaheadModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [AssurancePlanListComponent,CreateProfileComponent],
    entryComponents: [],
    providers: [AssurancePlanService, AdvisorService],
})
export class AssurancePlanModule {}
