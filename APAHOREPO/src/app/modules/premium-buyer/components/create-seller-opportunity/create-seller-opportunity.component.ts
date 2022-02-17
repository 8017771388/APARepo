import { Component, OnInit,ViewChild, ElementRef,ChangeDetectorRef } from '@angular/core';
import { Location } from "@angular/common";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { ConfirmModalComponent } from "../../../_shared/components/confirm-modal/confirm-modal.component";
import { CommunicationService } from "../../../_shared/services/communication.services";
import { DatePipe } from "@angular/common";

import { UserInfo } from "../../../_shared/services/userInfo.service";
import { isThisYear } from 'date-fns';
import { PremiumBuyerService } from '../../services/premium-buyer.service';
import { Router, ActivatedRoute, Resolve } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';

@Component({
  selector: 'app-create-seller-opportunity',
  templateUrl: './create-seller-opportunity.component.html',
  styleUrls: ['./create-seller-opportunity.component.scss'],
  providers: [DatePipe],
  host: {
    '(document:click)': 'outClick($event)',
  },
})



export class CreateSellerOpportunityComponent implements OnInit {

  @ViewChild("valuationMidPoint") midPointElement: ElementRef;
  @ViewChild("reccuringRevenue") reccuringRevenueElement: ElementRef;
  @ViewChild("aumFromClients70Plus") aumFromClients70PlusElement: ElementRef;
  @ViewChild("preferredDownPayment") preferredDownPaymentElement: ElementRef;
  @ViewChild("dropdownDiv") dropdownDivElement: ElementRef;
  @ViewChild("operatingExpenseRatio") operatingExpenseRatioElement: ElementRef;



  pageHeading: string;
  public bsModalRef: BsModalRef;
  public CurrentViewIdentifier: any;
  public currentUser: any;
  public locationList:any;
  public validValuation: boolean = false;
  isDirty: boolean = false;
  isShowDiv:boolean=false;
  checkboxLength:boolean=false;
  showLicenceValue:string='Series 7';
  AUMTotal:boolean=false;
  AUMTotalGDC:boolean=false;
  public locationTitle : string = "";

  public retainEmpCB = [{
      "id": "Y",
      "name": "Yes",
      "value": false,
      "disabled":false
    },
    {
      "id": "N",
      "name": "No",
      "value": false,
      "disabled":false
    },
    {
      "id": "P",
      "name": "Preferred",
      "value": false,
      "disabled":false
    }
  ]
 // this.pageHeading =

  public epLicence={
    'Common':[
     {"value":'SIE',"ischeck":false},
     {"value":'6',"ischeck":false},
     {"value":'7',"ischeck":false},
     {"value":'9',"ischeck":false},
     {"value":'10',"ischeck":false},
     {"value":'24',"ischeck":false},
     {"value":'26',"ischeck":false},
     {"value":'63',"ischeck":false},
     {"value":'65',"ischeck":false},
     {"value":'66',"ischeck":false}     
    ],    
    'Unique':[
      {"value":'22',"ischeck":false},
      {"value":'57',"ischeck":false},
      {"value":'79',"ischeck":false},
      {"value":'82',"ischeck":false},
      {"value":'86',"ischeck":false},
      {"value":'87',"ischeck":false},
      {"value":'99',"ischeck":false},
      {"value":'4',"ischeck":false},
      {"value":'14',"ischeck":false},
      {"value":'16',"ischeck":false},
      {"value":'23',"ischeck":false},
      {"value":'24',"ischeck":false},
      {"value":'26',"ischeck":false},
      {"value":'27',"ischeck":false},
      {"value":'28',"ischeck":false},
      {"value":'39',"ischeck":false},
      {"value":'50',"ischeck":false},
      {"value":'51',"ischeck":false},
      {"value":'52',"ischeck":false},
      {"value":'53',"ischeck":false},
      {"value":'54',"ischeck":false},
      {"value":'3',"ischeck":false},
      {"value":'30',"ischeck":false},
      {"value":'31',"ischeck":false},
      {"value":'32',"ischeck":false},
      {"value":'34',"ischeck":false},


      
    ]

  }

 public sellerOppDet = {
 
  "sellerProfile":{
 
   "sellerName": "",
   "sellerDescription": "",            
   "applicationDeadline": "",
    "source":"",
    "valuationMidPoint":"",
    "primaryMasterRepID":"",
    "stateCd":"",
    "region":"",
    "stageCd":"AO",
    "reccuringRevenue":"",
    "isActive": 1,            
    "buyerPortalCWStatus": null ,
    "sellerProfileID": 0

    
  },
    "sellerAUM": {
      "sellerAUMID": 0,
      "totalAUM":"",
      "advisory": "",            
      "mutualFunds": "",
      "annuities": "",
      "alternatives": "",
      "other": "",                                
      "isActive": 1            
          
  },
    "sellerGDC": {
      "sellerGDCID": 0,
      "totalGDC":"",
      "advisory": "",            
      "mutualFunds": "",
      "annuities": "",
      "insurance": "",
      "alternatives": "",
      "financialPlanning": "",
      "other": "",                                
      "isActive": 1  

    }      ,
    "sellerClientDetail": {
      "sellerClientDetailID": 0,
      "averageClientAge": "",            
      "aumFromClients70Plus": "",
      "clientsWith1MillionPlusAUM": "",
      "averageClientMeetingCadence": "",
      "households": "",
      "totalAnnualFinancialPlans": "",
      "crmSoftware": "",                                
      "isActive": 1       
          
  },
  
  "sellerBusinessDetail":
  {
  "sellerBusinessDetailID":0,
  "numberOfEmployess":"",
  "operatingExpenseRatio":"",
  "numberOfOwners":"",
  "ownersCompensation":"",
  "servicesOffered":"",
  "primaryCustodian":"",
  "primaryBrokerDealer":"",
  "financialPlanningSoftware":"",
  "preferredDealStructureCd":"",   
  "preferredDownPayment":"",
  "professionalDesignations":"",
  "targetCloseDate":"",
  "buyerIndustryExperienceCd":"",   
  
  "retainEmployees": "",
  "isActive":1,
  "sellerEmployeeLicense":
  [
  
  ]
   
  
  },
  username:""
          
  }

  public sellerStageObj = {
    "AO" : "Accepting Offers",
    "SP" : "Sale Pending",
    "SD" : "Sold",
    "UK" : "Unknown",
    "WD" : "Withdrawn"
  }

  public preDealStructureObj = {
    "1" : "Immediate Transition < 3 Months",
    "2" : "Sell and Stay < 12 Months",
    "3" : "Sell and Service > 12 Months",
    
  }
  
  
  constructor(private service:PremiumBuyerService,public router: Router,
    private cs : CommunicationService,private toastr: ToastrService,private acRoute : ActivatedRoute, 
    private location: Location,private modalService: BsModalService,private cdr: ChangeDetectorRef,private datePipe: DatePipe, private userInfo: UserInfo) { }
    ngAfterViewChecked() {
      this.cdr.detectChanges();
    }
  ngOnInit() {
    this.pageHeading = "Add Seller Opportunity";
    this.currentUser = this.userInfo._currentUserFn();
    (this.CurrentViewIdentifier = 0);
    this.getLocation();


    this.acRoute.params.subscribe((params) => {
      if (params["id"]) {
        console.log(params["id"])
        this.pageHeading = "Edit Seller Opportunity";
    this.getValueFromEditService(params["id"]);
    
      }else{
        this.pageHeading = "Add Seller Opportunity";
      }
    });
    
  }

  getValueFromEditService(param){
 
    this.service
    .getOpportunityDetails(param)
    .subscribe((rsp) => {
        if (rsp["status"] == "success") {
         
            this.sellerOppDet.sellerProfile.sellerName=rsp["data"].sellerName;
            this.sellerOppDet.sellerProfile.sellerDescription=rsp["data"].sellerDescription;
            this.sellerOppDet.sellerProfile.applicationDeadline=rsp["data"].applicationDeadline;
            this.sellerOppDet.sellerProfile.applicationDeadline = rsp["data"].applicationDeadline != null ? new Date(rsp["data"].applicationDeadline) : rsp["data"].applicationDeadline;

            this.sellerOppDet.sellerProfile.source=rsp["data"].source;
            this.sellerOppDet.sellerProfile.valuationMidPoint=rsp["data"].valuationMidPoint != null ? rsp["data"].valuationMidPoint : "";
            this.sellerOppDet.sellerProfile.primaryMasterRepID=rsp["data"].primaryMasterRepID
            this.sellerOppDet.sellerProfile.stateCd=rsp["data"].stateCd;
            this.sellerOppDet.sellerProfile.region=rsp["data"].region;
            this.sellerOppDet.sellerProfile.stageCd=rsp["data"].stageCd;
            this.sellerOppDet.sellerProfile.reccuringRevenue=rsp["data"].reccuringRevenue;
            this.sellerOppDet.sellerProfile.sellerProfileID=rsp["data"].sellerProfileID;

            this.sellerOppDet.sellerAUM=rsp["data"].sellerAUM;
            
            this.sellerOppDet.sellerAUM.advisory = this.sellerOppDet.sellerAUM.advisory != null ? this.sellerOppDet.sellerAUM.advisory : "";
            this.sellerOppDet.sellerAUM.mutualFunds = this.sellerOppDet.sellerAUM.mutualFunds != null ? this.sellerOppDet.sellerAUM.mutualFunds : "";
            this.sellerOppDet.sellerAUM.annuities = this.sellerOppDet.sellerAUM.annuities != null ? this.sellerOppDet.sellerAUM.annuities : "";
            this.sellerOppDet.sellerAUM.alternatives = this.sellerOppDet.sellerAUM.alternatives != null ? this.sellerOppDet.sellerAUM.alternatives : ""; 
            this.sellerOppDet.sellerAUM.other = this.sellerOppDet.sellerAUM.other != null ? this.sellerOppDet.sellerAUM.other : ""; 

            this.sellerOppDet.sellerAUM.totalAUM=rsp["data"].sellerAUM.totalAum;

            this.sellerOppDet.sellerGDC=rsp["data"].sellerGDC;
            
            this.sellerOppDet.sellerGDC.advisory = this.sellerOppDet.sellerGDC.advisory != null ? this.sellerOppDet.sellerGDC.advisory : "";
            this.sellerOppDet.sellerGDC.mutualFunds = this.sellerOppDet.sellerGDC.mutualFunds != null ? this.sellerOppDet.sellerGDC.mutualFunds : "";
            this.sellerOppDet.sellerGDC.annuities = this.sellerOppDet.sellerGDC.annuities != null ? this.sellerOppDet.sellerGDC.annuities : "";
            this.sellerOppDet.sellerGDC.insurance = this.sellerOppDet.sellerGDC.insurance != null ? this.sellerOppDet.sellerGDC.insurance : "";
            this.sellerOppDet.sellerGDC.alternatives = this.sellerOppDet.sellerGDC.alternatives != null ? this.sellerOppDet.sellerGDC.alternatives : "";
            this.sellerOppDet.sellerGDC.financialPlanning = this.sellerOppDet.sellerGDC.financialPlanning != null ? this.sellerOppDet.sellerGDC.financialPlanning : "";
            this.sellerOppDet.sellerGDC.other = this.sellerOppDet.sellerGDC.other != null ? this.sellerOppDet.sellerGDC.other : "";


            this.sellerOppDet.sellerBusinessDetail=rsp["data"].sellerBusinessDetail;
            this.sellerOppDet.sellerBusinessDetail.ownersCompensation = this.sellerOppDet.sellerBusinessDetail.ownersCompensation != null ? this.sellerOppDet.sellerBusinessDetail.ownersCompensation : "";
            this.sellerOppDet.sellerClientDetail=rsp["data"].sellerClientDetail;

            if(this.sellerOppDet.sellerBusinessDetail.retainEmployees != ""){
              this.retainEmpCB.forEach(element=>{
                if(element.name==this.sellerOppDet.sellerBusinessDetail.retainEmployees){
                  element.value=true;
                }
                else{
                  element.disabled = true;
                }
              })
            }            
           
            var myArray=rsp["data"].sellerBusinessDetail.sellerEmployeeLicense; 
            this.checkisChecked();
            
            var html="";
            if(myArray.length>0){
              for (var i=0; i < myArray.length; i++) {
                if(myArray.length==1){
                 html+=myArray[i].sellerEmployeeLicense ;
                }else if(i==myArray.length-1){
                  html+=myArray[i].sellerEmployeeLicense ;
                }else{
                  html+=myArray[i].sellerEmployeeLicense + ",";
                }
              }
              this.showLicenceValue=html;
            }else{
              this.showLicenceValue="Series 7";
            }
            
            this.addCommaToModel();

           
            
        } else {
            console.log("error");
        }
    });
    //https://datapowerdevint.sddev.lpl.com/buyer-profile-api/prc/1.0/get-sellerprofile/{id} 

  }

  checkisChecked(){
    
    console.log("heree@#$")
    var myArray=this.sellerOppDet.sellerBusinessDetail.sellerEmployeeLicense;
    console.log(this.epLicence.Common.length)
   
      
      for (var i=0; i < myArray.length; i++) {
        
        for(var j=0; j< this.epLicence.Common.length;j++){
        
          if (myArray[i].sellerEmployeeLicense == this.epLicence.Common[j].value && myArray[i].sellerEmployeeLicenseType=='Common') {
            console.log("|||")
            this.epLicence.Common[j].ischeck=true;
            break;
          }

      }
     
    }

    


      
      for (var i=0; i < myArray.length; i++) {
        for(var j=0;j< this.epLicence.Unique.length;j++){

          if (myArray[i].sellerEmployeeLicense === this.epLicence.Unique[j].value && myArray[i].sellerEmployeeLicenseType=='Unique') {
            this.epLicence.Unique[j].ischeck=true;
            break;
          }
      }
    }


    console.log( this.epLicence);
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

  getLocation(){
    let param = {
      viewId: this.CurrentViewIdentifier,
      columnName: "state",
      username: this.currentUser.userName,
  };
    this.service
    .getFilterValues(param)
    .subscribe((rsp) => {
        if (rsp["status"] == "success") {
            
            this.locationList= rsp["data"];
           
            
        } else {
            console.log("error");
        }
    });

  }


  valueChanged(newValue, fieldName) {
    newValue = newValue.replace(/,/g, "");
    if (fieldName === "valuationMidPoint") {
        if (newValue == "") {
            this.sellerOppDet.sellerProfile.valuationMidPoint = null;
        } else {
          this.sellerOppDet.sellerProfile.valuationMidPoint = Number(
                newValue
            ).toLocaleString();
        }
    }
    if (fieldName === "ownersCompensation") {
      if (newValue == "") {
          this.sellerOppDet.sellerBusinessDetail.ownersCompensation = null;
      } else {
        this.sellerOppDet.sellerBusinessDetail.ownersCompensation = Number(
              newValue
          ).toLocaleString();
      }
  }

  if(fieldName==="totalGDC"){
      
    if(newValue == ""){
      this.sellerOppDet.sellerGDC.totalGDC = null;
     
    } else{
      this.sellerOppDet.sellerGDC.totalGDC = Number(
        newValue
      ).toLocaleString();
      
    }
  } 

    if(fieldName==="aumtotalAum"){
      
      if(newValue == ""){
        this.sellerOppDet.sellerAUM.totalAUM = null;
       
      } else{
        this.sellerOppDet.sellerAUM.totalAUM = Number(
          newValue
        ).toLocaleString();
        
      }
    } 
    if(fieldName==="aumadvisory"){
      
      if(newValue == ""){
        this.sellerOppDet.sellerAUM.advisory = null;
       
      } else{
        this.sellerOppDet.sellerAUM.advisory = Number(
          newValue
        ).toLocaleString();
        
      }
    } 
    else if(fieldName==="aummutualFunds"){
      
      if(newValue == ""){
        this.sellerOppDet.sellerAUM.mutualFunds = null;
      } else{
        this.sellerOppDet.sellerAUM.mutualFunds = Number(
          newValue
        ).toLocaleString();
      }
    } 
    else if(fieldName==="aumannuities"){
      
      if(newValue == ""){
        this.sellerOppDet.sellerAUM.annuities = null;
      } else{
        this.sellerOppDet.sellerAUM.annuities = Number(
          newValue
        ).toLocaleString();
      }
    } 
    else if(fieldName==="aumalternatives"){
      
      if(newValue == ""){
        this.sellerOppDet.sellerAUM.alternatives = null;
      } else{
        this.sellerOppDet.sellerAUM.alternatives = Number(
          newValue
        ).toLocaleString();
      }
    } 
    else if(fieldName==="aumother"){
      
      if(newValue == ""){
        this.sellerOppDet.sellerAUM.other = null;
      } else{
        this.sellerOppDet.sellerAUM.other = Number(
          newValue
        ).toLocaleString();
      }
    } 
    else if(fieldName==="gdcadvisory"){
      
      if(newValue == ""){
        this.sellerOppDet.sellerGDC.advisory = null;
       
      } else{
        this.sellerOppDet.sellerGDC.advisory = Number(
          newValue
        ).toLocaleString();
        
      }
    }
    else if(fieldName==="gdcadvisory"){
      
      if(newValue == ""){
        this.sellerOppDet.sellerGDC.advisory = null;
       
      } else{
        this.sellerOppDet.sellerGDC.advisory = Number(
          newValue
        ).toLocaleString();
        
      }
    }
    else if(fieldName==="gdcmutualFunds"){
      
      if(newValue == ""){
        this.sellerOppDet.sellerGDC.mutualFunds = null;
       
      } else{
        this.sellerOppDet.sellerGDC.mutualFunds = Number(
          newValue
        ).toLocaleString();
        
      }
    }
    else if(fieldName==="gdcannuities"){
      
      if(newValue == ""){
        this.sellerOppDet.sellerGDC.annuities = null;
       
      } else{
        this.sellerOppDet.sellerGDC.annuities = Number(
          newValue
        ).toLocaleString();
        
      }
    }
    else if(fieldName==="gdcinsurance"){
      
      if(newValue == ""){
        this.sellerOppDet.sellerGDC.insurance = null;
       
      } else{
        this.sellerOppDet.sellerGDC.insurance = Number(
          newValue
        ).toLocaleString();
        
      }
    }
    else if(fieldName==="gdcalternatives"){
      
      if(newValue == ""){
        this.sellerOppDet.sellerGDC.alternatives = null;
       
      } else{
        this.sellerOppDet.sellerGDC.alternatives = Number(
          newValue
        ).toLocaleString();
        
      }
    }

    else if(fieldName==="gdcfinancialPlanning"){
      
      if(newValue == ""){
        this.sellerOppDet.sellerGDC.financialPlanning = null;
       
      } else{
        this.sellerOppDet.sellerGDC.financialPlanning = Number(
          newValue
        ).toLocaleString();
        
      }
    }

    else if(fieldName==="gdcother"){
      
      if(newValue == ""){
        this.sellerOppDet.sellerGDC.other = null;
       
      } else{
        this.sellerOppDet.sellerGDC.other = Number(
          newValue
        ).toLocaleString();
        
      }
    }


    

    this.checkValuation(fieldName);
}


addCommaToModel() {
  
  
      if ( this.sellerOppDet.sellerProfile.valuationMidPoint === null || this.sellerOppDet.sellerProfile.valuationMidPoint === "") {
          this.sellerOppDet.sellerProfile.valuationMidPoint = null;
      }else if(this.sellerOppDet.sellerProfile.valuationMidPoint=="0"){
        this.sellerOppDet.sellerProfile.valuationMidPoint = "0";
      } else {
        this.sellerOppDet.sellerProfile.valuationMidPoint = Number(
          this.sellerOppDet.sellerProfile.valuationMidPoint
          ).toLocaleString();
      }
  
  
    if (this.sellerOppDet.sellerBusinessDetail.ownersCompensation === null || this.sellerOppDet.sellerBusinessDetail.ownersCompensation === "") {
        this.sellerOppDet.sellerBusinessDetail.ownersCompensation = null;
    }else if(this.sellerOppDet.sellerBusinessDetail.ownersCompensation=="0"){
      this.sellerOppDet.sellerBusinessDetail.ownersCompensation = "0";
    } else {
      this.sellerOppDet.sellerBusinessDetail.ownersCompensation = Number(
        this.sellerOppDet.sellerBusinessDetail.ownersCompensation
        ).toLocaleString();
    }


  if(this.sellerOppDet.sellerGDC.totalGDC === null || this.sellerOppDet.sellerGDC.totalGDC===''){
    this.sellerOppDet.sellerGDC.totalGDC = null;
   
  }else if(this.sellerOppDet.sellerGDC.totalGDC =="0"){
    this.sellerOppDet.sellerGDC.totalGDC= "0";
  } else{
    this.sellerOppDet.sellerGDC.totalGDC = Number(
      this.sellerOppDet.sellerGDC.totalGDC
    ).toLocaleString();
    
  }

    if(this.sellerOppDet.sellerAUM.totalAUM === null || this.sellerOppDet.sellerAUM.totalAUM===''){
      this.sellerOppDet.sellerAUM.totalAUM = null;
     
    }else if(this.sellerOppDet.sellerAUM.totalAUM=="0"){
      this.sellerOppDet.sellerAUM.totalAUM = "0";
    } else{
      this.sellerOppDet.sellerAUM.totalAUM = Number(
        this.sellerOppDet.sellerAUM.totalAUM
      ).toLocaleString();
      
    
  } 
  
    
    if(this.sellerOppDet.sellerAUM.advisory === null || this.sellerOppDet.sellerAUM.advisory===''){
      this.sellerOppDet.sellerAUM.advisory = null;
     
    }else if(this.sellerOppDet.sellerAUM.advisory=="0"){
      this.sellerOppDet.sellerAUM.advisory = "0";
    } else{
      this.sellerOppDet.sellerAUM.advisory = Number(
        this.sellerOppDet.sellerAUM.advisory
      ).toLocaleString();
      
    }
  
 
    
    if(this.sellerOppDet.sellerAUM.mutualFunds === null || this.sellerOppDet.sellerAUM.mutualFunds === ''){
      console.log("xyz1")
      this.sellerOppDet.sellerAUM.mutualFunds = null;
    }else if(this.sellerOppDet.sellerAUM.mutualFunds=="0"){
      console.log("xyz")
      this.sellerOppDet.sellerAUM.mutualFunds = "0";
    } else{
      console.log("xyz2")
      this.sellerOppDet.sellerAUM.mutualFunds = Number(
        this.sellerOppDet.sellerAUM.mutualFunds
      ).toLocaleString();
    }
  
  
    
    if(this.sellerOppDet.sellerAUM.annuities === null || this.sellerOppDet.sellerAUM.annuities === ''){
      this.sellerOppDet.sellerAUM.annuities = null;
    }else if(this.sellerOppDet.sellerAUM.annuities=="0"){
      this.sellerOppDet.sellerAUM.annuities = "0";
    } else{
      this.sellerOppDet.sellerAUM.annuities = Number(
        this.sellerOppDet.sellerAUM.annuities
      ).toLocaleString();
    }
  
    
    if(this.sellerOppDet.sellerAUM.alternatives === null || this.sellerOppDet.sellerAUM.alternatives===''){
      this.sellerOppDet.sellerAUM.alternatives = null;
    }else if(this.sellerOppDet.sellerAUM.alternatives=="0"){
      this.sellerOppDet.sellerAUM.alternatives = "0";
    } else{
      this.sellerOppDet.sellerAUM.alternatives = Number(
        this.sellerOppDet.sellerAUM.alternatives
      ).toLocaleString();
    }
  
  
    if(this.sellerOppDet.sellerAUM.other === null || this.sellerOppDet.sellerAUM.other===''){
      this.sellerOppDet.sellerAUM.other = null;
    }else if(this.sellerOppDet.sellerAUM.other=="0"){
      this.sellerOppDet.sellerAUM.other = "0";
    } else{
      this.sellerOppDet.sellerAUM.other = Number(
        this.sellerOppDet.sellerAUM.other
      ).toLocaleString();
    }


    if(this.sellerOppDet.sellerGDC.advisory === null || this.sellerOppDet.sellerGDC.advisory ===''){
      this.sellerOppDet.sellerGDC.advisory = null;
      console.log("alwaysq")
     
    }else if(parseInt(this.sellerOppDet.sellerGDC.advisory)==0){
      console.log("always2")
      this.sellerOppDet.sellerGDC.advisory = "0";
    } else{
      console.log("alway")
      this.sellerOppDet.sellerGDC.advisory = Number(
        this.sellerOppDet.sellerGDC.advisory
      ).toLocaleString();
      
    }
console.log(this.sellerOppDet.sellerGDC.advisory)
    
    if(this.sellerOppDet.sellerGDC.mutualFunds === null ||this.sellerOppDet.sellerGDC.mutualFunds===''){
      this.sellerOppDet.sellerGDC.mutualFunds = null;
     
    }else if(this.sellerOppDet.sellerGDC.mutualFunds=="0"){
      this.sellerOppDet.sellerGDC.mutualFunds = "0";
    } else{
      this.sellerOppDet.sellerGDC.mutualFunds = Number(
        this.sellerOppDet.sellerGDC.mutualFunds
      ).toLocaleString();
      
    }
    
    if(this.sellerOppDet.sellerGDC.annuities === null || this.sellerOppDet.sellerGDC.annuities===''){
      this.sellerOppDet.sellerGDC.annuities = null;
     
    }else if(this.sellerOppDet.sellerGDC.annuities=="0"){
      this.sellerOppDet.sellerGDC.annuities = "0";
    } else{
      this.sellerOppDet.sellerGDC.annuities = Number(
        this.sellerOppDet.sellerGDC.annuities
      ).toLocaleString();
      
    }
  
  
    
    if(this.sellerOppDet.sellerGDC.insurance === null || this.sellerOppDet.sellerGDC.insurance===''){
      this.sellerOppDet.sellerGDC.insurance = null;
     
    }else if(this.sellerOppDet.sellerGDC.insurance=="0"){
      this.sellerOppDet.sellerGDC.insurance = "0";
    } else{
      this.sellerOppDet.sellerGDC.insurance = Number(
        this.sellerOppDet.sellerGDC.insurance
      ).toLocaleString();
      
    }
  

    
    if(this.sellerOppDet.sellerGDC.alternatives === null || this.sellerOppDet.sellerGDC.alternatives===''){
      this.sellerOppDet.sellerGDC.alternatives = null;
     
    }else if(this.sellerOppDet.sellerGDC.alternatives=="0"){
      this.sellerOppDet.sellerGDC.alternatives = "0";
    } else{
      this.sellerOppDet.sellerGDC.alternatives = Number(
        this.sellerOppDet.sellerGDC.alternatives
      ).toLocaleString();
      
    }
  

    
    if(this.sellerOppDet.sellerGDC.financialPlanning === null || this.sellerOppDet.sellerGDC.financialPlanning=== ''){
      this.sellerOppDet.sellerGDC.financialPlanning = null;
     
    }else if(this.sellerOppDet.sellerGDC.financialPlanning==="0"){
      this.sellerOppDet.sellerGDC.financialPlanning = "0";
    } else{
      this.sellerOppDet.sellerGDC.financialPlanning = Number(
        this.sellerOppDet.sellerGDC.financialPlanning
      ).toLocaleString();
      
    }
  

    
    if(this.sellerOppDet.sellerGDC.other === null || this.sellerOppDet.sellerGDC.other === ''){
      this.sellerOppDet.sellerGDC.other = null;
     
    }else if(this.sellerOppDet.sellerGDC.other=="0"){
      this.sellerOppDet.sellerGDC.other = "0";
    } else{
      this.sellerOppDet.sellerGDC.other = Number(
        this.sellerOppDet.sellerGDC.other
      ).toLocaleString();
      
    }
  


}

checktotalValue(fieldName){

  if(fieldName=='aumtotalAum' || fieldName=='aumadvisory'|| fieldName=='aummutualFunds'|| fieldName=='aumannuities' 
    || fieldName=='aumalternatives'
    || fieldName=='aumother' ){

      var advisory = (this.sellerOppDet.sellerAUM.advisory == '' || this.sellerOppDet.sellerAUM.advisory == null || this.sellerOppDet.sellerAUM.advisory == undefined) ? 0 : parseInt(this.sellerOppDet.sellerAUM.advisory.replace(/,/g, ''));
      var alternatives = (this.sellerOppDet.sellerAUM.alternatives == '' || this.sellerOppDet.sellerAUM.alternatives == null || this.sellerOppDet.sellerAUM.alternatives == undefined) ? 0 : parseInt(this.sellerOppDet.sellerAUM.alternatives.replace(/,/g, ''));
      var annuities = (this.sellerOppDet.sellerAUM.annuities == '' || this.sellerOppDet.sellerAUM.annuities == null || this.sellerOppDet.sellerAUM.annuities == undefined) ? 0 : parseInt(this.sellerOppDet.sellerAUM.annuities.replace(/,/g, ''));
      var mutualFunds = (this.sellerOppDet.sellerAUM.mutualFunds == '' || this.sellerOppDet.sellerAUM.mutualFunds == null || this.sellerOppDet.sellerAUM.mutualFunds == undefined) ? 0 : parseInt(this.sellerOppDet.sellerAUM.mutualFunds.replace(/,/g, ''));
      var other = (this.sellerOppDet.sellerAUM.other == '' || this.sellerOppDet.sellerAUM.other == null || this.sellerOppDet.sellerAUM.other == undefined) ? 0 : parseInt(this.sellerOppDet.sellerAUM.other.replace(/,/g, ''));
      var totalAUM=this.sellerOppDet.sellerAUM.totalAUM==''?0:parseInt(this.sellerOppDet.sellerAUM.totalAUM.replace(/,/g, ''));


      var total= advisory + alternatives + annuities + mutualFunds + other;
      console.log(total)


      if ((totalAUM != total)&&(total>0) ){
        this.AUMTotal=true;
      }else{
        this.AUMTotal=false;
      }


      
    }

}

checktotalValueGDC(fieldName){

  if( fieldName=='gdcfinancialPlanning'|| fieldName=='gdcalternatives'|| fieldName=='gdcinsurance' 
    || fieldName=='gdcannuities' || fieldName=='gdcmutualFunds'
    || fieldName=='gdcother' || fieldName=='totalGDC' || fieldName=='gdcadvisory' ){

      var gdcfinancialPlanning = (this.sellerOppDet.sellerGDC.financialPlanning == '' || this.sellerOppDet.sellerGDC.financialPlanning == null || this.sellerOppDet.sellerGDC.financialPlanning == undefined) ? 0 : parseInt(this.sellerOppDet.sellerGDC.financialPlanning.replace(/,/g, ''));
      var alternatives = (this.sellerOppDet.sellerGDC.alternatives == '' || this.sellerOppDet.sellerGDC.alternatives == null || this.sellerOppDet.sellerGDC.alternatives == undefined) ? 0 : parseInt(this.sellerOppDet.sellerGDC.alternatives.replace(/,/g, ''));
      var insurance = (this.sellerOppDet.sellerGDC.insurance == '' || this.sellerOppDet.sellerGDC.insurance == null || this.sellerOppDet.sellerGDC.insurance == undefined) ? 0 : parseInt(this.sellerOppDet.sellerGDC.insurance.replace(/,/g, ''));
      var annuities = (this.sellerOppDet.sellerGDC.annuities == '' || this.sellerOppDet.sellerGDC.annuities == null || this.sellerOppDet.sellerGDC.annuities == undefined) ? 0 : parseInt(this.sellerOppDet.sellerGDC.annuities.replace(/,/g, ''));
      var mutualFunds = (this.sellerOppDet.sellerGDC.mutualFunds == '' || this.sellerOppDet.sellerGDC.mutualFunds == null || this.sellerOppDet.sellerGDC.mutualFunds == undefined) ? 0 : parseInt(this.sellerOppDet.sellerGDC.mutualFunds.replace(/,/g, ''));
      var other = (this.sellerOppDet.sellerGDC.other == '' || this.sellerOppDet.sellerGDC.other == null || this.sellerOppDet.sellerGDC.other == undefined) ? 0 : parseInt(this.sellerOppDet.sellerGDC.other.replace(/,/g, ''));
      var advisory = (this.sellerOppDet.sellerGDC.advisory == '' || this.sellerOppDet.sellerGDC.advisory == null || this.sellerOppDet.sellerGDC.advisory == undefined) ? 0 : parseInt(this.sellerOppDet.sellerGDC.advisory.replace(/,/g, ''));
      var totalGDC=this.sellerOppDet.sellerGDC.totalGDC==''?0:parseInt(this.sellerOppDet.sellerGDC.totalGDC.replace(/,/g, ''));



      var total= advisory + gdcfinancialPlanning + alternatives + mutualFunds + other+ insurance + annuities ;
      console.log(total)


      if((totalGDC !=total) && (total>0)){
        this.AUMTotalGDC=true;
      }else{
        this.AUMTotalGDC=false;
      }


      
    }

}




checkValue(event, field) {

  
  
 
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

checkValueAum(event, field) {

  
  
 
  if (
    (event.keyCode > 47 && event.keyCode < 58) ||
    (event.keyCode > 95 && event.keyCode < 106) ||
    event.keyCode === 8 ||
    event.keyCode === 9
) {
    var rawValue = event.target.value;
    rawValue = rawValue.replace(/,/g, "");
    if (rawValue > 9999999999) {
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



checkValuePercent( evnt,el) { 
  var charC = (evnt.which) ? evnt.which : evnt.keyCode; 
  if (charC == 46) { 
      if (el.value.indexOf('.') === -1) { 
          return true; 
      } else { 
          return false; 
      } 
  } else { 
      if (charC > 31 && (charC < 48 || charC > 57)) 
          return false; 
  } 
  return true; 
} 

checkValuation(field) {
    setTimeout(() => {
        if (
            this.midPointElement.nativeElement.classList.contains(
                "invalid"
            ) ||
            this.midPointElement.nativeElement.classList.contains(
                "invalid"
            )
           
        ) {
            this.validValuation = true;
        } else {
            this.validValuation = false;
        }
    }, 2);
}
  onCancel() {
    
    this.router.navigate([
      "/premium-buyer/seller",
    ]);
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

        this.retainEmpCB.forEach(element => {
          if(element.value == true){
            this.sellerOppDet.sellerBusinessDetail.retainEmployees = element.name;
          }
         
        });

        this.sellerOppDet.username=this.currentUser.userName;

        this.removeComma();   
       


        this.service.saveSellerOpportunity(this.sellerOppDet).subscribe((res) => {
          if(res["status"] == "success"){
            this.router.navigate([
              "/premium-buyer/seller",
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

  removeComma(){

    this.sellerOppDet.sellerProfile.valuationMidPoint =
    this.sellerOppDet.sellerProfile.valuationMidPoint != null ?
    this.sellerOppDet.sellerProfile.valuationMidPoint.toString().indexOf(",") != -1 ?
    this.sellerOppDet.sellerProfile.valuationMidPoint.toString().replace(/,/g, "") :
    this.sellerOppDet.sellerProfile.valuationMidPoint:this.sellerOppDet.sellerProfile.valuationMidPoint;
     
    this.sellerOppDet.sellerAUM.totalAUM =
    this.sellerOppDet.sellerAUM.totalAUM != null ?
    this.sellerOppDet.sellerAUM.totalAUM.toString().indexOf(",") != -1 ?
    this.sellerOppDet.sellerAUM.totalAUM.toString().replace(/,/g, "") :
    this.sellerOppDet.sellerAUM.totalAUM:this.sellerOppDet.sellerAUM.totalAUM;

    this.sellerOppDet.sellerAUM.advisory =
    this.sellerOppDet.sellerAUM.advisory != null ?
    this.sellerOppDet.sellerAUM.advisory.toString().indexOf(",") != -1 ?
    this.sellerOppDet.sellerAUM.advisory.toString().replace(/,/g, "") :
    this.sellerOppDet.sellerAUM.advisory:this.sellerOppDet.sellerAUM.advisory;

    this.sellerOppDet.sellerAUM.mutualFunds =
    this.sellerOppDet.sellerAUM.mutualFunds != null ?
    this.sellerOppDet.sellerAUM.mutualFunds.toString().indexOf(",") != -1 ?
    this.sellerOppDet.sellerAUM.mutualFunds.toString().replace(/,/g, "") :
    this.sellerOppDet.sellerAUM.mutualFunds:this.sellerOppDet.sellerAUM.mutualFunds;

    this.sellerOppDet.sellerAUM.annuities =
    this.sellerOppDet.sellerAUM.annuities != null ?
    this.sellerOppDet.sellerAUM.annuities.toString().indexOf(",") != -1 ?
    this.sellerOppDet.sellerAUM.annuities.toString().replace(/,/g, "") :
    this.sellerOppDet.sellerAUM.annuities:this.sellerOppDet.sellerAUM.annuities;

    this.sellerOppDet.sellerAUM.alternatives =
    this.sellerOppDet.sellerAUM.alternatives != null ?
    this.sellerOppDet.sellerAUM.alternatives.toString().indexOf(",") != -1 ?
    this.sellerOppDet.sellerAUM.alternatives.toString().replace(/,/g, "") :
    this.sellerOppDet.sellerAUM.alternatives:this.sellerOppDet.sellerAUM.alternatives;

    this.sellerOppDet.sellerAUM.other =
    this.sellerOppDet.sellerAUM.other != null ?
    this.sellerOppDet.sellerAUM.other.toString().indexOf(",") != -1 ?
    this.sellerOppDet.sellerAUM.other.toString().replace(/,/g, "") :
    this.sellerOppDet.sellerAUM.other:this.sellerOppDet.sellerAUM.other;

    this.sellerOppDet.sellerGDC.totalGDC =
    this.sellerOppDet.sellerGDC.totalGDC != null ?
    this.sellerOppDet.sellerGDC.totalGDC.toString().indexOf(",") != -1 ?
    this.sellerOppDet.sellerGDC.totalGDC.toString().replace(/,/g, "") :
    this.sellerOppDet.sellerGDC.totalGDC:this.sellerOppDet.sellerGDC.totalGDC;

    this.sellerOppDet.sellerGDC.advisory =
    this.sellerOppDet.sellerGDC.advisory != null ?
    this.sellerOppDet.sellerGDC.advisory.toString().indexOf(",") != -1 ?
    this.sellerOppDet.sellerGDC.advisory.toString().replace(/,/g, "") :
    this.sellerOppDet.sellerGDC.advisory:this.sellerOppDet.sellerGDC.advisory;

    this.sellerOppDet.sellerGDC.mutualFunds =
    this.sellerOppDet.sellerGDC.mutualFunds != null ?
    this.sellerOppDet.sellerGDC.mutualFunds.toString().indexOf(",") != -1 ?
    this.sellerOppDet.sellerGDC.mutualFunds.toString().replace(/,/g, "") :
    this.sellerOppDet.sellerGDC.mutualFunds:this.sellerOppDet.sellerGDC.mutualFunds;

    this.sellerOppDet.sellerGDC.annuities =
    this.sellerOppDet.sellerGDC.annuities != null ?
    this.sellerOppDet.sellerGDC.annuities.toString().indexOf(",") != -1 ?
    this.sellerOppDet.sellerGDC.annuities.toString().replace(/,/g, "") :
    this.sellerOppDet.sellerGDC.annuities:this.sellerOppDet.sellerGDC.annuities;

    this.sellerOppDet.sellerGDC.insurance =
    this.sellerOppDet.sellerGDC.insurance != null ?
    this.sellerOppDet.sellerGDC.insurance.toString().indexOf(",") != -1 ?
    this.sellerOppDet.sellerGDC.insurance.toString().replace(/,/g, "") :
    this.sellerOppDet.sellerGDC.insurance:this.sellerOppDet.sellerGDC.insurance;
  
    this.sellerOppDet.sellerGDC.alternatives =
    this.sellerOppDet.sellerGDC.alternatives != null ?
    this.sellerOppDet.sellerGDC.alternatives.toString().indexOf(",") != -1 ?
    this.sellerOppDet.sellerGDC.alternatives.toString().replace(/,/g, "") :
    this.sellerOppDet.sellerGDC.alternatives:this.sellerOppDet.sellerGDC.alternatives;

    this.sellerOppDet.sellerGDC.financialPlanning =
    this.sellerOppDet.sellerGDC.financialPlanning != null ?
    this.sellerOppDet.sellerGDC.financialPlanning.toString().indexOf(",") != -1 ?
    this.sellerOppDet.sellerGDC.financialPlanning.toString().replace(/,/g, "") :
    this.sellerOppDet.sellerGDC.financialPlanning:this.sellerOppDet.sellerGDC.financialPlanning;

    this.sellerOppDet.sellerGDC.other =
    this.sellerOppDet.sellerGDC.other != null ?
    this.sellerOppDet.sellerGDC.other.toString().indexOf(",") != -1 ?
    this.sellerOppDet.sellerGDC.other.toString().replace(/,/g, "") :
    this.sellerOppDet.sellerGDC.other:this.sellerOppDet.sellerGDC.other;

      this.sellerOppDet.sellerBusinessDetail.ownersCompensation =
      this.sellerOppDet.sellerBusinessDetail.ownersCompensation != null ?
      this.sellerOppDet.sellerBusinessDetail.ownersCompensation.toString().indexOf(",") != -1 ?
      this.sellerOppDet.sellerBusinessDetail.ownersCompensation.toString().replace(/,/g, "") :
      this.sellerOppDet.sellerBusinessDetail.ownersCompensation : this.sellerOppDet.sellerBusinessDetail.ownersCompensation;

      


  }

  showSuccess() {
        
    this.toastr.success('The information has been saved successfully', '');
  }
  showError() {    
      this.toastr.error('A problem occurred while saving the information. Please try to save again.', '')
  }
  onValueChange(event, from) {
    
    let format = "MMM d, yyyy";
    if (from == "applicationDeadline") {  
      this.sellerOppDet.sellerProfile.applicationDeadline = this.datePipe.transform(
        event,
        format
    );
          
    }   
   
    
}
openClosedropdown(){
  if(this.isShowDiv){
    this.isShowDiv=false;
  }else{
    this.isShowDiv=true;
  }
}

checkLength(event){

  if(this.sellerOppDet.sellerBusinessDetail.sellerEmployeeLicense.length==8 &&  event.target.checked){
    this.checkboxLength=true;
    event.preventDefault();
    
  }
}

addValue(event){
  console.log(event.target.name, event.target.value, event.target.checked);
  let valueSplit=event.target.value.split("-");
  let value=valueSplit[1];
  console.log(this.sellerOppDet.sellerBusinessDetail.sellerEmployeeLicense)
  if(event.target.checked){

    if(this.sellerOppDet.sellerBusinessDetail.sellerEmployeeLicense.length==8){
      this.checkboxLength=true;
      event.preventDefault();
      return;
    }

    if(this.sellerOppDet.sellerBusinessDetail.sellerEmployeeLicense.length<=8){
   
      var createdObj={
        "sellerEmployeeLicenseID":0,
        "sellerEmployeeLicense":value,
        "sellerEmployeeLicenseType":valueSplit[0], 
        "isActive":1
      };
      
      this.sellerOppDet.sellerBusinessDetail.sellerEmployeeLicense.push(createdObj);
          }
      
  }else{
      var myArray=this.sellerOppDet.sellerBusinessDetail.sellerEmployeeLicense;
        for (var i=0; i < myArray.length; i++) {
            if (myArray[i].sellerEmployeeLicense === value && myArray[i].sellerEmployeeLicenseType==valueSplit[0]) {
                myArray.splice(i, 1);
            }
        }
        this.sellerOppDet.sellerBusinessDetail.sellerEmployeeLicense=myArray;
        this.checkboxLength=false;
    
  }

  var myArray=this.sellerOppDet.sellerBusinessDetail.sellerEmployeeLicense;
  var html="";

  if(myArray.length>0){
        for (var i=0; i < myArray.length; i++) {
          if(myArray.length==1){
           html+=myArray[i].sellerEmployeeLicense ;
          }else if(i==myArray.length-1){
            html+=myArray[i].sellerEmployeeLicense ;
          }else{
            html+=myArray[i].sellerEmployeeLicense + ",";
          }
        }
        this.showLicenceValue=html;
      }else{
        this.showLicenceValue="Series 7";
      }

        

}

outClick(event){

  
  var container = document.getElementById('dropdownParent');
    if (!container.contains(event.target)) {
      this.isShowDiv=false;
      this.checkboxLength=false;
     

      
    }
}

  onModelChange(modal: any) {
    this.cs.setIsDirty(true);
}

changeCBValue(event, checkedEmp){
  if(event.target.checked == true){
    this.retainEmpCB.forEach(element => {
      if(element.name != checkedEmp.name){
        element.disabled = true;
      }
      else{
        element.disabled = false;
      }
    });
  }
  else{
    this.retainEmpCB.forEach(element => {
      if(element.value == false){
        element.disabled = false;
      }
      if(element.name == this.sellerOppDet.sellerBusinessDetail.retainEmployees){
        this.sellerOppDet.sellerBusinessDetail.retainEmployees = ""
      }
    });
  }
}

selectedLocation(locId){
  this.locationTitle = "";
  this.locationList.forEach(element => {
    if(element.id == locId){
      this.locationTitle = element.value;
    }
  });
}

checkValueAD(event, field){
  //console.log(event)
    if(event.keyCode == 8 || event.keyCode == 46){
      return true;
    }
    else{
      return false;
    }
  }
}
