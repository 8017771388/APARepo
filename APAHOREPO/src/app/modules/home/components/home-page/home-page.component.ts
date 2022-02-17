import { Component, OnInit, AfterViewInit, DoCheck } from "@angular/core";
import { UserInfo } from "../../../_shared/services/userInfo.service";

import { CommunicationService } from "../../../_shared/services/communication.services";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
    selector: "app-home-page",
    templateUrl: "./home-page.component.html",
    styleUrls: ["./home-page.component.scss"],
    providers: [],
})
export class HomePageComponent implements OnInit, AfterViewInit, DoCheck {
    public totalCount: number;
    public totalCountNames: string;
    public totalCountName: string;
    public param: any;
    public gridType: string = "";
    public currentUser: any;
    public currentView: string = "T";
   
    public userType: any;
    private routeSub: Subscription;
    public searchText: string;

    dataSource: any = {};
    constructor(
        private communicationService: CommunicationService,
        private userinfo: UserInfo,
        private router: Router,
        private acRoute: ActivatedRoute
    ) {}
    ngDoCheck(): void {}
    ngAfterViewInit(): void {}
    public switchView: boolean = true;
    ngOnInit() {
        this.communicationService.hideNotiIcon();
        this.communicationService
            .getAccessType()
            .subscribe((userType) => (this.userType = userType));
        console.log(this.userType)
        this.gridType = "mytasks";
        this.totalCountName = this.gridType;
        this.currentUser = this.userinfo._currentUserFn();

        let url = this.router.url;
        if (url.includes("mytasks")) {
            this.routeSub = this.acRoute.params.subscribe((params) => {
                console.log(params); //log the entire params object
                if (params["id"]) {
                    //log the value of id
                    this.gridType = "taskdetails";
                } else {
                    this.gridType = "mytasks";
                }
            });
        } else if (url.includes("mydeals")) {
            this.gridType = "mydeals";
        } else this.gridType = "matchingdeals";
    }

    // navHandler(cevent){
    //   this.gridType = cevent.type;
    //   this.changeDetector.detectChanges();
    //   //this.clearDates();
    // }

    switchViewFunc(currView) {
        if (this.currentView != currView) {
            this.currentView = currView;
            this.switchView = !this.switchView;
        }
    }
}
