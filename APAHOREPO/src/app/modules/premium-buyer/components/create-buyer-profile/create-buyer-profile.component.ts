import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Observable, Observer, of } from 'rxjs';
import { CommunicationService } from "../../../_shared/services/communication.services";
import { UserInfo } from "../../../_shared/services/userInfo.service";
import { AssurancePlanService } from '../../../assurance-plan/services/assurance-plan.service';
import { mergeMap } from 'rxjs/operators';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/public_api';
import { DatePipe } from "@angular/common";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { ConfirmModalComponent } from "../../../_shared/components/confirm-modal/confirm-modal.component";
import { Router, ActivatedRoute, Resolve } from "@angular/router";
import { Location } from "@angular/common";
import { FormGroup, FormControl, FormArray, FormBuilder } from "@angular/forms";
import * as _ from "lodash";
import { PremiumBuyerService } from '../../services/premium-buyer.service';
import { ToastrService } from 'ngx-toastr';
import { DealService } from "../../../admin/services/deal.service";
import { NUMBERTOBOOLEAN } from "../../../_shared/constants/global.constant";
import { PREMIUMBUERCWSTATUS } from "../../../_shared/constants/global.constant";

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
  selector: 'app-create-buyer-profile',
  templateUrl: './create-buyer-profile.component.html',
  styleUrls: ['./create-buyer-profile.component.scss'],
  providers: [DatePipe]
})
export class CreateBuyerProfileComponent implements OnInit {

  @ViewChild("annuity") annuityElement: ElementRef;
  @ViewChild("insurance") insuranceElement: ElementRef;
  @ViewChild("mutualFunds") mutualFundsElement: ElementRef;
  @ViewChild("alternatives") alternativesElement: ElementRef;
  @ViewChild("financialPlaning") financialPlaningElement: ElementRef;
  @ViewChild("other") otherElement: ElementRef;

    public noResult: boolean = false;
    typeaheadLoading: boolean;
  public bsModalRef: BsModalRef;
  public secondaryAdvisors = [];
    public dataSource: Observable<any[]>;
    advisorForm: FormGroup;
    checkForm: FormGroup;
  public currentUser : any;
  public searchAdvisor: string = "";
  public profileStatus = "Not Started"
  public minDate: any;
  public currentDate = new Date();  
  public endDateError : boolean = false;
    public advisorSelected: boolean = false;
    public typAhedResList: any = [];
    public advNoResult: any = [];
    public advisorsValidation: any = [];
    public borderColor: any = [];
    public validAdvisor: boolean = false;
    public resp: any;
  isColapsed: boolean = true;
  isDirty = false;
  public advisorExists : boolean = false;
  public advisorLinked : boolean = false;
  public endDate: any = "";
  public startDate: any = "";
  public notes = [];
  public selectedAllCB : boolean = false;
  public selectAll : boolean = false;
    public statesCB = [];
    public stateMapping = [];
    public allCB = [];
  public nTob =  NUMBERTOBOOLEAN;  
  public fitScoreLoader : boolean = true;    
  public bFSLocationMapping = [];                
    public profileID: number = 0;
    public primaryMasterProfileID: number = 0;
    public locationList:any;
    public CurrentViewIdentifier: any;
    public locationTitle : string = "";
    public statusChange: any = "";
    public statusChangeFlag: any = 0;
    public buyerCwAccessMapping = PREMIUMBUERCWSTATUS;
    public oldValue: any;
    

  public profileDet = {
    buyerProfile: {   
      buyerProfileID: 0,
      buyerProfileName: "",            
      lastValuationDate: "",
      contractStartDate: "",
      contractEndDate: "",
      buyerProfileStatusCd: "NST",
      buyerProfileStatus: "Not Started",  
      buyerLocationCd:"",          
      isActive: 1,            
          buyerPortalCWStatus: 0,
          statusChange: 0,
    },
    advisors: [
      {
        masterRepID: "",
        fullName: "",
        buyerPortalAdvisorID: 0,
        buyerProfileID: 0,
        isPrimaryMaster: true,
        isActive: 1,
        repID: "",                
        hireDate: "",
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",                
        repUsername: null,
        isNewAdvisor: null, 
        isTerminated: null,
        buyerPortalCWStatus: "",     
        triggerEmailFlag:1
      }
    ],
    buyerFitScore: {
      buyerFitScoreID: 0,
      t12Revenue: null,
      annualExpenses: null,
      availableCapital: null,
      annuities: null,
      insurance: null,
      mutualFunds: null,
      alternatives: null,
      financialPlanning: null,
      other: null,
      isActive: 1,
      buyerFitScoreLocationMapping: []
    },
    notes: {
        noteID: 0,
        note: "",
        isInternal: 1,
        isActive: 0,
        readFlag: "R",
        createdByName: "",
        noteLevel: "BL",
    },
};
  optionOnBlur: any;
  pageHeading: string;

  constructor(private cs : CommunicationService, private userInfo : UserInfo, private apService: AssurancePlanService, private datePipe: DatePipe, private acRoute : ActivatedRoute, private cdr: ChangeDetectorRef,
      private modalService: BsModalService, private buyerService: PremiumBuyerService, private toastr: ToastrService,
      private fb: FormBuilder, private dealService: DealService,
    public router: Router, private location: Location) { 
      this.minDate = new Date();
      this.advisorForm = this.fb.group({
          buyerSeller: this.fb.array([]),
      });
      // this.checkForm = this.fb.group({
      //   checkBox: this.fb.array([])
      // })
    }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  ngOnInit() {
    this.cs.clearIsDirty();
    this.cs.displayLoader(true);
    this.fitScoreLoader = true;
    this.advisorSelected = false;
    this.currentUser = this.userInfo._currentUserFn();
    (this.CurrentViewIdentifier = 0);
    this.getLocation();    
    this.dataSource = Observable.create((observer: Observer<string>) => {
        observer.next(this.searchAdvisor);
    }).pipe(
        mergeMap((token: string) => {
            //this.dealSpecialistSelected = false;
            if (
                this.searchAdvisor != null &&
                this.searchAdvisor.length > 0
            ) {
              this.advisorLinked = false;
                return this.apService.searchMoreAdvisorPB(token, this.profileDet.buyerProfile.buyerProfileID);
            } else {
                //this.dealSpecialistSelected = true;
                this.advisorSelected = false;
                this.emptyAdvisorArray();
                return of([]);
            }
        })
    );

    let stateReq = {
      columnName: "state",
      username: this.currentUser.userName,
    };

    this.buyerService.getFilterValues(stateReq).subscribe(res => {
      console.log(res)
      if(res["status"] == "success"){
        let stateCB = res["data"];
        stateCB.forEach(element => {
          var eachState= {
            buyerFitScoreLocationMappingID: 0,
            stateCd: element.id,
            state: element.value,
            isActive: false,
          }
          this.statesCB.push(eachState);

        });
        console.log('got states')
      }
    })

    this.acRoute.params.subscribe((params) => {
      if (params["id"]) {
        this.pageHeading = "Edit Buyer Profile";
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
                        Name: "buyerProfileID",
                        ValueFilter: [params["id"]],
                    },
                ],
            },
            username: this.userInfo.userName,
            searchString: "",
        };
        this.buyerService.getPremiumBuyer(param).subscribe(result => {
          if (result["status"] == "success") {
            console.log( result["data"]["buyerList"][0])
              var buyerProfile = JSON.parse(JSON.stringify(result["data"]["buyerList"][0]));
              this.oldValue = JSON.parse(JSON.stringify(result["data"]["buyerList"][0]));
              console.log('array old', this.oldValue);
              this.profileDet.buyerProfile.buyerProfileID = buyerProfile.buyerProfileID;
              this.profileDet.buyerProfile["statusChange"] = 0;
              this.statusChange = buyerProfile.buyerProfileStatusCd;
            this.profileDet.buyerProfile.buyerLocationCd = buyerProfile.buyerLocationCd;
            this.profileDet.buyerProfile.buyerProfileName = buyerProfile.buyerProfileName;
            this.profileDet.buyerProfile.lastValuationDate = buyerProfile.lastValuationDate != null ? new Date(buyerProfile.lastValuationDate) : buyerProfile.lastValuationDate;

            this.profileDet.buyerProfile.contractStartDate = buyerProfile.contractStartDate != null ? new Date(buyerProfile.contractStartDate) : buyerProfile.contractStartDate;
            this.startDate = buyerProfile.contractStartDate != null ? new Date(buyerProfile.contractStartDate) : buyerProfile.contractStartDate;
            this.profileDet.buyerProfile.contractEndDate = buyerProfile.contractEndDate != null ? new Date(buyerProfile.contractEndDate) : buyerProfile.contractEndDate;
            this.endDate = buyerProfile.contractEndDate != null ? new Date(buyerProfile.contractEndDate) : buyerProfile.contractEndDate;

            this.profileDet.buyerProfile.buyerProfileStatusCd = buyerProfile.buyerProfileStatusCd;
            this.profileDet.buyerProfile.buyerProfileStatus = buyerProfile.buyerProfileStatus;
            this.profileStatus = buyerProfile.buyerProfileStatus;

            this.profileDet.buyerFitScore = buyerProfile.buyerFitScore != null  ? JSON.parse(JSON.stringify(buyerProfile.buyerFitScore)) : this.profileDet.buyerFitScore;

            this.profileDet.buyerFitScore.buyerFitScoreLocationMapping = [];

            //console.log('got edited states')

            this.bFSLocationMapping = (buyerProfile.buyerFitScore != null && buyerProfile.buyerFitScore.buyerFitScoreLocationMapping != undefined) ? buyerProfile.buyerFitScore.buyerFitScoreLocationMapping : [];

            setTimeout(() => {
              if(this.bFSLocationMapping.length > 0 && this.statesCB.length > 0){
              
                this.statesCB.map(state => {
                  this.bFSLocationMapping.find((ele) => {
                    if(state.stateCd == ele.stateCd){
                      state.isActive = ele.isActive;
                      state.buyerFitScoreLocationMappingID = ele.buyerFitScoreLocationMappingID;
                    }                 
                  })
                })
                this.allCB = this.statesCB.filter(el => el.isActive == true);
                //console.log(this.allCB.length)
                if(this.allCB.length == 51){
                  this.selectAll = true;
                  this.selectedAllCB = !this.selectedAllCB
  
                }
                this.fitScoreLoader = false;
              }
              else{
                this.fitScoreLoader = false;
              }
            },800)            

            if(buyerProfile.buyerFitScore != null){
              this.profileDet.buyerFitScore.t12Revenue = buyerProfile.buyerFitScore.t12Revenue != null ?Number(buyerProfile.buyerFitScore.t12Revenue).toLocaleString(): buyerProfile.buyerFitScore.t12Revenue;

              this.profileDet.buyerFitScore.availableCapital = buyerProfile.buyerFitScore.availableCapital != null ?Number(buyerProfile.buyerFitScore.availableCapital).toLocaleString(): buyerProfile.buyerFitScore.availableCapital;

              this.profileDet.buyerFitScore.annualExpenses = buyerProfile.buyerFitScore.annualExpenses != null ?Number(buyerProfile.buyerFitScore.annualExpenses).toLocaleString(): buyerProfile.buyerFitScore.annualExpenses;

              this.profileDet.buyerFitScore.annuities = buyerProfile.buyerFitScore.annuities != null ?Number(buyerProfile.buyerFitScore.annuities).toString(): buyerProfile.buyerFitScore.annuities;

              this.profileDet.buyerFitScore.insurance = buyerProfile.buyerFitScore.insurance != null ?Number(buyerProfile.buyerFitScore.insurance).toString(): buyerProfile.buyerFitScore.insurance;

              this.profileDet.buyerFitScore.mutualFunds = buyerProfile.buyerFitScore.mutualFunds != null ?Number(buyerProfile.buyerFitScore.mutualFunds).toString(): buyerProfile.buyerFitScore.mutualFunds;

              this.profileDet.buyerFitScore.alternatives = buyerProfile.buyerFitScore.alternatives != null ?Number(buyerProfile.buyerFitScore.alternatives).toString(): buyerProfile.buyerFitScore.alternatives;

              this.profileDet.buyerFitScore.financialPlanning = buyerProfile.buyerFitScore.financialPlanning != null ?Number(buyerProfile.buyerFitScore.financialPlanning).toString(): buyerProfile.buyerFitScore.financialPlanning;

              this.profileDet.buyerFitScore.other = buyerProfile.buyerFitScore.other != null ?Number(buyerProfile.buyerFitScore.other).toString(): buyerProfile.buyerFitScore.other;

            }

            this.notes = JSON.parse(JSON.stringify(buyerProfile.notes));


            this.typAhedResList = buyerProfile.advisors;
            
            buyerProfile.advisors.forEach(element => {
              if(element.isPrimaryMaster == true){
                this.profileDet.advisors[0] = element;
                this.searchAdvisor = element.repID;
                  this.advisorSelected = true;
                  this.primaryMasterProfileID = element.buyerPortalAdvisorID;
                 // this.oldValue = this.profileDet.advisors[0];
                  //console.log('oldValue', this.oldValue);
              }
              else{
                this.buyerSeller().push(this.newBuyerSeller());
                this.advisorsValidation.push({
                  advisorName: true,
                  repId: true,                
                });               
                
                this.secondaryAdvisors.push( element);
                
              }
            });
            
            this.secondaryAdvisors.forEach((element,i) => {
              
              this.advisorForm.controls["buyerSeller"]["controls"][i].patchValue({
                repId: element.repID,
                advisorName: element.fullName,
                //advisorRole: item.advisorRole,
                buyerPortalCWStatus: element.buyerPortalCWStatus == 0
                ? "Access Off"
                : element.buyerPortalCWStatus == 1
                ? "Access On"
                : "",
              });
              this.advisorsValidation[i].advisorName = false;
              this.advisorsValidation[i].repId = false;
              
            });
            this.validAdvisor = true;
            console.log(this.profileDet)
            this.cs.clearLoader();
          }
          else{
            this.cs.clearLoader()
          }
        })
      }
      else{
        this.pageHeading = "Create Buyer Profile";
        this.fitScoreLoader = false;
        this.cs.clearLoader();
      }
    })

    

  }

  getLocation(){
    let param = {
      viewId: this.CurrentViewIdentifier,
      columnName: "state",
      username: this.currentUser.userName,
  };
    this.buyerService
    .getFilterValues(param)
    .subscribe((rsp) => {
        if (rsp["status"] == "success") {
            
            this.locationList= rsp["data"];
           
            
        } else {
            console.log("error");
        }
    });

  }

  selectedLocation(locId){
    this.locationTitle = "";
    this.locationList.forEach(element => {
      if(element.id == locId){
        this.locationTitle = element.value;
      }
    });
  }

  emptyAdvisorArray(){
    this.profileDet.advisors = [
      {
        masterRepID: "",
        fullName: "",
        buyerPortalAdvisorID: this.primaryMasterProfileID,
        buyerProfileID: 0,
        isPrimaryMaster: true,
        isActive: 1,
        repID: "",                
        hireDate: "",
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",                
        repUsername: null,
        isNewAdvisor:1, 
        isTerminated: null,
        buyerPortalCWStatus: "",
        triggerEmailFlag:1
      }
    ]
  };

  trackByFn(index, item) {
    return item.id;
  }

  onModelChange(modal: any) {
      this.cs.setIsDirty(true);
      console.log('modal', modal);
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

  typeaheadOnSelectAdvisor(event: TypeaheadMatch): void {
    console.log(event)
    this.searchAdvisor = event.item.repID;
    this.advisorLinked = false;
    //this.advisorSelected = false;
    if(event.item.isBuyerProfileExists == 1){
      this.advisorLinked = true;
      this.advisorSelected = false;
    }
    else{
      this.advisorLinked = false;
      this.advisorExists = false;
        if (this.buyerSeller().controls.length > 0) {
        this.buyerSeller().controls.forEach(element => {
            console.log('element row',element);
          if(element.value.repId == event.item.repID){
            this.advisorExists = true;          
          }
        });
      }

      if(this.advisorExists == false){
        this.advisorSelected = true;
        this.profileDet.advisors[0].masterRepID = event.item.repID;
          this.profileDet.advisors[0].fullName = event.item.firstName + ' ' + event.item.lastName;//event.item.fullName;
        this.profileDet.advisors[0].isPrimaryMaster = true;
        this.profileDet.advisors[0].isActive = 1;
        this.profileDet.advisors[0].repID = event.item.repID;
       // this.profileDet.advisors[0].hireDate = event.item.hireDate;
        this.profileDet.advisors[0].firstName = event.item.firstName;
        this.profileDet.advisors[0].middleName = event.item.middleName;
        this.profileDet.advisors[0].lastName = event.item.lastName;
        this.profileDet.advisors[0].email = event.item.email;
        this.profileDet.advisors[0].repUsername = event.item.repUserName;
        //this.profileDet.advisors[0].repListType = event.item.repListType;
        this.profileDet.advisors[0].isTerminated = 0;
          this.profileDet.advisors[0].isNewAdvisor = this.profileDet.advisors[0].isNewAdvisor == null ? 1 : this.profileDet.advisors[0].isNewAdvisor;
          this.profileDet.advisors[0].triggerEmailFlag = 0;
      }
      else{
        this.advisorSelected = false;
        this.emptyAdvisorArray();
      }
    
    }
    
    
  }
    typeaheadOnBlur(event: any): void {
        //console.log(event)
        this.optionOnBlur = event.item;
        if (
            this.optionOnBlur &&
            this.searchAdvisor !== this.optionOnBlur.firstName + ' '+ this.optionOnBlur.lastName
        ) {
            this.searchAdvisor = "";
            this.profileDet.advisors[0].fullName = "";
            this.noResult = false;


        }
    }
    changeTypeaheadLoading(e: boolean): void {
       
            if (this.searchAdvisor == "") {
                this.typeaheadLoading = false;
            } else {
                this.typeaheadLoading = e;
            }
              

    }
    typeaheadNoResults(event: boolean): void {
        if (this.searchAdvisor == "") {
            this.noResult = false;
        } else {
            this.noResult = event;
        }
        //this.emptyAdvisorArray();
        
  }

  typeaheadOnSelectMoreAdvisor(event: TypeaheadMatch,advisor): void {
    console.log(event)
    this.advisorSelected = true;
    advisor.masterRepID = event.item.repID;
      advisor.fullName = event.item.firstName + ' ' + event.item.lastName;//event.item.fullName;
    advisor.isPrimaryMaster = false;
    advisor.isActive = true;
    advisor.repID = event.item.repID;
    //advisor.hireDate = event.item.hireDate;
    advisor.firstName = event.item.firstName;
    advisor.middleName = event.item.middleName;
    advisor.lastName = event.item.lastName;
    advisor.email = event.item.email;
    advisor.repUserName = event.item.repUserName;
   // advisor.repListType = event.item.repListType;
    advisor.isTerminated = 0;
    
  }
    typeaheadNoMAResults(event: boolean, advisor, i): void {
       
     
    }

    
    // createCheckBoxs(e){
    //  // return this.checkForm.get("checkBox") as FormArray;

    //   const checkBox: FormArray = this.checkForm.get('checkBox') as FormArray;

    // if (e.target.checked) {
    //   checkBox.push(new FormControl(e.target.value));
    // } else {
    //   let i: number = 0;
    //   checkBox.controls.forEach((item: FormControl) => {
    //     if (item.value == e.target.value) {
    //       checkBox.removeAt(i);
    //       return;
    //     }
    //     i++;
    //   });
    // }
    // }

    buyerSeller(): FormArray {
        return this.advisorForm.get("buyerSeller") as FormArray;
    }

    newBuyerSeller(): FormGroup {
        return this.fb.group({
            repId: "",
            advisorName: "",           
            buyerPortalCWStatus: "",
        });
    }

    addAdvisorList() {
        if (this.buyerSeller().length < 5) {
        this.buyerSeller().push(this.newBuyerSeller());
        this.typAhedResList[this.typAhedResList.length] = [];
        this.advisorsValidation.push({
            advisorName: true,
            repId: true,
            buyerPortalCWStatus: "",
          
        });
        this.advNoResult.push("");
        this.borderColor.push(false);
        this.validAdvisor = false;
            this.cs.setIsDirty(true);
        }

        //console.log(this.advNoResult)
    }

    searchRepID(token, i, event) {
        console.log(event, token, i);
        if (token.value.repId == "") {
            this.advNoResult[i] = "";
            this.borderColor[i] = true;
            this.advisorForm.controls["buyerSeller"]["controls"][i].patchValue({
                repId: "",
                advisorName: "",
                buyerPortalCWStatus: "",
            });
           // this.secondaryAdvisors.splice(i, 1);
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
            }
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
                this.apService.searchMoreAdvisorPB(token.value.repId, this.profileDet.buyerProfile.buyerProfileID)
                    .subscribe((result) => {
                        this.resp = result;
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
        
        if (this.advisorForm.controls["buyerSeller"]["controls"].length > 0) {
            var filterArr = this.advisorForm.controls["buyerSeller"][
                "controls"
            ].filter(
                (formItem) =>
                    formItem.controls.repId.value.toUpperCase() ==
                    item.repID.toUpperCase()
            );
            if(item.isBuyerProfileExists == 1){
              this.advNoResult[i] =
                      "Master Rep ID is already linked to an existing buyer profile. Please enter a different Master Rep ID or search for the existing profile to update it.";
                  this.typAhedResList[i] = [];
                  return false;
            }
            else{
              var primaryRep = this.profileDet.advisors.filter((rep) => rep.repID == item.repID.toUpperCase());
              if (filterArr.length > 1 || primaryRep.length > 0) {
                  this.advNoResult[i] =
                      "This Rep ID is already added. Choose another one.";
                  this.typAhedResList[i] = [];
                  return false;
              }
            }
            
        }
        //if (this.profileDet.advisors.length > 1) {
          

        //    if (primaryRep.length > 1) {
        //        this.advNoResult[i] =
        //            "This Rep ID is already added. Choose another one.";
        //        this.typAhedResList[i] = [];
        //        return false;
        //    }
        //} 
      this.profileDet.advisors[0].isTerminated = 0;
      let advisorProfileID ;
      let newAdvisor = 1;
      let buyerCWStatus=null;
      this.secondaryAdvisors.forEach(element => {
        if(element.repID == item.repID){
          newAdvisor = element.isNewAdvisor;
          buyerCWStatus = element.buyerPortalCWStatus
        }
      });
      if(this.pageHeading == "Edit Buyer Profile"){
        advisorProfileID = this.profileDet.advisors[0].buyerProfileID;       
      }
      else{
        advisorProfileID = item.buyerProfileID
      }
        var masterAdvList = {
          buyerPortalAdvisorID: 0,
            buyerProfileID: advisorProfileID,
            repID: item.repID,
            masterRepID: item.repID,
            fullName: item.firstName + ' ' + item.lastName,
            firstName: item.firstName,
            middleName: item.middleName,
            lastName: item.lastName,
            isActive: 1,
            email: item.email,
            repUsername: item.repUserName,
            isTerminated: item.isTermimated,
            hireDate: null, 
            isBuyerProfileExists: item.isBuyerProfileExists,
            isPrimaryMaster: false,
            isNewAdvisor : newAdvisor,
            buyerPortalCWStatus: buyerCWStatus

        };
        if (this.secondaryAdvisors.length>0)
            this.secondaryAdvisors[i + 1] = masterAdvList;
        else
            this.secondaryAdvisors[i] = masterAdvList;

        //this.profileDet.advisors[i] = masterAdvList;
        this.advisorForm.controls["buyerSeller"]["controls"][i].patchValue({
            repId: item.repID,
            advisorName: item.firstName+' '+item.lastName,
            //advisorRole: item.advisorRole,
            buyerPortalCWStatus: buyerCWStatus == 0
            ? "Access Off"
            : buyerCWStatus == 1
            ? "Access On"
            : "",
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
        //console.log(this.secondaryAdvisors);
        
    }

  addAdvsiors(length) {
    if (length < 5) {
        let newAdvisor = {
          masterRepID: "",
          fullName: "",
          buyerPortalAdvisorID: 0,
          buyerProfileID: 0,
          isPrimaryMaster: false,
          isActive: true,
          repID: "",                
          hireDate: "",
          firstName: "",
          middleName: "",
          lastName: "",
          email: "",                
          repUserName: null,
          //repListType: "", 
          isTerminated: "" 
          
        };

        this.secondaryAdvisors.push(newAdvisor);
        
    }
    
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
                this.advNoResult.splice(i, 1);
                //this.savedDataArray.dealJson.masterAdvisorList[i].isActive = 0;
                //console.log(i, repId);
                this.secondaryAdvisors.map(item => {
                    if (item.repID == repId) {
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
                    this.advNoResult = [];
                }
                if (!invalid) this.validAdvisor = true;
                
            } else {
            }
        });
    }
  getMoreAdvisor(repId){
    var ds = Observable.create((observer: Observer<string>) => {
      observer.next(repId);
    }).pipe(
      mergeMap((token: string) => {
          //this.dealSpecialistSelected = false;
          if (
            repId != null && repId.length > 0
          ) {
              return this.apService.searchMoreAdvisorPB(token, this.profileDet.buyerProfile.buyerProfileID);
          } else {
              //this.dealSpecialistSelected = true;
              //this.emptyDealSpecialistArray();
              this.advisorSelected = false;
              return of([]);
          }
      })
    );

    return ds;
  }

  selectedStatus(event) {
    //console.log(event)
    this.profileDet.buyerProfile.buyerProfileStatus = event;
    if (event == "Terminated") {
        
        this.profileDet.buyerProfile.buyerProfileStatusCd = "TER";        
    } else if(event == "Active"){
        
        this.profileDet.buyerProfile.buyerProfileStatusCd = "ACT"
    }
    else{
      this.profileDet.buyerProfile.buyerProfileStatusCd = "NST"
    }
  }

  changeStatus(event){
    //console.log(event)
    let givenStartDate = (event != null) ? new Date(event) : event;
    if(givenStartDate > this.currentDate || givenStartDate == null){
      this.profileDet.buyerProfile.buyerProfileStatus = "Not Started";
      this.profileDet.buyerProfile.buyerProfileStatusCd = "NST"
      this.profileStatus ="Not Started"

    }
    else if(givenStartDate <= this.currentDate){
      this.profileDet.buyerProfile.buyerProfileStatus = "Active";
      this.profileDet.buyerProfile.buyerProfileStatusCd = "ACT";
      this.profileStatus ="Active"
    }
  }

  onValueChange(event, from) {
    this.endDateError = false;
    let format = "MMM d, yyyy";
    if (from == "startDate") {         
        

        var minClosedate = new Date(event);
        this.minDate.setDate(minClosedate.getDate() + 1);
        this.minDate.setMonth(minClosedate.getMonth());
        this.minDate.setFullYear(minClosedate.getFullYear());
        
        this.profileDet.buyerProfile.contractStartDate = this.datePipe.transform(
            event,
            format
        );
        
    } else if (from == "endDate") {
        this.profileDet.buyerProfile.contractEndDate = this.datePipe.transform(
            event,
            format
        );
    } else if (from == "valuationDate") {
        this.profileDet.buyerProfile.lastValuationDate = this.datePipe.transform(
            event,
            format
        );
        
    }
    
    if(new Date(this.profileDet.buyerProfile.contractStartDate) >=  new Date(this.profileDet.buyerProfile.contractEndDate)){
      this.endDateError = true;
    }
    else{
      this.endDateError = false;
    }

    //console.log(this.profileStatus,'valueChange')
    // console.log(this.profileDet.buyerProfile.contractStartDate);
    // console.log(this.profileDet.buyerProfile.contractEndDate)
    
}

  onCancel() {
    
    this.location.back();
  }

  openConfirmation(){
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
    this.bsModalRef.content.confirm.subscribe(value => {
      if(value == "true"){
        this.cs.clearIsDirty();
        this.cs.displayLoader(true);
        let buyerProfile = {
          profileJson: {},
          username: "",
        };
          if (
              this.statusChange == "" ||
              this.statusChange ==
              this.profileDet.buyerProfile.buyerProfileStatusCd
          ) {
              this.statusChangeFlag = 0;
          } else {
              this.statusChangeFlag =
                  this.statusChange == "ACT" ? 1 : 2;
          }
          if (this.oldValue && this.oldValue.advisors.length > 0) {
              this.oldValue.advisors.forEach(element => {
                  if (element.isPrimaryMaster == true) {

                      this.oldValue = element;
                      console.log('oldValue', this.oldValue);
                     
                  }
              });
          }
          if (this.profileDet.advisors.length > 0) {
              if (this.profileDet.buyerProfile.buyerProfileID > 0) {
                  //this.oldValue["triggerEmailFlag"] = 0;
                  this.profileDet.advisors[0].triggerEmailFlag = 0;
                  if (this.statusChangeFlag == 1) {
                      this.profileDet.advisors[0].triggerEmailFlag = 2;
                      //this.oldValue["triggerEmailFlag"] = 2;
                  }
                  else if (this.statusChangeFlag == 2) {
                      if (this.profileDet.buyerProfile.buyerProfileStatusCd == 'ACT')
                      this.profileDet.advisors[0].triggerEmailFlag = 1;
                     // this.oldValue["triggerEmailFlag"] = 2;
                  } 
                  if (this.oldValue.repID != this.profileDet.advisors[0].repID) {
                      //element["triggerEmailFlag"] = 0;
                      if (this.statusChangeFlag == 1)
                          this.oldValue["triggerEmailFlag"] = 2;
                      else
                          this.oldValue["triggerEmailFlag"] = 0;
                      this.oldValue.isActive = 0;
                      this.oldValue.isPrimaryMaster = false;
                      if (this.profileDet.buyerProfile.buyerProfileStatusCd == 'ACT')
                          this.profileDet.advisors[0].triggerEmailFlag = 1;
                      else
                          this.profileDet.advisors[0].triggerEmailFlag = 0;
                      this.profileDet.advisors.push(this.oldValue);
                  }
                  //else {
                  //    this.profileDet.advisors[0].triggerEmailFlag = 0;
                  //}

              }
              else {                  
                          if (this.profileDet.buyerProfile.buyerProfileStatusCd == 'ACT') {
                              this.profileDet.advisors[0].triggerEmailFlag = 1;
                          }
                          else {
                              this.profileDet.advisors[0].triggerEmailFlag = 0;
                          }

                   
              }
              
          }
          if (this.secondaryAdvisors.length > 0) {
              console.log('this.secondaryAdvisors', this.secondaryAdvisors);
              this.secondaryAdvisors.forEach(element => {
                  //this.profileDet.advisors[0]["triggerEmailFlag"] = 0;
                  element["triggerEmailFlag"] = 0;
                  if (this.statusChangeFlag == 1) {
                    if (element.isNewAdvisor == 0) {
                        element["triggerEmailFlag"] = 2;
                    }

                }
                  else if (this.statusChangeFlag == 2) {
                      if (this.profileDet.buyerProfile.buyerProfileStatusCd == 'ACT') {
                          if (element.isActive == 1)
                              element["triggerEmailFlag"] = 1;
                          //else
                          //    element["triggerEmailFlag"] = 2;
                      }
                }
                else {
                    if (this.profileDet.buyerProfile.buyerProfileID == 0) {
                        if (this.profileDet.buyerProfile.buyerProfileStatusCd == 'ACT') {
                            if (element.isActive == 1) {
                                element["triggerEmailFlag"] = 1;
                            }
                        }
                    }
                    else {
                        if (this.profileDet.buyerProfile.buyerProfileStatusCd == 'ACT') {
                            if (element.isNewAdvisor == 1 && element.isActive == 1) {
                                element["triggerEmailFlag"] = 1;
                            }
                            if (element.isNewAdvisor == 0 && element.isActive == 0) {
                                element["triggerEmailFlag"] = 2;
                            }
                        }
                    }
                   
                }

               
            this.profileDet.advisors.push(element);
          });
          }


        this.profileDet.buyerFitScore.t12Revenue = this.profileDet.buyerFitScore.t12Revenue != null ? this.profileDet.buyerFitScore.t12Revenue.toString().indexOf(",") != -1 ? this.profileDet.buyerFitScore.t12Revenue.toString().replace(/,/g, "") : this.profileDet.buyerFitScore.t12Revenue: this.profileDet.buyerFitScore.t12Revenue;

        this.profileDet.buyerFitScore.annualExpenses = this.profileDet.buyerFitScore.annualExpenses != null ? this.profileDet.buyerFitScore.annualExpenses.toString().indexOf(",") != -1 ? this.profileDet.buyerFitScore.annualExpenses.toString().replace(/,/g, "") : this.profileDet.buyerFitScore.annualExpenses: this.profileDet.buyerFitScore.annualExpenses;

        this.profileDet.buyerFitScore.availableCapital = this.profileDet.buyerFitScore.availableCapital != null ? this.profileDet.buyerFitScore.availableCapital.toString().indexOf(",") != -1 ? this.profileDet.buyerFitScore.availableCapital.toString().replace(/,/g, "") : this.profileDet.buyerFitScore.availableCapital: this.profileDet.buyerFitScore.availableCapital;

        this.statesCB.forEach(element => {
           this.profileDet.buyerFitScore.buyerFitScoreLocationMapping.push(element);
          
        });
        

        if (this.profileDet.notes.note != "") {
          this.profileDet.notes.createdByName = this.currentUser.displayName;
          this.profileDet.notes.isActive = 1;
        }

        buyerProfile.profileJson = this.profileDet;
        buyerProfile.username = this.currentUser.userName;
        console.log(buyerProfile);
        this.buyerService.saveBuyerProfile(buyerProfile).subscribe((res) => {
          if(res["status"] == "success"){
            this.router.navigate([
              "/premium-buyer/premium-buyer-page",
            ]);
            this.cs.clearLoader();
            this.showSuccess()
          }
          else {
            this.cs.clearLoader();
            this.showError();
          }
        }, (err) => {
            this.cs.clearLoader();
            this.showError();
            this.cs.setIsDirty(true);
          })        
      }
    })
  }

  showSuccess() {
        
    this.toastr.success('The information has been saved successfully', '');
  }
  showError() {    
      this.toastr.error('A problem occurred while saving the information. Please try to save again.', '')
  }

  checkValue(event, field){
    if(field == "startDate" || field == "endDate"){
      event.preventDefault();
    }
    else{
      //console.log(event.keyCode);
      if(event.keyCode == 8){
        return true;
      }
      else{
        return false;
      }
    }
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

  validateValue(event){
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

  changeLocale(newValue, fieldName) {
    newValue = newValue.replace(/,/g, "");
    if (fieldName === "revenue") {
        if (newValue == "") {
            this.profileDet.buyerFitScore.t12Revenue = null;
        } else {
            this.profileDet.buyerFitScore.t12Revenue = Number(
                newValue
            ).toLocaleString();
        }
    }
    if (fieldName === "expenses") {
        if (newValue == "") {
            this.profileDet.buyerFitScore.annualExpenses = null;
        } else {
            this.profileDet.buyerFitScore.annualExpenses = Number(
                newValue
            ).toLocaleString();
        }
    }  
    if (fieldName === "capital") {
      if (newValue == "") {
          this.profileDet.buyerFitScore.availableCapital = null;
      } else {
          this.profileDet.buyerFitScore.availableCapital = Number(
              newValue
          ).toLocaleString();
      }
    }  
  }

  // selectState(event, selectedState){
  //   //console.log(event);
  //   if(event.target.checked == true){
  //     selectedState.isActive = true;
  //     //selectedState.selected = true
  //   }
  //   else{
  //     selectedState.isActive = false;
  //     //selectedState.selected = false
  //   }

  // }

  selectAllCB(event){
    if(event.target.checked == true){      
      this.statesCB.forEach(element => {
        element.isActive = true;
        //element.selected = true;
      });
    }
    else{
      
      this.statesCB.forEach(element => {
        element.isActive = false;
        //element.selected = false;
      });
    }
  }

  changeCBValue(event){
    if(event.target.checked == false){
      this.selectedAllCB = false;
      this.selectAll = false;
    }
  }

}
