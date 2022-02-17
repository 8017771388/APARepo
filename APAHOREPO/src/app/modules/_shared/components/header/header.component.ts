import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Resolve } from "@angular/router";
import { APP_TITLE } from "../../constants/global.constant";
import { UserInfo } from "../../services/userInfo.service";
import { CommunicationService } from "../../services/communication.services";
import { Title } from "@angular/platform-browser";
import { HomeService } from '../../../home/services/home.service';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { NotificationComponent } from '../notification/notification.component';

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
    public appTitle: string = APP_TITLE;
    //private userIcon: string = 'assets/images/default.png';
    public userImageUrl: string;
    public userData: any;
    public userType: any;
    public showIcon: any;
    public showAPASubmenu: boolean;
    public showBSubmenu : boolean;
    public notificationCount: any;
    public allNotifications: any;
    public bsModalRef: BsModalRef;
    public currentUser: any;
    public showNotification: boolean = true;

    constructor(
        private router: Router,
        private userInfo: UserInfo,
        private communicationService: CommunicationService,
        private acRoute: ActivatedRoute,
        private titleService: Title,
        public homeService: HomeService,
        private modalService: BsModalService
    ) {
        router.events.subscribe((val) => {
            // see also
            this.appTitle = "M&A Solutions - Deal Execution";
            this.titleService.setTitle(
                "M&A Solutions - Deal Execution"
            );
            var fullUrl = window.location.href;
            console.log(fullUrl);
            if (fullUrl.includes("assurance-plan")) {
                this.showAPASubmenu = false;
                this.showBSubmenu = false;
                this.titleService.setTitle(
                    "M&A Solutions - Assurance Plan"
                );
                this.appTitle =
                    "M&A Solutions - Assurance Plan";
            }
            else if(fullUrl.includes("premium-buyer")) {
                this.showAPASubmenu = false;
                this.showBSubmenu = true;
                this.titleService.setTitle(
                    "M&A Solutions - Premium Buyer"
                );
                this.appTitle =
                    "M&A Solutions - Premium Buyer";
            }
            else {
                this.showAPASubmenu = true;
                this.showBSubmenu = false;
            }
        });

        this.communicationService.getUserInfo().subscribe(data => {
            if (data) {
                this.currentUser = data;
                this.getNotification();

            }
        });
        this.communicationService.getNotificationDeal().subscribe(data => {
            this.communicationService.getUserInfo().subscribe(data => {
                if (data) {
                    this.currentUser = data;
                    this.getNotification();

                }
            });
        })
    }

    ngOnInit() {
        //this.showAPASubmenu = true; 
        this.communicationService
            .getUserInfo()
            .subscribe((userData) => (this.userData = userData));
        if (this.userData) {
            this.userImageUrl = `http://mysites.corp.lpl.com/User%20Photos/Profile%20Pictures/${this.userData.userName}_LThumb.jpg`;
        }
        this.communicationService
            .getAccessType()
            .subscribe((userType) => {
                this.userType = userType;
                console.log(this.userType)
            });
        //console.log(' ewqrwer ewrwer wer wer werwer rew',this.userType);
        this.communicationService
            .getNotiIcon()
            .subscribe((showIcon) => (this.showIcon = showIcon));

    }

    placeholderUrl() {
        if (!this.userImageUrl) this.userImageUrl = "assets/img/default.png";
    }
    menuChange() {
        //this.showAPASubmenu = false;
    }

    signout() {
        this.router.navigate(["/signout"]);
    }

    getNotification() {

        // if(this.currentUser == null){
        //     this.currentUser = this.userInfo._currentUserFn();
        // }

        this.homeService.getAllNotifications(this.currentUser.userName).subscribe(res => {
            if (res) {
                this.allNotifications = JSON.parse(JSON.stringify(res["data"].dealList));
                this.notificationCount = this.allNotifications.filter(element => element.dealInfo.notification.readFlag == 'U').length;
                this.showNotification = true;
            }
        }, (err) => {

        })

    }

    openNotification() {
        this.showNotification = false;
        let initialState = {
            //currentUser : this.currentUser,
            //taskData: stage,
            title: "Notifications",
            openFrom: "view-deal",
            //userType: this.userType,
        };

        this.bsModalRef = this.modalService.show(NotificationComponent, {
            initialState,
            backdrop: "static",
            class: "modal-lg",
        });
        this.bsModalRef.content.closeBtnName = "Close";
        this.bsModalRef.content.notificationClosed.subscribe((value) => {
            if (value) {
                this.getNotification();
            }
        });

    }
}
