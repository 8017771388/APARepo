import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { UserInfo } from "../../../_shared/services/userInfo.service";
import { AppSettings } from "../../../_shared/constants/api-constant";
import { Router, ActivatedRoute, Resolve } from "@angular/router";
import { Location } from "@angular/common";

@Component({
    selector: "app-side-bar",
    templateUrl: "./side-bar.component.html",
    styleUrls: ["./side-bar.component.scss"],
})
export class SideBarComponent implements OnInit {
    public status: any = false;
    public myTask = {};
    public alladvisor: string;
    public currentUser: any;
    public userRole: any;
    public navigationArray: any = [
        {
            name: "APA",
            isColapsed: false,
            subMenu: [
                {
                    name: "Home",
                    subMenu: [
                        {
                            name: "All Deals",
                            subMenu: [],
                            route: "home/matchingdeals",
                        },
                    ],
                },
                { name: "Admin", subMenu: [], route: "/admin" },
                {
                    name: "Master Library",
                    subMenu: [],
                    route: "master-library/master-library-page",
                },
            ],
        },
        {
            name: "Assurance Plan",
            isColapsed: false,
            subMenu: [
                { name: "Manage Plan", subMenu: [], route: "/assurance-plan" },
            ],
        },
    ];
    public isApa: boolean = true;
    public isHome: boolean = false;
    public isAdmin: boolean = false;
    public isMaster: boolean = false;
    public isError: boolean = false;
    public isAsp: boolean = false;

    @Output() navChange = new EventEmitter<any>();
    constructor(
        private userInfo: UserInfo,
        private router: Router,
        private acRoute: ActivatedRoute,
        public location: Location
    ) {
        this.currentUser = this.userInfo._currentUserFn();

        router.events.subscribe((val) => {
            // see also
            this.isAsp = false;
            this.isApa = false;
            this.isHome = false;
            var fullUrl = window.location.href;
            if (fullUrl.includes("apa")) this.isApa = true;
            else this.isApa = false;
            if (fullUrl.includes("home")) this.isHome = true;
            else this.isHome = false;
            if (fullUrl.includes("assurance-plan")) {
                this.isApa = false;
                this.isAsp = true;
            }
            if (fullUrl.includes("error")) {
                this.isError = true;
            }
            this.navigationArray[0].isColapsed = this.isApa;
            this.navigationArray[1].isColapsed = this.isAsp;
            //console.log(this.isApa, this.isHome);
        });
    }

    ngOnInit() {
        let url = this.router.url;
        console.log(this.acRoute.snapshot, this.router);
        console.log(this.router.routerState.snapshot);
        console.log(this.router.url);

        this.alladvisor = "mytasks";
        if (url.includes("mytasks")) this.alladvisor = "mytasks";
        else this.alladvisor = "matchingdeals";
    }

    clickEvent() {
        this.status = !this.status;
    }

    gridData(param) {
        this.alladvisor = param;
        //this.navChange.emit({'type':param});
        this.router.navigate(["/home/" + param]);
    }
}
