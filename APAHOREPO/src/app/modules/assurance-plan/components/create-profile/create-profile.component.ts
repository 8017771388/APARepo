import {
    Component,
    OnInit,
    ElementRef,
    ViewChild,
    ChangeDetectorRef,
} from "@angular/core";
import { FormGroup, FormControl, FormArray, FormBuilder } from "@angular/forms";
import { Location } from "@angular/common";
import { Observable, Observer, noop, of } from "rxjs";
import { mergeMap, switchMap, map, tap } from "rxjs/operators";
import { AssurancePlanService } from "../../services/assurance-plan.service";
import { TypeaheadMatch } from "ngx-bootstrap/typeahead/public_api";
import { DatePipe } from "@angular/common";
import {
    BENEFICIARY,
    ASSURANCECWSTATUS,
} from "../../../_shared/constants/global.constant";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { ConfirmModalComponent } from "../../../_shared/components/confirm-modal/confirm-modal.component";
import { Router, ActivatedRoute, Resolve } from "@angular/router";
import { UserInfo } from "../../../_shared/services/userInfo.service";
import { DealService } from "../../../admin/services/deal.service";
import { CommunicationService } from "../../../_shared/services/communication.services";
import { element } from "protractor";
import { ToastrService } from 'ngx-toastr';
import { DirtyComponent } from '../../../_shared/models/dirty-component';
import { isJSDocNullableType } from "typescript";

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
    selector: "app-create-profile",
    templateUrl: "./create-profile.component.html",
    styleUrls: ["./create-profile.component.scss"],
    providers: [DatePipe],
})
export class CreateProfileComponent implements OnInit, DirtyComponent {
    @ViewChild("estimateMarket") estimateMarketElement: ElementRef;
    @ViewChild("estimateMarketDate") estimateMarketDateElement: ElementRef;
    @ViewChild("lplPayment") lplPaymentElement: ElementRef;
    @ViewChild("lplPaymentDate") lplPaymentDateElement: ElementRef;
    @ViewChild("primaryBenficiaryPercentage")
    primaryBenficiaryPercentageElement: ElementRef;
    @ViewChild("contractEndDate") contractEndDateElement: ElementRef;
    @ViewChild("potentialSuccessorPhone") potentialSuccessorPhone: ElementRef;

    public dataSource: Observable<any[]>;
    public searchAdvisor: string = "";
    public typeaheadLoading: boolean = false;
    public noResult: boolean = false;
    public advisorName: string = "";
    public advisorOwnership: number;
    public endDate: any = "";
    public startDate: any = "";
    public valuationDate: any = "";
    public benficiaryName = BENEFICIARY;
    public profileStatus = "Active";
    public bsModalRef: BsModalRef;
    public currentUser: any;
    public validBeneficiary: boolean = false;
    public profileExists: boolean = false;
    public validValuation: boolean = false;
    public totalExceeded: boolean = false;
    public pageHeading: string = "";
    public minDate: any;
    public statusChange: any = "";
    public statusChangeFlag: any = 0;
    public assuranceCWStatusDesc = ASSURANCECWSTATUS;
    public assuranceCWStatus = 0;
    optionOnBlur: any;

    public beneficiaries = [];

    public notes = [];

    public profileDet = {
        advisorProfile: {
            profileID: 0,
            repID: "",
            masterRepID: "",
            firstName: "",
            middleName: "",
            lastName: "",
            isAssurancePlan: 1,
            profileStatus: "Active",
            email: "",
            repUsername: "",
            isTerminated: 0,
            hireDate: "",
            contractStartDate: "",
            contractEndDate: "",
            boxLink: "",
            boxID: "",
            isActive: 1,
            statusChange: 0,
            assuranceCWStatus: 0,
            advisorFullName: "",
            ownershipPercentage: 100,
        },
        beneficiary: [
            {
                beneficiaryID: 0,
                beneficiarySequence: 1,
                beneficiaryFullName: "",
                beneficiaryPercentage: null,
                isActive: 1,
                beneficiryDP:"Primary",
                beneficiaryPhone:null

            },
        ],
        valuation: {
            valuationID: 0,
            estimatedMarketValue: null,
            estimatedMarketValueDate: null,
            lplGuaranteedPayment: null,
            lplGuaranteedPaymentDate: null,
            isActive: 0,
        },
        potentialSuccessor: {
            successorID: 0,
            successorFullName: "",
            successorMasterRepID: "",
            isActive: 0,
            successorPhone: null,
            successorEmail: null,
            successorCompany: null,
        },
        notes: {
            noteID: 0,
            note: "",
            isInternal: 1,
            isActive: 0,
            readFlag: "R",
            createdByName: "",
            noteLevel: "PL",
        },
    };
    advisorForm: FormGroup;
    isColapsed: boolean = true;
    repInfo: any = { associatedReps: [], masterReps: [] };
    advisorOwnershipPercentage: number;
    isDirty = false;

    constructor(
        private location: Location,
        private apService: AssurancePlanService,
        private datePipe: DatePipe,
        private modalService: BsModalService,
        public router: Router,
        public userInfo: UserInfo,
        private acRoute: ActivatedRoute,
        private cdr: ChangeDetectorRef,
        private dealService: DealService,
        private cs: CommunicationService,
        private fb: FormBuilder,
        private toastr: ToastrService
    ) {
        this.advisorForm = this.fb.group({
            buyerSeller: this.fb.array([]),
        });
        this.minDate = new Date();
    }

    ngAfterViewChecked() {
        this.cdr.detectChanges();
    }

    ngOnInit() {
        this.cs.clearIsDirty();
        this.cs.displayLoader(true);
        this.currentUser = this.userInfo._currentUserFn();
        this.dataSource = Observable.create((observer: Observer<string>) => {
            observer.next(this.searchAdvisor);
        }).pipe(
            mergeMap((token: string) => {
                //this.dealSpecialistSelected = false;
                if (
                    this.searchAdvisor != null &&
                    this.searchAdvisor.length > 0
                ) {
                    return this.apService.searchAdvisorAP(token);
                } else {
                    //this.dealSpecialistSelected = true;
                    //this.emptyDealSpecialistArray();
                    return of([]);
                }
            })
        );

        this.acRoute.params.subscribe((params) => {
            if (params["id"]) {
                this.pageHeading = "Edit Profile";
                var param = {
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
                                Name: "profileID",
                                ValueFilter: [params["id"]],
                            },
                        ],
                    },
                    username: this.userInfo.userName,
                    searchString: "",
                };
                this.apService.getPlanList(param).subscribe((result) => {
                    if (result["status"] == "success") {
                        var advisorProfile =
                            result["data"]["advisorProfileList"][0];
                        //this.getAssociatedReps(advisorProfile.repID);
                        this.searchAdvisor = advisorProfile.repID;
                        this.advisorName = advisorProfile.advisorFullName;
                        this.profileDet.advisorProfile = {
                            profileID: advisorProfile.profileID,
                            repID: advisorProfile.repID,
                            masterRepID: advisorProfile.repID,
                            firstName: "",
                            middleName: "",
                            lastName: "",
                            isAssurancePlan: 1,
                            profileStatus: advisorProfile.profileStatus,
                            email: "",
                            repUsername: advisorProfile.repUsername,
                            isTerminated: 0,
                            hireDate: "",
                            contractEndDate:
                                advisorProfile.contractEndDate != null
                                    ? new Date(advisorProfile.contractEndDate)
                                    : advisorProfile.contractEndDate,
                            contractStartDate:
                                advisorProfile.contractStartDate != null
                                    ? new Date(advisorProfile.contractStartDate)
                                    : advisorProfile.contractStartDate,
                            boxLink: advisorProfile.boxLink,
                            boxID: advisorProfile.boxLink,
                            isActive: advisorProfile.isActive,
                            statusChange: 0,
                            assuranceCWStatus: advisorProfile.assuranceCWStatus,
                            advisorFullName: advisorProfile.advisorFullName,
                            ownershipPercentage:
                                advisorProfile.ownershipPercentage,
                        };
                        this.statusChange = advisorProfile.profileStatus;
                        this.profileStatus = advisorProfile.profileStatus;
                        this.assuranceCWStatus =
                            advisorProfile.assuranceCWStatus;
                        this.endDate =
                            advisorProfile.contractEndDate != null
                                ? new Date(advisorProfile.contractEndDate)
                                : advisorProfile.contractEndDate;
                        this.startDate =
                            advisorProfile.contractStartDate != null
                                ? new Date(advisorProfile.contractStartDate)
                                : advisorProfile.contractStartDate;
                        if (this.startDate != null) {
                            this.minDate.setDate(this.startDate.getDate() + 1);
                            console.log(this.minDate);
                        }
                        this.profileDet.potentialSuccessor =
                            advisorProfile.potentialSuccessor != null
                                ? JSON.parse(
                                      JSON.stringify(
                                          advisorProfile.potentialSuccessor
                                      )
                                  )
                                : this.profileDet.potentialSuccessor;

                        this.profileDet.valuation =
                            advisorProfile.valuation != null
                                ? JSON.parse(
                                      JSON.stringify(advisorProfile.valuation)
                                  )
                                : this.profileDet.valuation;

                        this.notes = JSON.parse(
                            JSON.stringify(advisorProfile.notes)
                        );

                        if (advisorProfile.valuation != null) {
                            this.profileDet.valuation.estimatedMarketValue =
                                advisorProfile.valuation.estimatedMarketValue !=
                                null
                                    ? Number(
                                          advisorProfile.valuation
                                              .estimatedMarketValue
                                      ).toLocaleString()
                                    : advisorProfile.valuation
                                          .estimatedMarketValue;

                            this.profileDet.valuation.lplGuaranteedPayment =
                                advisorProfile.valuation.lplGuaranteedPayment !=
                                null
                                    ? Number(
                                          advisorProfile.valuation
                                              .lplGuaranteedPayment
                                      ).toLocaleString()
                                    : advisorProfile.valuation
                                          .lplGuaranteedPayment;

                            this.profileDet.valuation.estimatedMarketValueDate =
                                advisorProfile.valuation
                                    .estimatedMarketValueDate != null
                                    ? new Date(
                                          advisorProfile.valuation.estimatedMarketValueDate
                                      )
                                    : advisorProfile.valuation
                                          .estimatedMarketValueDate;
                            this.valuationDate = this.profileDet.valuation.estimatedMarketValueDate;

                            this.profileDet.valuation.lplGuaranteedPaymentDate =
                                advisorProfile.valuation
                                    .lplGuaranteedPaymentDate != null
                                    ? new Date(
                                          advisorProfile.valuation.lplGuaranteedPaymentDate
                                      )
                                    : advisorProfile.valuation
                                          .lplGuaranteedPaymentDate;
                        }

                        advisorProfile.beneficiary.forEach((element, index) => {
                            if(index === 0){
                                element.beneficiryDP = 'Primary';
                                this.profileDet.beneficiary[0] = element;
                            } else {
                                if (element.beneficiarySequence == 1) {
                                    element.beneficiryDP = 'Primary';
                                    this.beneficiaries.push(element);
                                } else {
                                    element.beneficiryDP = 'Additional';
                                    this.beneficiaries.push(element);
                                }
                            }
                        });
                        this.repInfo.associatedReps =
                            advisorProfile.associatedReps;
                        this.cs.clearLoader();
                    } else {
                        console.log("error");
                        this.cs.clearLoader();
                    }
                });
            } else {
                this.pageHeading = "Create Profile";
                this.cs.clearLoader();
            }
        });
    }

    onModelChange(modal: any) {
        this.cs.setIsDirty(true);
    }
    canDeactivate() {
        console.log(this.cs.getIsDirty());

        this.cs.getIsDirty().subscribe((dirty) => {
            this.isDirty = dirty;
        });
        //this.cs.setIsDirty(true);
        //this.isDirtyDup = true;
        //this.cs.clearIsDirty();
        return this.isDirty;
    }

    getAssociatedReps(repId) {
        this.apService.getAssociatedRep(repId).subscribe(
            (res) => {
                //console.log(res);
                this.repInfo = res;
            },
            (err) => {}
        );
    }

    buyerSeller(): FormArray {
        return this.advisorForm.get("buyerSeller") as FormArray;
    }

    newBuyerSeller(): FormGroup {
        return this.fb.group({
            repId: "",
            advisorName: "",
            advisorRole: "",
        });
    }

    addAdvisor() {
        this.buyerSeller().push(this.newBuyerSeller());
        // this.typAhedResList[this.typAhedResList.length] = [];
        // this.advisorsValidation.push({
        //     advisorName: true,
        //     repId: true,
        //     advisorRole: true,
        // });
        // this.advNoResult.push("");
        // this.borderColor.push(false);
        // this.validAdvisor = false;
    }

    trackByFn(index, item) {
        return item.id;
    }

    onValueChange(event, from) {
        let format = "MMM d, yyyy";
        if (from == "endDate") {
            this.profileDet.advisorProfile.contractEndDate = this.datePipe.transform(
                event,
                format
            );
        } else if (from == "marketDate") {
            this.profileDet.valuation.estimatedMarketValueDate = this.datePipe.transform(
                event,
                format
            );
            this.checkValuation(from);
        } else if (from == "startDate") {
            this.profileDet.advisorProfile.contractStartDate = this.datePipe.transform(
                event,
                format
            );
            var minClosedate = new Date(event);
            this.minDate.setDate(minClosedate.getDate() + 1);
            this.minDate.setMonth(minClosedate.getMonth());
            this.minDate.setFullYear(minClosedate.getFullYear());

            // if(this.startDate >= this.endDate){
            //     this.endDate = null;
            // }
        } else {
            this.profileDet.valuation.lplGuaranteedPaymentDate = this.datePipe.transform(
                event,
                format
            );
            this.checkValuation(from);
        }
    }

    typeaheadOnSelectAdvisor(event: TypeaheadMatch): void {
        this.profileExists = false;
        if (event.item.isDuplicate == 1) {
            this.searchAdvisor = event.item.repID;
            this.profileExists = true;
        } else {
            this.profileExists = false;
            //this.advisorName = event.item.fullName;
            //this.searchAdvisor = event.item.repID;
            //this.profileDet.advisorProfile.masterRepID = event.item.repID;
            //this.profileDet.advisorProfile.repID = event.item.repID;
            //this.profileDet.advisorProfile.hireDate = event.item.hireDate;
            //this.profileDet.advisorProfile.firstName = event.item.firstName;
            //this.profileDet.advisorProfile.middleName = event.item.middleName;
            //this.profileDet.advisorProfile.lastName = event.item.lastName;
            //this.profileDet.advisorProfile.email = event.item.email;
            //this.profileDet.advisorProfile.advisorFullName =
            //    event.item.fullName;
            //this.getAssociatedReps(event.item.repID);
            this.cs.getRepDetails().subscribe(
                (resp) => {
                    if (resp) {
                        console.log(resp);
                        let tempSearch = this.searchAdvisor
                        this.repInfo = resp;
                        this.advisorName =
                            this.repInfo.masterRep.length > 0
                                ? this.repInfo.masterRep[0].fullName
                                : ""; //event.item.fullName;
                        this.searchAdvisor =
                            this.repInfo.masterRep.length > 0
                                ? this.repInfo.masterRep[0].repID
                                : tempSearch;
                        this.profileDet.advisorProfile.masterRepID =
                            this.repInfo.masterRep.length > 0
                                ? this.repInfo.masterRep[0].repID
                                : "";
                        this.profileDet.advisorProfile.repID =
                            this.repInfo.masterRep.length > 0
                                ? this.repInfo.masterRep[0].repID
                                : "";
                        this.profileDet.advisorProfile.hireDate =
                            this.repInfo.masterRep.length > 0
                                ? this.repInfo.masterRep[0].hireDate
                                : "";
                        this.profileDet.advisorProfile.firstName =
                            this.repInfo.masterRep.length > 0
                                ? this.repInfo.masterRep[0].firstName
                                : "";
                        this.profileDet.advisorProfile.middleName =
                            this.repInfo.masterRep.length > 0
                                ? this.repInfo.masterRep[0].middleName
                                : "";
                        this.profileDet.advisorProfile.lastName =
                            this.repInfo.masterRep.length > 0
                                ? this.repInfo.masterRep[0].lastName
                                : "";
                        this.profileDet.advisorProfile.email =
                            this.repInfo.masterRep.length > 0
                                ? this.repInfo.masterRep[0].email
                                : "";
                        this.profileDet.advisorProfile.repUsername =
                            this.repInfo.masterRep.length > 0
                                ? this.repInfo.masterRep[0].repUsername
                                : "";
                        this.profileDet.advisorProfile.advisorFullName =
                            this.repInfo.masterRep.length > 0
                                ? this.repInfo.masterRep[0].fullName
                                : "";
                        if (this.repInfo.associatedReps.length > 0) {
                            this.repInfo.associatedReps.map(
                                (item) => (item.ownershipPercentage = 0)
                            );
                        }
                    }
                },
                (err) => {}
            );
        }
        console.log(this.profileDet);
    }

    typeaheadOnBlur(event: any): void {
        //console.log(event)
        this.optionOnBlur = event.item;
        if (
            this.optionOnBlur &&
            this.searchAdvisor !== this.optionOnBlur.fullname
        ) {
             this.searchAdvisor = "";
            this.advisorName = "";
            //this.dealSpecialistSelected = true;
            this.noResult = false;
            this.profileExists = false;
            //this.emptyDealSpecialistArray();
        }
    }

    typeaheadNoResults(event: boolean): void {
        this.noResult = event;
        if (this.searchAdvisor == "") {
            this.noResult = false;
            this.profileExists = false;
        } else {
            this.noResult = event;
        }
        if (event == true) {
            this.advisorName = "";
            this.profileExists = false;
        }
    }

    changeTypeaheadLoading(e: boolean): void {
        if (this.searchAdvisor == "") {
            this.typeaheadLoading = false;
        } else {
            this.typeaheadLoading = e;
        }
    }

    onCancel() {
        this.location.back();
    }

    addBeneficiary(length) {
        // this.checkPercentage(null, null);
        if (length <= 6) {
            let newBeneficiary = {
                beneficiaryID: 0,
                beneficiarySequence: null,
                beneficiaryFullName: "",
                beneficiaryPercentage: null,
                isActive: 1,
                invalidBenePercentage: false,
                invalidBeneName: false,
                beneficiaryPhone: null,
                beneficiryDP: "Additional"
            };

            this.beneficiaries.push(newBeneficiary);
            this.beneficiaries.forEach((element, index) => {
                element.beneficiarySequence = index + 2;
            });

            this.checkPercentage(newBeneficiary, null);
        }
        //console.log(this.beneficiaries)
    }
    showSuccess() {

        this.toastr.success('The information has been saved successfully', '');
    }
    showError(messageType) {
         if (messageType == 1)
             this.toastr.warning('The box folder already exist for this Advisor Profile. Please delete the previously created box folder and try to save again.', '');
         else
             this.toastr.error('A problem occurred while saving the information. Please try to save again.', '');
    }
    selectedStatus(event) {
        //console.log(event)
        this.profileDet.advisorProfile.profileStatus = event;
        if (event == "Terminated") {
            this.profileDet.advisorProfile.isActive = 0;
            this.profileDet.advisorProfile.isTerminated = 1;
        } else {
            this.profileDet.advisorProfile.isActive = 1;
            this.profileDet.advisorProfile.isTerminated = 0;
        }
    }

    deleteBeneficiary(beneficiary, index) {
        let initialState = {
            title: "Confirm Action",
            confirmTxt: "Are you sure you want to delete this beneficiary?",
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
            // this.checkPercentage(null, null);
            //this.totalExceeded = true;

            if (value == "true") {
                let total = parseFloat(
                    this.profileDet.beneficiary[0].beneficiaryPercentage
                );
                this.totalExceeded = false;
                if (
                    this.profileDet.advisorProfile.profileID > 0 &&
                    beneficiary.beneficiaryID != 0
                ) {
                    var req = {
                        beneficiaryID: beneficiary.beneficiaryID,
                        username: this.currentUser.userName,
                    };
                    this.apService.deleteBeneficiary(req).subscribe((res) => {
                        if (res["status"] == "success") {
                            this.beneficiaries = this.beneficiaries.filter(
                                (ele) =>
                                    ele.beneficiaryID !=
                                    beneficiary.beneficiaryID
                            );
                            this.beneficiaries.forEach((element, index) => {
                                element.beneficiarySequence = index + 2;
                                total = total + parseFloat(element.beneficiaryPercentage);
                            });
                            total = total/2;
                            if (total > 100 || total.toPrecision(3) != "100") {
                                this.totalExceeded = true;
                            }
                            this.checkPercentage(beneficiary, null);
                            this.cs.clearLoader();
                        } else {
                            this.cs.clearLoader();
                        }
                    });
                } else {
                    this.beneficiaries = this.beneficiaries.filter(
                        (ele) =>
                            ele.beneficiarySequence !=
                            beneficiary.beneficiarySequence
                    );
                    this.beneficiaries.forEach((element, index) => {
                        element.beneficiarySequence = index + 2;
                        total = total + parseFloat(element.beneficiaryPercentage);
                    });
                    total = total/2;
                    if (total > 100 && total.toPrecision(3) != "100") {
                        this.totalExceeded = true;
                    }
                    this.checkPercentage(beneficiary, null);
                }
            }
        });
    }

    checkField(beneficiary, field, event) {
        //console.log(beneficiary.beneficiaryPercentage)
        this.checkPercentage(beneficiary, event);
        let invalidInput = "false";
        if (
            beneficiary.beneficiaryFullName == "" &&
            beneficiary.beneficiaryPercentage == null
        ) {
            beneficiary.invalidBenePercentage = false;
            beneficiary.invalidBeneName = false;
            this.validBeneficiary = false;
        } else if (
            beneficiary.beneficiaryFullName != "" &&
            beneficiary.beneficiaryPercentage != null
        ) {
            beneficiary.invalidBenePercentage = false;
            beneficiary.invalidBeneName = false;
            this.validBeneficiary = false;
        } else {
            beneficiary.invalidBenePercentage =
                beneficiary.beneficiaryPercentage == null ? true : false;
            beneficiary.invalidBeneName =
                beneficiary.beneficiaryFullName == "" ? true : false;
            this.validBeneficiary =
                beneficiary.invalidBenePercentage == true ||
                beneficiary.invalidBeneName == true
                    ? true
                    : false;
        }

        this.beneficiaries.forEach((element) => {
            if (
                element.invalidBenePercentage == true ||
                element.invalidBeneName == true
            ) {
                invalidInput = "true";
            }
        });

        if (invalidInput == "true") {
            this.validBeneficiary = true;
        }
    }

    checkPercentage(beneficiary, event) {
        /* let total = parseFloat(
            this.profileDet.beneficiary[0].beneficiaryPercentage
        );
        this.totalExceeded = false;

        this.beneficiaries.forEach((element) => {
            total = total + parseFloat(element.beneficiaryPercentage);
        });

        if (total > 100 || total.toPrecision(3) != "100") {
            this.totalExceeded = true;
        } */
        let totalPrimary = 0;
        let totalSecondary = 0;
        let isPrimaryExists = false;
        let isSecondaryExists = false;

               if(beneficiary.beneficiryDP  != ''){
                    if(this.profileDet.beneficiary[0].beneficiryDP == 'Primary'){
                        isPrimaryExists = true;
                         totalPrimary = parseFloat(
                            this.profileDet.beneficiary[0].beneficiaryPercentage
                        );
                    }
                    else{   
                            isSecondaryExists= true
                            totalSecondary = parseFloat(
                            this.profileDet.beneficiary[0].beneficiaryPercentage
                        );
                    }
                }
             
                this.totalExceeded = false;
                this.beneficiaries.forEach((element) => {
                    if(element.beneficiryDP != ''){
                        if(element.beneficiryDP == 'Primary'){
                            isPrimaryExists = true
                            totalPrimary = totalPrimary + parseFloat(element.beneficiaryPercentage);
                        }
                        else{
                            isSecondaryExists =true
                            totalSecondary = totalSecondary + parseFloat(element.beneficiaryPercentage);
                        }
                    }

                });

                if(isPrimaryExists){
                    if (totalPrimary > 100 ||  totalPrimary.toPrecision(3) != "100" ) {
                        this.totalExceeded = true;
                    }
            
                }

                if(isSecondaryExists){
                    if (totalSecondary > 100 || totalSecondary.toPrecision(3) != "100" ) {
                        this.totalExceeded = true;
                    }
            
                }

    }

    openConfirmation() {
        let initialState = {
            title: "Confirm Action",
            confirmTxt: "Are you sure you want to save this information?",
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
                console.log("test " , this.beneficiaries)
                this.cs.clearIsDirty();
                this.cs.displayLoader(true);
                let profileDet = {
                    profileJson: {},
                    username: "",
                };
                this.profileDet.valuation.estimatedMarketValue =
                    this.profileDet.valuation.estimatedMarketValue != null
                        ? this.profileDet.valuation.estimatedMarketValue
                              .toString()
                              .indexOf(",") != -1
                            ? this.profileDet.valuation.estimatedMarketValue
                                  .toString()
                                  .replace(/,/g, "")
                            : this.profileDet.valuation.estimatedMarketValue
                        : this.profileDet.valuation.estimatedMarketValue;

                this.profileDet.valuation.lplGuaranteedPayment =
                    this.profileDet.valuation.lplGuaranteedPayment != null
                        ? this.profileDet.valuation.lplGuaranteedPayment
                              .toString()
                              .indexOf(",") != -1
                            ? this.profileDet.valuation.lplGuaranteedPayment
                                  .toString()
                                  .replace(/,/g, "")
                            : this.profileDet.valuation.lplGuaranteedPayment
                        : this.profileDet.valuation.lplGuaranteedPayment;

                if (this.profileDet.notes.note != "") {
                    this.profileDet.notes.createdByName = this.currentUser.displayName;
                    this.profileDet.notes.isActive = 1;
                }

                this.profileDet.potentialSuccessor.isActive =
                    this.profileDet.potentialSuccessor.successorFullName ==
                        "" &&
                    this.profileDet.potentialSuccessor.successorMasterRepID ==
                        ""
                        ? 0
                        : 1;

                this.profileDet.valuation.isActive =
                    this.profileDet.valuation.estimatedMarketValue != null
                        ? 1
                        : this.profileDet.valuation.lplGuaranteedPayment != null
                        ? 1
                        : 0;

                if (this.profileDet)
                    this.beneficiaries.forEach((element, index) => {
                        if (element.beneficiaryFullName != "") {
                            if(element.beneficiryDP === 'Primary'){
                                element.beneficiarySequence = 1;
                                this.profileDet.beneficiary.push(element);
                            }
                            else{
                                element.beneficiarySequence = index + 2;
                                this.profileDet.beneficiary.push(element);
                            }
                        }
                    });

                if (
                    this.statusChange == "" ||
                    this.statusChange ==
                        this.profileDet.advisorProfile.profileStatus
                ) {
                    this.statusChangeFlag = 0;
                } else {
                    this.statusChangeFlag =
                        this.statusChange == "Active" ? 1 : 2;
                }
                this.profileDet.advisorProfile.statusChange = this.statusChangeFlag;
                this.profileDet["associatedReps"] = this.repInfo.associatedReps;
                //replace single quotes with double single quotes
                var temp = JSON.stringify(this.profileDet);
                temp = temp.replace(/'/g, "''");
                this.profileDet = JSON.parse(temp);

                profileDet.profileJson = this.profileDet;
                profileDet.username = this.currentUser.userName;
                //profileDet.profileJson[
                //    "associatedReps"
                //] = this.repInfo.associatedReps;
                //console.log(profileDet);
                //var temp = JSON.stringify(profileDet);
                //temp = temp.replace(/'/g, "''");
                //profileDet = JSON.parse(temp);
                console.log(temp);
                console.log(profileDet);
                const createFolderReq = {
                    folderName: this.profileDet.advisorProfile.advisorFullName
                        .trim()
                        .concat(
                            "(" + this.profileDet.advisorProfile.repID + ")"
                        ),
                    parentFolderName: "assurancePlan",
                };
                // TODO: when store proc refactored need to check if boxLink exists
                if (this.profileDet.advisorProfile.boxLink === "") {
                    this.apService
                        .createBoxFolder(createFolderReq)
                        .subscribe((createBoxFolderResponse) => {
                            if (
                                createBoxFolderResponse["status"] === "success"
                            ) {
                                this.profileDet.advisorProfile.boxID =
                                    createBoxFolderResponse["folderId"];

                                profileDet.profileJson = this.profileDet;
                                this.apService
                                    .saveProfile(profileDet)
                                    .subscribe(
                                        (saveProfileResponse) => {
                                            if (
                                                saveProfileResponse[
                                                    "status"
                                                ] === "success"
                                            ) {
                                                this.router.navigate([
                                                    "/assurance-plan/assurance-plan-page",
                                                ]);
                                                this.cs.clearLoader();
                                                this.showSuccess();
                                            } else {
                                                // console.log(
                                                //     saveProfileResponse
                                                // );
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
                        }, (err) => {
                            this.cs.clearLoader();
                                this.showError(1);
                                this.cs.setIsDirty(true);
                        });

                } else {
                    this.apService.saveProfile(profileDet).subscribe(
                        (saveProfileResponse) => {
                            if (saveProfileResponse["status"] === "success") {
                                this.router.navigate([
                                    "/assurance-plan/assurance-plan-page",
                                ]);
                                this.cs.clearLoader();
                                this.showSuccess();
                            } else {
                                console.log(saveProfileResponse);
                                this.cs.clearLoader();
                                this.showError(0);
                            }
                        },
                        (err) => {
                            this.showError(0);
                            this.cs.setIsDirty(true);
                        }
                    );
                }
            } else {
            }
        });
    }
    checkValue(event, field, beneficiary) {
        //console.log(event);
        // var k;
        // k = event.charCode; //         k = event.keyCode;  (Both can be used)
        // return (
        //     (k > 64 && k < 91) ||
        //     (k > 96 && k < 123) ||
        //     k == 8 ||
        //     k == 32 ||
        //     (k >= 48 && k <= 57)
        // );
        // console.log(beneficiary.beneficiaryPercentage.toString().split("."));
        if (
            beneficiary.beneficiaryPercentage &&
            beneficiary.beneficiaryPercentage.toString().split(".").length > 2
        ) {
            var arr = beneficiary.beneficiaryPercentage.toString().split(".");
            var val = "";
            arr.forEach((element) => {
                if (element) {
                    if (val == "") val = val + element + ".";
                    else val = val + element;
                } else {
                    val += element;
                }
            });
            if (val == "") val = ".";
            beneficiary.beneficiaryPercentage = val;
        }
        if (field == "percentage") {
            beneficiary.invalidInput = false;
            if (event.target.classList.contains("ng-invalid")) {
                beneficiary.invalidInput = true;
            }
        }
        if (event.key == "." && field == "percentage") {
            if (
                beneficiary.beneficiaryPercentage != null &&
                beneficiary.beneficiaryPercentage.toString().split(".")
                    .length == 1
            ) {
                if (beneficiary.beneficiaryPercentage < 100) {
                    beneficiary.beneficiaryPercentage = parseInt(
                        beneficiary.beneficiaryPercentage.toString() + "."
                    );
                    return true;
                } else {
                    return false;
                }
            } else {
                //event.target.classList.add('ng-invalid')
                return false;
            }
        }

        if (
            (event.keyCode > 47 && event.keyCode < 58) ||
            (event.keyCode > 95 && event.keyCode < 106) ||
            event.keyCode === 8 ||
            event.keyCode === 9
        ) {
            var rawValue = event.target.value;
            rawValue = rawValue.replace(/,/g, "");
            if (rawValue > 9999999) {
                if (event.keyCode === 8) {
                    return true;
                } else {
                    return false;
                }
            } else {
                //event.target.setSelectionRange(this.cursorStart, this.cursorEnd);
                return true;
            }
        } else {
            if (event.keyCode == 46) {
                return true;
            }
            if (event.keyCode == 16) {
                //event.preventDefault();
                return false;
            }
            return false;
        }
    }

    valueChanged(newValue, fieldName) {
        newValue = newValue.replace(/,/g, "");
        if (fieldName === "estimateMarket") {
            if (newValue == "") {
                this.profileDet.valuation.estimatedMarketValue = null;
            } else {
                this.profileDet.valuation.estimatedMarketValue = Number(
                    newValue
                ).toLocaleString();
            }
        }
        if (fieldName === "lplPayment") {
            if (newValue == "") {
                this.profileDet.valuation.lplGuaranteedPayment = null;
            } else {
                this.profileDet.valuation.lplGuaranteedPayment = Number(
                    newValue
                ).toLocaleString();
            }
        }

        this.checkValuation(fieldName);
    }

    checkValuation(field) {
        setTimeout(() => {
            if (
                this.estimateMarketElement.nativeElement.classList.contains(
                    "invalid"
                ) ||
                this.estimateMarketDateElement.nativeElement.classList.contains(
                    "invalid"
                ) ||
                this.lplPaymentElement.nativeElement.classList.contains(
                    "invalid"
                ) ||
                this.lplPaymentDateElement.nativeElement.classList.contains(
                    "invalid"
                )
            ) {
                this.validValuation = true;
            } else {
                this.validValuation = false;
            }
        }, 10);
    }

    deleteNote(note) {
        this.cs.displayLoader(true);
        var req = {
            noteID: note.noteID,
            username: this.currentUser.userName,
        };

        this.dealService.deleteNote(req).subscribe((res) => {
            if (res["status"] == "success") {
                this.notes = this.notes.filter(
                    (el) => el.noteID != note.noteID
                );
                this.cs.clearLoader();
            } else {
                this.cs.clearLoader();
            }
        });
    }

    removeZero(mainObj, subObj, fieldName, index) {
        var itemVal;
        if (index !== null && mainObj != null) {
            itemVal = this[mainObj][subObj][index][fieldName];
        } else if (index !== null && mainObj == null) {
            itemVal = this[subObj][index][fieldName];
        } else {
            itemVal = this[mainObj][subObj][fieldName];
        }
        console.log(itemVal);
        //var prepended_number = String(itemVal).padStart(0, "0");
        //console.log(prepended_number);
        if (itemVal.length > 1) {
            var dotIndex = String(itemVal).indexOf(".");
            //console.log(dotIndex);
            if (dotIndex == -1) {
                //console.log(parseInt(String(itemVal), 10));
                itemVal = parseInt(String(itemVal), 10);
            } else if (dotIndex > 1) {
                itemVal = parseFloat(String(itemVal));
            }
        }

        if (index !== null && mainObj != null) {
            this[mainObj][subObj][index][fieldName] = itemVal;
        } else if (index !== null && mainObj == null) {
            this[subObj][index][fieldName] = itemVal;
        } else {
            this[mainObj][subObj][fieldName] = itemVal;
        }
    }

    omit_special_char(event)
    {
        var k;
        k = event.charCode;  //         k = event.keyCode;  (Both can be used)
        return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
    }
}
