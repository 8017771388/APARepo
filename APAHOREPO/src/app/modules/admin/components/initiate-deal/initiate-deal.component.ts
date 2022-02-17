import {
    Component,
    OnInit,
    Output,
    EventEmitter,
    ElementRef,
    ViewChild,
    HostListener,
} from "@angular/core";
import { Observable, Observer, of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { TypeaheadMatch } from "ngx-bootstrap/typeahead";
import { OrderPipe } from "ngx-order-pipe";
import { DealService } from "../../services/deal.service";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { ConfirmModalComponent } from "../../../_shared/components/confirm-modal/confirm-modal.component";
import { CommunicationService } from "../../../_shared/services/communication.services";
import { Router, ActivatedRoute, Resolve } from "@angular/router";
import { Location } from "@angular/common";
import { STAGES, DEALSTATUS } from "../../../_shared/constants/global.constant";
import { FormGroup, FormControl, FormArray, FormBuilder } from "@angular/forms";
import { HomeService } from "../../../home/services/home.service";
import { DatePipe } from "@angular/common";
import { ToastrService } from "ngx-toastr";
import { UserInfo } from "../../../_shared/services/userInfo.service";
import { DirtyComponent } from '../../../_shared/models/dirty-component';

declare var jQuery: any;

interface DataSourceType {
    username: string;
    fullName: string;
    firstName: string;
    middleName: string;
    lastName: string;
    adGroup: any;
    email: string;
}

interface AdvisorDataType {
    repID: string;
    fullName: string;
    firstName: string;
    middleName: string;
    lastName: string;
    hireDate: number;
    repIdWithName: string;
    email: string;
}

@Component({
    selector: "app-initiate-deal",
    templateUrl: "./initiate-deal.component.html",
    styleUrls: ["./initiate-deal.component.scss"],
    host: {
        "(document:click)": "onClickOutside($event)",
    },
    providers: [DatePipe],
})
export class InitiateDealComponent implements OnInit, DirtyComponent {
    // @ViewChild("buyerSellerButton") buyerSellerButton: ElementRef;
    // @HostListener allows us to also guard against browser refresh, close, etc.
    @HostListener('window:beforeunload')
    public dataSource: Observable<AdvisorDataType[]>;
    public advisorDateSource: Observable<DataSourceType[]>;
    public searchedDealSpecialist: string = "";
    public advisor: any;
    public repId: string;
    public advisorName: string;
    public noResult: boolean = false;
    public dealSpecialistSelected: boolean = true;
    public advisorSelected: boolean = false;
    public checkSelectedDS: boolean = false;
    public checkSelectedAD: boolean = false;
    public pageHeading: string = "Deal Initiation";
    public bsModalRef: BsModalRef;
    typeaheadLoading: boolean;
    public dealSpecialist: any;
    public advisorList: any;
    public allStages: any = STAGES;
    public allStatus: any = DEALSTATUS;
    public editDealFrom: string = "";
    public editDealName: string = "";
    public isDirtyDup: boolean = false;
    public changedDealType: any;
    public dealDet: any = {
        advisorRole: "",
        dealID: "",
        dealName: "",
        dealSpecialist: "",
        dealType: "LPL to LPL Acquisition",
        dealTypeID: 0,
        dealStageID: 1,
        dealStage: "Discovery",
        dealStartDate: null,
        startDate: new Date(),
        dealTargetEndDate: null,
        dealStatus: "",
        dealStatusCd: "",
        note: [],
        advisors: [{ advisorName: "", repId: "", advisorRole: "" }],
    };
    public buyerSellerList: any = [];

    public minDate: Date;
    public statustoBeChanged: "";

    public duplicateDeal: any = 0;

    advisorForm: FormGroup;
    public typAhedResList: any = [];
    public resp: any;
    public advisorsValidation: any = [];
    public advNoResult: any = [];
    public borderColor: any = [];
    public userInfo: any;
    public validAdvisor: boolean = false;
    public currentUser: any;
    optionOnBlur: any;

    public savedDataArray: any = {
        username: "",
        dealJson: {
            masterAdvisorList: [],
            dealSpecialistInfo: {
                homeOfficeUserID: 0,
                username: "",
                firstName: "",
                middleName: "",
                lastName: "",
                roleCd: "",
                email: "",
            },
            dealInfo: {
                dealID: 0,
                dealName: this.dealDet.dealName,
                dealTypeID: 0,
                dealStartDate: this.dealDet.startDate,
                dealTargetEndDate: this.dealDet.endDate,
                dealStatusCd: "INPR",
                dealStageID: 1,
                dealFolderBoxID: "",
                buyerFolderID: "",
                sellerFolderID: "",
            },
            dealNotes: {
                note: "",
                isInternal: 1,
                noteLevel: "DL",
                isActive: 1,
                readFlag: "R",
                createdByName: "",
            },
        },
    };

    public getDealParam: any = {
        CurrentViewIdentifier: 0,
        CurrentPageNumber: 1,
        PageSize: 1,
        OrderByColumns: [
            {
                ColumnName: "",
                SortOrder: 1,
                Sequence: 1,
            },
        ],
        GridDataFilter: {
            ColumnFilterList: [
                {
                    Name: "deal",
                    ValueFilter: ["1"],
                },
            ],
        },
        username: "",
        searchString: "",
    };
    isDirty = false;
    public isPlanCreated : boolean = false;

    constructor(
        private dealService: DealService,
        private cs: CommunicationService,
        private modalService: BsModalService,
        private router: Router,
        private acRoute: ActivatedRoute,
        private location: Location,
        private fb: FormBuilder,
        public _elmref: ElementRef,
        private homeService: HomeService,
        private datePipe: DatePipe,
        private toastr: ToastrService,
        private userInfo1: UserInfo
    ) {
        this.minDate = new Date();
        this.advisorForm = this.fb.group({
            buyerSeller: this.fb.array([]),
        });
    }

    //@Output() communicateOnSave = new EventEmitter<any>();

    ngOnInit() {
        //this.cs.setIsDirty(false);
        this.cs.clearIsDirty();
        this.cs.displayLoader(true);
        this.currentUser = this.userInfo1._currentUserFn();
        this.cs.getUserInfo().subscribe((userinfo) => {
            this.userInfo = userinfo;
            // this.savedDataArray.dealJson.dealSpecialistInfo = {
            //     homeOfficeUserID: 1,
            //     username: "",
            //     firstName: "",
            //     middleName: "",
            //     lastName: "",
            //     roleCd: "DS",
            //     email: "",
            // };
            this.savedDataArray.username = this.userInfo.userName;
            //this.canDeactivate().isDirty = false;
        });

        this.savedDataArray.username = this.userInfo.userName;
        //console.log(this.userInfo);
        this.typAhedResList[0] = [];
        this.addAdvisor();

        this.dataSource = Observable.create((observer: Observer<string>) =>
            observer.next(this.repId)
        ).pipe(
            mergeMap((token: string) => this.dealService.searchAdvisor(token))
        );

        this.acRoute.params.subscribe((params) => {
            //console.log(params); //log the entire params object
            if (params["id"]) {
                this.pageHeading = "Edit Deal";
                this.getDealParam = {
                    CurrentViewIdentifier: 0,
                    CurrentPageNumber: 1,
                    PageSize: 1,
                    OrderByColumns: [
                        {
                            ColumnName: "",
                            SortOrder: 1,
                            Sequence: 1,
                        },
                    ],
                    GridDataFilter: {
                        ColumnFilterList: [
                            {
                                Name: "deal",
                                ValueFilter: [params["id"]],
                            },
                        ],
                    },
                    username: this.userInfo.userName,
                    searchString: "",
                };
                this.cs
                    .getEditDealFrom()
                    .subscribe(
                        (editDealFrom) => (this.editDealFrom = editDealFrom)
                    );

                this.homeService
                    .getDealList(this.getDealParam)
                    .subscribe((result) => {
                        if (result["status"] == "success") {
                            //var result = this.homeService.getMatchingDealsData("");

                            let data = result["data"].dealList[0];
                            console.log(data.totalTask);
                            if(data.totalTask > 0){
                                this.isPlanCreated = true;
                            }
                            this.editDealName = data.dealName;
                            this.changedDealType = data.dealTypeID;
                            this.dealDet = {
                                advisorRole: data.advisorRole,
                                dealID: data.dealID,
                                dealName: data.dealName,
                                dealSpecialist: "",
                                dealType: data.dealType,
                                dealTypeID: data.dealTypeID,
                                dealStageID: data.dealStageID,
                                dealStage: data.dealStage,
                                dealStartDate: data.dealStartDate
                                    ? new Date(data.dealStartDate)
                                    : null,
                                startDate: data.dealStartDate
                                    ? new Date(data.dealStartDate)
                                    : null,
                                dealTargetEndDate: data.dealTargetEndDate
                                    ? new Date(data.dealTargetEndDate)
                                    : null,
                                endDate: data.dealTargetEndDate
                                    ? new Date(data.dealTargetEndDate)
                                    : null,
                                dealStatus: data.dealStatus,
                                dealStatusCd: data.dealStatusCd,
                                notes: data.dealSpecialistInfo.notes,
                                note: "",
                                advisors: data.dealSpecialistInfo.advisors,
                                boxLink: data.boxLink,
                            };
                            this.typAhedResList =
                                data.dealSpecialistInfo.advisors;
                            this.searchedDealSpecialist =
                                data.dealSpecialistInfo.dsFullName;

                            this.savedDataArray = {
                                username: this.userInfo.userName,
                                dealJson: {
                                    masterAdvisorList: [],
                                    dealSpecialistInfo: {
                                        homeOfficeUserID:
                                            data.dealSpecialistInfo
                                                .homeOfficeUserID,
                                        username:
                                            data.dealSpecialistInfo.dsUsername,
                                        firstName:
                                            data.dealSpecialistInfo.dsFirstName,
                                        middleName:
                                            data.dealSpecialistInfo
                                                .dsMiddleName,
                                        lastName:
                                            data.dealSpecialistInfo.dsLastName,
                                        roleCd: data.dealSpecialistInfo.roleCd,
                                        email: data.dealSpecialistInfo.dsEmail,
                                    },
                                    dealInfo: {
                                        dealID: 0,
                                        dealName: data.dealName,
                                        dealTypeID: data.dealID,
                                        dealStartDate: this.dealDet.startDate,
                                        dealTargetEndDate: this.dealDet.endDate,
                                        dealStatusCd: data.dealStatusCd,
                                        dealStageID: data.dealStageID,
                                    },
                                    dealNotes: {
                                        note: this.dealDet.note,
                                        isInternal: 1,
                                        noteLevel: "DL",
                                        isActive: 1,
                                        readFlag: "R",
                                        createdByName: this.currentUser
                                            .displayName,
                                    },
                                },
                            };

                            this.dealDet.advisors.forEach((adv, i) => {
                                //console.log(this.advisorsValidation[i]);

                                if (i != 0) {
                                    this.buyerSeller().push(
                                        this.newBuyerSeller()
                                    );
                                    this.advisorsValidation.push({
                                        advisorName: false,
                                        repId: false,
                                        advisorRole: false,
                                    });
                                } else {
                                    this.advisorsValidation[i] = {
                                        advisorName: false,
                                        repId: false,
                                        advisorRole: false,
                                    };
                                }
                                this.advisorForm.controls["buyerSeller"][
                                    "controls"
                                ][i].patchValue({
                                    repId: adv.repId,
                                    advisorName: adv.advisorName,
                                    advisorRole: adv.advisorRole
                                        ? adv.advisorRole
                                        : "Buyer",
                                    maSolutionsCWStatus:
                                        adv.maSolutionsCWStatus == 0
                                            ? "Access Off"
                                            : adv.maSolutionsCWStatus == 1
                                            ? "Access On"
                                            : "",
                                });
                                this.savedDataArray.dealJson.masterAdvisorList.push(
                                    {
                                        repID: adv.repId,
                                        masterRepID: adv.repId,
                                        firstName: adv.repFirstName,
                                        middleName: adv.repMiddleName,
                                        lastName: adv.repLastName,
                                        isActive: 1,
                                        email: adv.repEmail,
                                        repUsername: adv.repUsername,
                                        isTerminated: 0,
                                        hireDate: adv.hireDate,
                                        isNewAdvisor: adv.isNewAdvisor,
                                        isAdvisorsPartOfAnotherDeal:
                                            adv.isAdvisorsPartOfAnotherDeal,
                                        advisorRole: adv.advisorRole
                                            ? adv.advisorRole
                                            : "Buyer",
                                    }
                                );
                                this.advNoResult.push("");
                                this.borderColor.push(false);
                            });
                            this.validAdvisor = true;
                            this.advisorSelected = true;
                            this.statustoBeChanged = this.dealDet.dealStatusCd;
                            console.log(this.savedDataArray);
                            this.cs.clearLoader();
                        } else {
                            console.log(result);
                            this.cs.clearLoader();
                        }
                    });

                //this.dealDet.dealName = this.this.searchedDealSpecialist = this.dealDet.dealSpecialist;
                //this.dealSpecialistSelected = false;

                // this.dealDet.startDate = this.dealDet.startDate
                //     ? new Date(this.dealDet.startDate)
                //     : new Date();
            } else {
                this.dealDet.startDate = this.dealDet.startDate
                    ? new Date(this.dealDet.startDate)
                    : new Date();
                this.dealDet.dealStatusCd = "INPR";
                this.statustoBeChanged = this.dealDet.dealStatusCd;
                this.cs.clearLoader();
            }
        });

        this.advisorDateSource = Observable.create(
            (observer: Observer<string>) => {
                observer.next(this.searchedDealSpecialist);
            }
        ).pipe(
            mergeMap((token: string) => {
                this.dealSpecialistSelected = false;
                if (
                    this.searchedDealSpecialist != null &&
                    this.searchedDealSpecialist.length > 0
                ) {
                    return this.dealService.searchDealSpecialists(token);
                } else {
                    this.dealSpecialistSelected = true;
                    this.emptyDealSpecialistArray();
                    return this.dealService.searchDealSpecialists(" ");
                }
            })
        );

        this.minDate.setDate(this.dealDet.startDate.getDate() + 1);

        //(function ($) {
        //    $(document).ready(function(){
        //        $("input[type='text']").keypress(function(){                    
        //            this.isDirty = true;
        //            //this.isDirtyDup = true;
                    
        //            console.log(this.isDirty);
        //        });
        //    });
        //})(jQuery);
       
        //    this.cs.setIsDirty(this.isDirty);
        //console.log(this.isDirty);
    }
    onDealTypeChange(event){
        console.log(event);
        
        this.dealDet.dealTypeID = event;
                
    }
    onModelChange(modal: any) {
        this.cs.setIsDirty(true);
    }
    canDeactivate() {
        console.log(this.cs.getIsDirty());

        this.cs.getIsDirty().subscribe((dirty) => {
            this.isDirtyDup = dirty;
        });
        //this.cs.setIsDirty(true);
        //this.isDirtyDup = true;
        //this.cs.clearIsDirty();
        return this.isDirtyDup;
    }

    onClickOutside(event) {
        //console.log(event);

        //console.log(event.target);
        if (event.srcElement.localName == "button") {
            event.preventDefault();
            event.stopPropagation();
        }

        if (event.type == "click" && event.srcElement.localName != "button") {
            var flagExists = false;
            event.target.classList.forEach((val) => {
                //console.log(val);
                if (val == "custom-typeahed") flagExists = true;
            });

            if (flagExists) event.stopPropagation();
            else {
                //console.log(this.typAhedResList);
                this.typAhedResList.forEach((val, i) => {
                    this.typAhedResList[i] = [];
                });
            }
        }
    }

    buyerSeller(): FormArray {
        return this.advisorForm.get("buyerSeller") as FormArray;
    }

    newBuyerSeller(): FormGroup {
        return this.fb.group({
            repId: "",
            advisorName: "",
            advisorRole: "",
            maSolutionsCWStatus: "",
        });
    }

    addAdvisor() {
        this.buyerSeller().push(this.newBuyerSeller());
        this.typAhedResList[this.typAhedResList.length] = [];
        this.advisorsValidation.push({
            advisorName: true,
            repId: true,
            advisorRole: true,
        });
        this.advNoResult.push("");
        this.borderColor.push(false);
        this.validAdvisor = false;
        this.cs.setIsDirty(true);
    }

    searchRepID(token, i, event) {
        console.log(event, token, i);
        if (token.value.repId == "") {
            this.advNoResult[i] = "";
            this.borderColor[i] = true;
            this.advisorForm.controls["buyerSeller"]["controls"][i].patchValue({
                repId: "",
                advisorName: "",
                maSolutionsCWStatus: "",
            });
            this.savedDataArray.dealJson.masterAdvisorList.splice(i, 1);
        } else {
            this.borderColor[i] = false;
            if (
                (event.keyCode >= 48 && event.keyCode <= 57) ||
                (event.keyCode >= 65 && event.keyCode <= 90) ||
                event.keyCode == 8 ||
                event.keyCode == 46
            ) {
                this.advisorsValidation[i].advisorName = true;
                this.advisorsValidation[i].repId = true;
                this.typAhedResList[i] = [];
                this.validAdvisor = false;
                this.dealService
                    .searchAdvisor(token.value.repId)
                    .subscribe((result) => {
                        this.resp = result["advisors"];
                        if (this.resp.length > 0) {
                            this.resp.forEach((val, i) => {
                                var searchVal = token.value.repId;
                                const newvalue =
                                    "<strong>" +
                                    token.value.repId.toUpperCase() +
                                    "</strong>";
                                //console.log(token.value.repId, newvalue);
                                let newStr = val.repIdWithName.replace(
                                    searchVal.toUpperCase(),
                                    newvalue
                                );
                                val.repIdWithNameNew = newStr;
                                val.focus = false;
                                if (i == 0) val.focus = true;
                            });
                            this.advNoResult[i] = "";
                        } else {
                            this.advNoResult[i] = "Invalid Rep ID";
                        }
                        this.typAhedResList[i] = this.resp;
                        console.log(this.advNoResult[i]);
                    });
            } else {
                console.log(event.keyCode);
                if (event.keyCode == 40) {
                    var focusFlagDown = false;
                    this.typAhedResList[i].forEach((element, j) => {
                        if (element.focus && !focusFlagDown) {
                            if (j < this.typAhedResList[i].length - 1) {
                                focusFlagDown = true;
                                element.focus = false;
                                this.typAhedResList[i][j + 1].focus = true;
                            }
                        }
                    });
                }
                if (event.keyCode == 38) {
                    var focusFlagUp = false;
                    this.typAhedResList[i].forEach((element, k) => {
                        if (element.focus && !focusFlagUp) {
                            if (k > 0) {
                                focusFlagUp = true;
                                element.focus = false;
                                this.typAhedResList[i][k - 1].focus = true;
                            }
                        }
                    });
                }
                if (event.keyCode == 13) {
                    //console.log(this.typAhedResList[i]);
                    this.typAhedResList[i].forEach((element, l) => {
                        //console.log(element);
                        if (element.focus) {
                            // this.advisorForm.controls["buyerSeller"][
                            //     "controls"
                            // ][i].patchValue({
                            //     repId: element.repID,
                            //     advisorName: element.fullName,
                            // });
                            // this.advisorsValidation[i].advisorName = false;
                            // this.advisorsValidation[i].repId = false;
                            this.selectRepId(element, i);
                        }
                    });
                    this.typAhedResList[i] = [];
                }
            }
        }
    }

    selectRepIdOnBLur(i) {
        this.typAhedResList[i].forEach((element, l) => {
            if (element.focus) {
                this.selectRepId(element, i);
            }
        });
        this.typAhedResList[i] = [];
    }

    selectRepId(item, i) {
        //console.log(this.advisorForm.controls["buyerSeller"]["controls"]);
        if (this.advisorForm.controls["buyerSeller"]["controls"].length > 1) {
            var filterArr = this.advisorForm.controls["buyerSeller"][
                "controls"
            ].filter(
                (formItem) =>
                    formItem.controls.repId.value.toUpperCase() ==
                    item.repID.toUpperCase()
            );

            if (filterArr.length > 1) {
                this.advNoResult[i] =
                    "This Rep ID is already added. Choose another one.";
                this.typAhedResList[i] = [];
                return false;
            }
        }
        var masterAdvList = {
            repID: item.repID,
            masterRepID: item.repID,
            firstName: item.firstName,
            middleName: item.middleName,
            lastName: item.lastName,
            isActive: 1,
            email: item.email,
            repUsername: item.repUsername,
            isTerminated: 0,
            hireDate: item.hireDate,
            advisorRole: "",
            isNewAdvisor: 1,
            isAdvisorsPartOfAnotherDeal: item.isAdvisorsPartOfAnotherDeal,
        };
        this.savedDataArray.dealJson.masterAdvisorList[i] = masterAdvList;
        this.advisorForm.controls["buyerSeller"]["controls"][i].patchValue({
            repId: item.repID,
            advisorName: item.fullName,
            advisorRole: item.advisorRole,
            maSolutionsCWStatus: "",
        });
        this.advisorsValidation[i].advisorName = false;
        this.advisorsValidation[i].repId = false;
        this.typAhedResList[i] = [];
        var invalid = false;
        this.advisorsValidation.forEach((chkAdv, i) => {
            if (chkAdv.advisorName || chkAdv.repId || chkAdv.advisorRole) {
                invalid = true;
            }
        });
        if (!invalid) this.validAdvisor = true;
        //console.log(this.advisorForm.value);
        console.log(this.savedDataArray);
    }

    validateRole(i, token) {
        this.advisorsValidation[i].advisorRole = false;
        //this.savedDataArray.dealJson.masterAdvisorList[i].advisorRole =
        //   token.value.advisorRole;
        this.advisorForm.controls["buyerSeller"]["controls"][i].patchValue({
            advisorRole: token.value.advisorRole,
        });
        if (this.savedDataArray.dealJson.masterAdvisorList.length > 0)
            this.savedDataArray.dealJson.masterAdvisorList[i].advisorRole =
                token.value.advisorRole;
        var invalid = false;
        this.advisorsValidation.forEach((chkAdv, i) => {
            if (chkAdv.advisorName || chkAdv.repId || chkAdv.advisorRole) {
                invalid = true;
            }
        });
        if (!invalid) this.validAdvisor = true;
    }

    // onSubmit() {
    //     //console.log(this.advisorForm.value);
    // }

    // returnDealSpecialist(token: string): Observable<DataSourceType[]> {
    //     this.dealSpecialist = this.dealService.searchDealSpecialists(token);
    //     const query = new RegExp(token, "i");
    //     this.dealSpecialistSelected = false;
    //     return of(
    //         this.dealSpecialist.filter((specialistName: any) => {
    //             return query.test(specialistName.fullName);
    //         })
    //     );
    // }

    returnAdvisorist(token: string): Observable<AdvisorDataType[]> {
        //console.log(token);
        this.advisorList = this.dealService.searchAdvisor(token);
        const query2 = new RegExp(token, "i");
        this.advisorSelected = false;
        return of(
            this.advisorList.filter((advisorDet: any) => {
                return query2.test(advisorDet.repID);
            })
        );
    }
    showSuccess() {
        this.toastr.success("The information has been saved successfully", "");
    }
    showError(messageType) {
        if (messageType == 1)
            this.toastr.warning(
                "The box folder already exist for this deal. Please delete the previously created box folder and try to save again.",
                ""
            );
        else
            this.toastr.error(
                "A problem occurred while saving the information. Please try to save again.",
                ""
            );
    }
    selectedStatus(status) {
        this.cs.setIsDirty(true);
        if (status == "COMP" || status == "TERM") {
            var statusName = status == "COMP" ? "Completed" : "Terminated";
            let initialState = {
                title: "Confirm Action",
                confirmTxt:
                    "Do you want to change the status to " + statusName + "?",
                confirmBtnTxt: "OK",
                cancelBtnTxt: "Cancel",
            };

            this.bsModalRef = this.modalService.show(ConfirmModalComponent, {
                initialState,
                backdrop: "static",
                class: "modal-lg",
            });
            this.bsModalRef.content.closeBtnName = "Close";
            this.bsModalRef.content.confirm.subscribe((value) => {
                if (value === "true") {
                    this.statustoBeChanged = status;
                    //this.dealDet.endDate = status == "COMP" || status == "TERM" ? new Date() : null;
                } else {
                    this.dealDet.dealStatusCd = this.statustoBeChanged;
                    this.cs.clearIsDirty();
                }
            });
        } else {
            this.statustoBeChanged = status;
        }
    }

    addBuyerSeller() {
        this.dealDet.advisors.push({
            advisorName: "",
            repId: "",
            advisorRole: "",
        });
    }

    startDateChange(event) {
        var minClosedate = new Date(event);
        ////console.log(minClosedate.getDate())
        this.minDate.setDate(minClosedate.getDate() + 1);
        this.minDate.setMonth(minClosedate.getMonth());
        this.minDate.setFullYear(minClosedate.getFullYear());
        ////console.log(this.minDate)
    }

    emptyDealSpecialistArray() {
        this.savedDataArray.dealJson.dealSpecialistInfo = {
            homeOfficeUserID: 0,
            username: "",
            firstName: "",
            middleName: "",
            lastName: "",
            roleCd: "",
            email: "",
        };
    }

    typeaheadOnSelectAdvisor(event: TypeaheadMatch): void {
        //console.log(event.item);
        this.dealSpecialistSelected = true;
        this.dealDet.dealSpecialist = event.item.fullName;
        this.savedDataArray.dealJson.dealSpecialistInfo = {
            homeOfficeUserID: 1,
            username: event.item.username,
            firstName: event.item.firstName,
            middleName: event.item.middleName,
            lastName: event.item.lastName,
            roleCd: "DLS",
            email: event.item.email,
        };
        //this.checkDS("");
    }

    typeaheadOnBlur(event: any): void {
        this.optionOnBlur = event.item;
        if (
            this.optionOnBlur &&
            this.searchedDealSpecialist !== this.optionOnBlur.fullname
        ) {
            this.searchedDealSpecialist = "";
            this.dealSpecialistSelected = true;
            this.noResult = false;
            this.emptyDealSpecialistArray();
        }
    }

    typeaheadNoResultsDS(event: boolean): void {
        if (this.searchedDealSpecialist == "") {
            this.noResult = false;
        } else {
            this.noResult = event;
        }
        this.emptyDealSpecialistArray();
        //this.checkDS("");
    }

    changeTypeaheadLoading(e: boolean): void {
        if (this.searchedDealSpecialist == "") {
            this.typeaheadLoading = false;
        } else {
            this.typeaheadLoading = e;
        }
    }

    checkDS(event) {
        this.checkSelectedDS = false;
        setTimeout(() => {
            if (this.noResult == true || !this.dealSpecialistSelected) {
                this.checkSelectedDS = true;
            }
        }, 10);
    }

    updateRepId(item) {
        this.repId = item.repId;
    }

    deleteAdvisor(i, repId) {
        
        let initialState = {
            title: "Confirm Action",
            confirmTxt: "Do you want to delete this advisor?",
            confirmBtnTxt: "OK",
            cancelBtnTxt: "Cancel",
        };

        this.bsModalRef = this.modalService.show(ConfirmModalComponent, {
            initialState,
            backdrop: "static",
            class: "modal-lg",
        });
        this.bsModalRef.content.closeBtnName = "Close";
        this.bsModalRef.content.confirm.subscribe((value) => {
            if (value === "true") {
                this.cs.setIsDirty(true);
                this.buyerSeller().removeAt(i);
                this.advisorsValidation.splice(i, 1);
                //this.savedDataArray.dealJson.masterAdvisorList[i].isActive = 0;
                //console.log(i, repId);
                this.savedDataArray.dealJson.masterAdvisorList.map(item => {
                    if(item.repID == repId){
                        item.isActive = 0;
                    }
                })
                //console.log(this.savedDataArray.dealJson.masterAdvisorList);
                var invalid = false;
                //console.log(this.advisorsValidation);
                if (this.advisorsValidation.length > 0) {
                    this.advisorsValidation.forEach((chkAdv, i) => {
                        if (
                            chkAdv.advisorName ||
                            chkAdv.repId ||
                            chkAdv.advisorRole
                        ) {
                            invalid = true;
                        }
                    });
                } else {
                    this.validAdvisor = false;
                    invalid = true;
                }
                if (!invalid) this.validAdvisor = true;
            } else {
            }
        });
    }

    gtantRevokeAcess(i) {
        let initialState = {
            title: "Confirm Action",
            confirmTxt: "Do you want to revoke this advisor access?",
            confirmBtnTxt: "Yes",
            cancelBtnTxt: "Cancel",
        };

        this.bsModalRef = this.modalService.show(ConfirmModalComponent, {
            initialState,
            backdrop: "static",
            class: "modal-lg",
        });
        this.bsModalRef.content.closeBtnName = "Close";
        this.bsModalRef.content.confirm.subscribe((value) => {
            if (value === "true") {
            } else {
            }
        });
    }

    onCancel() {
        //this.communicateOnSave.emit({ cancel: true });
        this.location.back();
    }

    openConfirmation() {
        let initialState = {
            title: "Confirm Action",
            confirmTxt: "Do you want to save this information?",
            confirmBtnTxt: "OK",
            cancelBtnTxt: "Cancel",
        };

        this.bsModalRef = this.modalService.show(ConfirmModalComponent, {
            initialState,
            backdrop: "static",
            class: "modal-lg",
        });
        this.bsModalRef.content.closeBtnName = "Close";
        this.bsModalRef.content.confirm.subscribe((value) => {
            if (value === "true") {
                this.cs.clearIsDirty();
                this.cs.displayLoader(true);
                let format = "MMM d, yyyy";
                var dealId;
                if(this.isPlanCreated && (this.changedDealType != this.dealDet.dealTypeID)){
                    dealId = 0;
                }
                else{
                    dealId= this.dealDet.dealID ? this.dealDet.dealID : 0;
                }
                let dealdet = {
                    dealID: this.dealDet.dealID ? this.dealDet.dealID : 0,
                    //dealID : dealId,
                    dealName: this.dealDet.dealName,
                    dealTypeID: this.dealDet.dealTypeID,
                    dealStartDate: this.datePipe.transform(
                        this.dealDet.startDate,
                        format
                    ),
                    dealTargetEndDate: this.datePipe.transform(
                        this.dealDet.endDate,
                        format
                    ),
                    dealStatusCd: this.dealDet.dealStatusCd,
                    dealStageID: this.dealDet.dealStageID,
                };

                let dealnote = {
                    note: this.dealDet.note,
                    isInternal: this.dealDet.note ? 1 : 0,
                    noteLevel: "DL",
                    isActive: 1,
                    readFlag: "R",
                    createdByName: this.currentUser.displayName,
                };

                this.savedDataArray.dealJson.dealInfo = dealdet;
                this.savedDataArray.dealJson.dealNotes =
                    this.dealDet.note != ""
                        ? dealnote
                        : this.savedDataArray.dealJson.dealNotes;

                

                const createFolderReq = {
                    folderName: this.dealDet.dealName,
                    parentFolderName: "dealExecution",
                };
                // TODO: when store proc refactored need to check if boxLink exists
                console.log('dealID', this.dealDet.dealID);
               // this.dealDet.dealID = dealId;
                if (this.dealDet.dealID === "") {
                    this.dealService.createBoxFolder(createFolderReq).subscribe(
                        (createBoxFolderResponse) => {
                            if (
                                createBoxFolderResponse["status"] === "success"
                            ) {
                                // TODO: Test Multiple Buyer/Seller Scenario should link to only 1 box folder for buyer and seller
                                this.savedDataArray.dealJson.dealInfo.dealFolderBoxID =
                                    createBoxFolderResponse["dealFolderBoxID"];
                                this.savedDataArray.dealJson.dealInfo.buyerFolderID =
                                    createBoxFolderResponse["buyerFolderID"];
                                this.savedDataArray.dealJson.dealInfo.sellerFolderID =
                                    createBoxFolderResponse["sellerFolderID"]; 

                                this.dealService
                                    .saveDeal(this.savedDataArray)
                                    .subscribe(
                                        (res) => {
                                            if (res["status"] === "success") {
                                                this.cs.clearLoader();
                                                if (
                                                    this.editDealFrom ===
                                                    "managePlan"
                                                ) {
                                                    this.router.navigate([
                                                        "/home/view-deals-new/" +
                                                            this.dealDet
                                                                .dealID +
                                                            "/" +
                                                            "0",
                                                    ]);
                                                } else if (
                                                    this.editDealFrom ===
                                                    "matchingDeal"
                                                ) {
                                                    this.router.navigate([
                                                        "/home",
                                                    ]);
                                                } else {
                                                    this.router.navigate([
                                                        "/admin/admin-page",
                                                    ]);
                                                }
                                                this.showSuccess();
                                            } else {
                                                console.log(res);
                                                this.cs.clearLoader();
                                                this.showError(0);
                                            }
                                        },
                                        (err) => {
                                            this.cs.clearLoader();
                                            this.showError(0);
                                        }
                                    );
                            }
                        },
                        (err) => {
                            this.cs.clearLoader();
                            this.showError(1);
                        }
                    );
                } else {
                    this.dealService.saveDeal(this.savedDataArray).subscribe(
                        (res) => {
                            if (res["status"] === "success") {
                                this.cs.clearLoader();
                                if (this.editDealFrom === "managePlan") {
                                    this.router.navigate([
                                        "/home/view-deals-new/" +
                                            this.dealDet.dealID +
                                            "/" +
                                            "0",
                                    ]);
                                } else if (
                                    this.editDealFrom === "matchingDeal"
                                ) {
                                    this.router.navigate(["/home"]);
                                } else {
                                    this.router.navigate(["/admin/admin-page"]);
                                }
                                this.showSuccess();
                            } else {
                                console.log(res);
                                this.cs.clearLoader();
                                this.showError(1);
                            }
                        },
                        (err) => {
                            this.cs.clearLoader();
                            this.showError(0);
                        }
                    );
                }
            } else {
            }
        });
    }

    deleteNote(note) {
        this.cs.displayLoader(true);
        var req = {
            noteID: note.noteID,
            username: this.userInfo.userName,
        };

        this.dealService.deleteNote(req).subscribe((res) => {
            if (res["status"] == "success") {
                this.dealDet.notes = this.dealDet.notes.filter(
                    (el) => el.noteID != note.noteID
                );
                this.cs.clearLoader();
            } else {
                this.cs.clearLoader();
            }
        });
    }

    duplicateDealCheck(dealName) {
        if (dealName != "") {
            if (this.editDealName != dealName) {
                this.dealService.checkDuplicateDeal(dealName).subscribe(
                    (res) => {
                        var result = res;
                        if (result["status"] == "success") {
                            this.duplicateDeal = result["data"].isDuplicate;
                        }
                    },
                    (err) => {}
                );
            } else {
                this.duplicateDeal = 0;
            }
        }
    }
}
