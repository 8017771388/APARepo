import { Component, OnInit } from "@angular/core";
import { MasterLibraryService } from "../../services/master-library.service";
import { CommunicationService } from "../../../_shared/services/communication.services";
import { UserInfo } from "../../../_shared/services/userInfo.service";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { AddDepartmentComponent } from "../../../_shared/components/add-department/add-department.component";

@Component({
    selector: "app-dealtype",
    templateUrl: "./dealtype.component.html",
    styleUrls: ["./dealtype.component.scss"],
})
export class DealTypeComponent implements OnInit {
    public currentUser: any;
    private reqObj: any = {
        departmentId: null,
        username: null,
    };
    public dealTypeList: any = { status: "", data: [] };
    public searchTxt: "";
    public coppiedDealType: any;
    public errMsg: string;
    public bsModalRef: BsModalRef;
    public coppiedDept: any = [];

    constructor(
        private masterLibraryService: MasterLibraryService,
        public modalService: BsModalService,
        private userInfo: UserInfo,
        private communicationService: CommunicationService
    ) {}

    ngOnInit() {
        this.currentUser = this.userInfo._currentUserFn();
        this.reqObj.username = this.currentUser.userName;
        this.getAllDealTypes();
    }

    getAllDealTypes() {
        //this.dealTypeList = this.masterLibraryService.getAllDealTypes();

        this.communicationService.displayLoader(true);
        this.masterLibraryService.getAllDealTypes().subscribe(
            (resp) => {
                this.dealTypeList = resp;
                if (this.dealTypeList.status != "success") {
                    this.dealTypeList.data = [];
                } else {
                    this.dealTypeList.data.forEach((dealType) => {
                        dealType.isCollapsed = false;
                    });
                    this.coppiedDealType = this.dealTypeList.data.map((x) =>
                        Object.assign({}, x)
                    );
                }
                this.communicationService.clearLoader();
            },
            function (err) {
                this.communicationService.clearLoader();
            }
        );
    }

    addDealType() {
        let initialState = {
            //currentUser : this.currentUser,
            //taskData: stage,
            title: "Add Deal Type",
            goalDetail: {},
            openFrom: "dept-page",
            //userType: this.userType,
        };

        this.bsModalRef = this.modalService.show(AddDepartmentComponent, {
            initialState,
            backdrop: "static",
            class: "modal-lg",
        });
        this.bsModalRef.content.closeBtnName = "Close";
        // this.bsModalRef.content.taskSavedHome.subscribe(value => {

        // })
    }

    checkDuplicateDT(dealType, i) {}

    updateDealType(dept) {}
}
