import { Component, OnInit } from "@angular/core";
import { CommunicationService } from "../../../_shared/services/communication.services";

@Component({
    selector: "app-assurance-plan",
    templateUrl: "./assurance-plan.component.html",
    styleUrls: ["./assurance-plan.component.scss"],
})
export class AssurancePlanComponent implements OnInit {
    public currentTab: any;

    constructor(private communicationService: CommunicationService) {
        this.currentTab = "AssurancePlan";
    }

    ngOnInit() {
        this.communicationService.hideNotiIcon();
    }

    adminRoute(event) {}
}
