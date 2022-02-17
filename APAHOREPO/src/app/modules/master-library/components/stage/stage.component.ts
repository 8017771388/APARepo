import { Component, OnInit } from "@angular/core";
import { MasterLibraryService } from "../../services/master-library.service";
import { CommunicationService } from "../../../_shared/services/communication.services";
import { UserInfo } from "../../../_shared/services/userInfo.service";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { AddStageComponent } from "../../../_shared/components/add-stage/add-stage.component";

@Component({
    selector: "app-stage",
    templateUrl: "./stage.component.html",
    styleUrls: ["./stage.component.scss"],
})
export class StageComponent implements OnInit {
    //isCollapsed = false;
    constructor(
        private masterLibraryService: MasterLibraryService,
        private communicationService: CommunicationService,
        private userInfo: UserInfo,
        private modalService: BsModalService
    ) {}

    public dealtypeList: any = { status: "", data: [] };
    public currentUser: any;
    private updateCatReqObj: any = {
        categoryid: null,
        category: null,
        purpose: null,
        username: null,
    };
    public statusObj: any;
    public errorMessage: string;
    public bsModalRef: BsModalRef;
    public coppiedstage: any;
    public errMsg: string;
    public searchTxt: string = "";
    public dealType: any;
    public stageList: any = { status: "", data: [] };
    public stageSearched: boolean = false;
    public deal: string = "";
    public selectedDealType: any = "";

    ngOnInit() {
        this.currentUser = this.userInfo._currentUserFn();
        this.updateCatReqObj.username = this.currentUser.userName;
        this.getAllDealtypes();
    }

    getAllDealtypes() {
        //this.communicationService.displayLoader(true);
        // this.masterLibraryService.getAllDealtypes().subscribe((resp) => {
        //     this.categoryList = resp;
        //     if (this.categoryList.status != "success") {
        //         this.categoryList.data = [];
        //     }
        //     this.communicationService.clearLoader();
        // });
        //this.dealtypeList = this.masterLibraryService.getAllDealTypes();
        //console.log(this.dealtypeList);

        this.communicationService.displayLoader(true);
        this.masterLibraryService.getAllDealTypes().subscribe(
            (resp) => {
                this.dealtypeList = resp;
                if (this.dealtypeList.status != "success") {
                    this.dealtypeList.data = [];
                } else {
                    this.dealtypeList.data.forEach((dealType) => {
                        dealType.isCollapsed = false;
                    });
                    //this.selectedDealType = this.dealtypeList.data[0].dealTypeID;
                    //this.getSatges(this.selectedDealType, this.searchTxt);
                }
                this.communicationService.clearLoader();
            },
            function (err) {
                this.communicationService.clearLoader();
            }
        );
    }

    getSatges(event, searchTxt) {
        this.communicationService.displayLoader(true);
        var dealTyepId = 0;
        ////console.log(this.dealType);
        if (this.selectedDealType) {
            //this.dealType = {};
            dealTyepId = this.selectedDealType ? this.selectedDealType : 0;
        }
        if (searchTxt == null) {
            this.searchTxt = "";
            this.stageSearched = false;
        } else {
            this.stageSearched = true;
        }
        if (dealTyepId && dealTyepId > 0) {
            this.masterLibraryService.getAllStages(dealTyepId).subscribe(
                (resp) => {
                    this.stageList = resp;
                    if (this.stageList.status != "success") {
                        this.stageList.data = [];
                        this.communicationService.clearLoader();
                    } else {
                        this.stageList.data.forEach((stage) => {
                            stage.isCollapsed = false;
                        });
                        this.coppiedstage = this.stageList.data.map((x) =>
                            Object.assign({}, x)
                        );
                        this.communicationService.clearLoader();
                    }
                    this.communicationService.clearLoader();
                },
                function (err) {
                    this.communicationService.clearLoader();
                }
            );
        }
        else{
            this.stageList.data = [];
        }

        this.communicationService.clearLoader();

        // this.stageList = this.masterLibraryService.getAllStages(
        //     dealTyepId,
        //     searchTxt
        // );
        // this.stageList.data.forEach((goal) => {
        //     goal.isCollapsed = false;
        // });
        // console.log(this.stageList);
        // this.coppiedstage = this.stageList.data.map((x) =>
        //     Object.assign({}, x)
        // );
        // console.log(this.coppiedstage);
    }

    searchWithTxt(e: any) {
        if (e.keyCode == 13) {
            var dealTypeId;
            if (!this.selectedDealType) {
                dealTypeId = 0;
            } else {
                dealTypeId = this.selectedDealType.dealTypeId;
            }
            this.getSatges(dealTypeId, this.searchTxt);
        }
    }

    updateStage(stage) {}

    addStage() {
        let initialState = {
            //currentUser : this.currentUser,
            //taskData: stage,
            title: "Add Stage",
            goalDetail: {},
            openFrom: "stage-page",
            //userType: this.userType,
        };

        this.bsModalRef = this.modalService.show(AddStageComponent, {
            initialState,
            backdrop: "static",
            class: "modal-lg",
        });
        this.bsModalRef.content.closeBtnName = "Close";
        // this.bsModalRef.content.taskSavedHome.subscribe(value => {

        // })
    }

    deleteSatge(stage) {}
}
