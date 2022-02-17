import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { DxDateBoxModule, DxSelectBoxModule } from 'devextreme-angular';
import CustomStore from "devextreme/data/custom_store";
import { PremiumBuyerService } from '../../services/premium-buyer.service';
import { UserInfo } from "../../../_shared/services/userInfo.service";
import { Router } from "@angular/router";
import { CommunicationService } from "../../../_shared/services/communication.services";
import { MONTH } from '../../../_shared/constants/global.constant';
import { SELLERSTAGE } from '../../../_shared/constants/global.constant';

@Component({
  selector: 'app-seller-list',
  templateUrl: './seller-list.component.html',
  styleUrls: ['./seller-list.component.scss']
})
export class SellerListComponent implements OnInit {

  @ViewChild("gridContainer") gridContainer: DxDataGridComponent;

  public searchText : any = "";
  public dataSource: any = {};
  public totalCount: number;
  public totalActiveCount: number;
  public customFilterData: any = {};
  public filterData: any;
  public CurrentViewIdentifier: any;
  public currentUser: any;
  public pageNumbered: number;
  public pagingInfo: string = "";
  public sellerList: any;
  public showHeaderFilter: boolean = true;
  public filterValue = ["AO", "SP", "UK"];
  public filterValueSource = ["APBOE", "FP Transitions", "LPL", "SRG"];
  public sellerStageObj = [
     "Accepting Offers",
   "Sale Pending",
     "Sold",
     "Unknown",
     "Withdrawn"
  ]
  public months = MONTH;
  public stage_seller = SELLERSTAGE;
  public filterValueArray = [
      {
          "text":"APBOE",
          "value":"APBOE"
      },
      {
        "text":"FP Transitions",
        "value":"FP Transitions"
    },
    {
        "text":"LPL",
        "value":"LPL"
    },
    {
        "text":"SRG",
        "value":"SRG"
    },
  ]

  public sellerRes = {
 
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

  constructor(private service : PremiumBuyerService, private userInfo : UserInfo, public router : Router, private cs : CommunicationService) { }

  ngOnInit() {
    this.totalCount = 0;
    this.totalActiveCount = 0;
    this.filterData = {sellerprofilestage: "" };
    this.currentUser = this.userInfo._currentUserFn();
    
    (this.CurrentViewIdentifier = 0),
    this.customFilterData = {
        sellerprofilestage: { value: ["AO", "SP", "UK"] }}
    this.initializeGrid();
  }

  initializeGrid() {
    this.headerFilterData();
    this.dataSource.store = new CustomStore({
        key: "sellerProfileID",
        load: (loadOptions: any) => {
            let param = this.generateParameter(loadOptions);
            return new Promise((resolve) => {
                this.service.getSellers(param).subscribe((result) => {
                    //var result = this.service.getSellers(param);
                    console.log(result);
                    if (result["status"] == "success") {
                        //var result = this.service.getMatchingDealsData("");
                        let data = result["data"];
                        this.totalCount = result["data"].totalCount;
                        this.totalActiveCount =
                            result["data"].totalActiveCount;
                        this.sellerList =
                            result["data"].sellerList;
                        data.sellerList.forEach((item: any) => {
                            item.showFilter = false;
                        });
                        resolve({
                            data: data["sellerList"],
                            totalCount: data["totalCount"],
                            totalActiveCount: data["totalActiveCount"],
                        });
                    } else {
                        console.log("error");
                    }
                });
            });
        },
    });
  }

  headerFilterData() {
    let _self = this;
    for (let obj in this.filterData) {
        this.filterData[obj] = new CustomStore({
            load: function (loadOptions) {
                return new Promise((resolve, reject) => {
                    let parameters = {};
                    let colName = loadOptions.filter;
                    let result = [];
                    console.log(obj)
                    let param = {
                        viewId: _self.CurrentViewIdentifier,
                        columnName: obj,
                        username: _self.currentUser.userName,
                    };

                    _self.service
                        .getFilterValues(param)
                        .subscribe((rsp) => {
                            if (rsp["status"] == "success") {

                                if(obj == "sellerprofilestage"){
                                    _self.cs.setSellerStageFlag(true);
                                }
                                else{
                                    _self.cs.setSellerStageFlag(false); 
                                }
                                
                                let temp = rsp["data"];
                                temp.forEach((obj) => {
                                    result.push({
                                        text: obj.value,
                                        value: obj.id,
                                    });
                                });
                                resolve({
                                    data: result,
                                    totalCount: temp["totalCount"],
                                    totalActiveCount:
                                        temp["totalActiveCount"],
                                });
                            } else {
                                console.log("error");
                            }
                        });
                });
            },
        });
    }
  }

  generateParameter(loadOptions) {
    let orderByColumns = [];
    let parameters = { orderby: "", sortOrder: 0 };
    if (loadOptions.sort) {
        parameters.orderby = loadOptions.sort[0].selector;
        parameters.sortOrder = loadOptions.sort[0].desc ? 1 : 0;
        orderByColumns.push({
            ColumnName: parameters.orderby,
            SortOrder: parameters.sortOrder,
            Sequence: 1,
        });
    }

    let param = {
        CurrentViewIdentifier: 0,
        CurrentPageNumber: this.getPageNumber(loadOptions),
        PageSize: 25,
        OrderByColumns: orderByColumns,
        GridDataFilter: this.transformFilterData(loadOptions),
        searchString: this.searchText,
    };

    return param;
  }

  getPageNumber(loadOptions) {
    let pageNumber =
        loadOptions.skip === 0
            ? 1
            : (loadOptions.skip + loadOptions.take) / loadOptions.take;
    if (isNaN(pageNumber)) pageNumber = 1;
    this.pageNumbered = pageNumber;
    this.getPagingInfo(this.pageNumbered);
    return pageNumber;
  }

  getPagingInfo(pgNumber) {
    if (pgNumber == 1) {
        this.pagingInfo = "1-25";
    } else if (pgNumber > 1) {
        let firstIndex = 25 * (pgNumber - 1) + 1;
        let lastIndex = 25 * pgNumber;

        if (lastIndex > this.totalCount) {
            lastIndex = this.totalCount;
        }

        this.pagingInfo =
            firstIndex.toString() + "-" + lastIndex.toString();
    }
  }

  transformFilterData(loadOptions) {
    console.log(loadOptions);
    //this.customFilterData = {};
    if (loadOptions.filter && loadOptions.filter.length > 0) {
        if (loadOptions.filter[1] == "and") {
            loadOptions.filter.forEach((f) => {
                if (f[1] == "or") {
                    f.forEach((g) => {
                        this.createCustomFilter(g);
                    });
                } else {
                    this.createCustomFilter(f);
                }
            });
        } else {
            if (loadOptions.filter[1] == "or") {
                loadOptions.filter.forEach((f) => {
                    this.createCustomFilter(f);
                });
            } else {
                this.createCustomFilter(loadOptions.filter);
            }
        }
    }
    else{
        this.cs.getSellerStageFlag().subscribe(stage => {
            if(stage == true){
                
                this.customFilterData = {
                sellerprofilestage: { value: ["AO", "SD", "SP", "UK", "WD"] }}
                var filter = [];
                filter[0]="sellerprofilestage";
                filter[1]=this.customFilterData.sellerprofilestage.value;
                filter["columnIndex"]=5;
                filter["value"]=this.customFilterData.sellerprofilestage.value;
                loadOptions.filter = filter;
                this.createCustomFilter(loadOptions.filter);
            }
            else{
                
                this.customFilterData = {
                    sellerprofilestage: { value: ["AO", "SP", "UK"] }}
                var filter = [];
                filter[0]="sellerprofilestage";
                filter[1]=this.customFilterData.sellerprofilestage.value;
                filter["columnIndex"]=5;
                filter["value"]=this.customFilterData.sellerprofilestage.value;
                loadOptions.filter = filter;
                this.createCustomFilter(loadOptions.filter);
            }
        })
    }

    let GridDataFilter = {
        ColumnFilterList: [],
    };
    console.log(this.customFilterData);
    for (let i in this.customFilterData) {
        GridDataFilter.ColumnFilterList.push({
            Name: i,
            ValueFilter: this.customFilterData[i].value,
        });
    }
    this.customFilterData = {};
    return GridDataFilter;
  }
  createCustomFilter(f) {
    
    if (f != "or" && f != "and") {
        //let val = f[1];
        let val = f["filterValue"];
        let col = f[0];
        if (col == "isactive") {
            val = f["filterValue"] ? 1 : 0;
            if (val >= 0 && col && f.columnIndex >= 0) {
                if (
                    this.customFilterData[col] &&
                    this.customFilterData[col].value &&
                    this.customFilterData[col].value.indexOf(val) < 0
                ) {
                    this.customFilterData[col].value.push(val);
                } else {
                    this.customFilterData[col] = {
                        value: [val],
                    };
                }
            }
        } else if (val && col && f.columnIndex >= 0) {
            if (
                this.customFilterData[col] &&
                this.customFilterData[col].value &&
                this.customFilterData[col].value.indexOf(val) < 0
            ) {
                this.customFilterData[col].value.push(val);
            } else {
                this.customFilterData[col] = {
                    value: [val],
                };
            }
        }
        console.log(this.customFilterData);
    }
  }

  searchSeller() {
    this.gridContainer.instance.refresh();
  }

  searchOnEnter(e) {
    if (e.keyCode == 13) {
        if (this.searchText) this.searchSeller();
    }
    if (e.keyCode == 8 || e.keyCode == 46) {
        if (this.searchText.length == 1) this.searchSeller();
    }
  }

    goToEditProfile(profileID) {
        //this.communicationService.setEditDealFrom("admin");
        this.router.navigate(["/premium-buyer/seller/create-opportunity/" + profileID]);
    }
    
    changedDeadline(event, sellerObj){
        
        let formatDate;
        if (typeof (event.value) == 'object') {
            var format = event.value.toString().split(" ");
            formatDate = format[3] + '-' + this.months[format[1]] + '-' + format[2] + 'T' + format[4];

        }
        else {
            formatDate = event.value
        }
        var param = {
            sellerProfileID: sellerObj.sellerProfileID,
            username:this.currentUser.userName,
            stageCd: sellerObj.stageCd,
            applicationDeadline: formatDate
        }
        this.service.inlineUpdateSellerProfile(param).subscribe(rsp => {
            if (rsp["status"] == "success") {
                this.gridContainer.instance.refresh();
            }
        })
        //this.service.getOpportunityDetails(sellerObj.sellerProfileID).subscribe(res => {
        //    if (res["status"] == "success"){
        //        if(typeof(event.value) == 'object'){
        //            var format = event.value.toString().split(" ");
        //            formatDate = format[3]+'-'+this.months[format[1]]+'-'+format[2]+'T'+format[4];
                    
        //        }
        //        else{
        //            formatDate = event.value
        //        }
        //        console.log(formatDate)
        //        this.sellerRes.sellerProfile.sellerName=res["data"].sellerName;
        //        this.sellerRes.sellerProfile.sellerDescription=res["data"].sellerDescription;
        //        this.sellerRes.sellerProfile.applicationDeadline = formatDate;
                

        //        this.sellerRes.sellerProfile.source=res["data"].source;
        //        this.sellerRes.sellerProfile.valuationMidPoint=res["data"].valuationMidPoint != null ? res["data"].valuationMidPoint : "";
        //        this.sellerRes.sellerProfile.primaryMasterRepID=res["data"].primaryMasterRepID
        //        this.sellerRes.sellerProfile.stateCd=res["data"].stateCd;
        //        this.sellerRes.sellerProfile.region=res["data"].region;
        //        this.sellerRes.sellerProfile.stageCd=res["data"].stageCd;
        //        this.sellerRes.sellerProfile.reccuringRevenue=res["data"].reccuringRevenue;
        //        this.sellerRes.sellerProfile.sellerProfileID=res["data"].sellerProfileID;

        //        this.sellerRes.sellerAUM = res["data"].sellerAUM;
        //        this.sellerRes.sellerBusinessDetail = res["data"].sellerBusinessDetail;
        //        this.sellerRes.sellerClientDetail = res["data"].sellerClientDetail;
        //        this.sellerRes.sellerGDC = res["data"].sellerGDC;
        //        this.sellerRes.username=this.currentUser.userName;
                
        //        this.service.saveSellerOpportunity(this.sellerRes).subscribe(rsp =>{
        //            if(rsp["status"] == "success"){
        //                this.gridContainer.instance.refresh();
        //            }
        //        })
        //    }
        //})
    }

    changedStage(event,sellerObj){
        console.log(event)
        var param = {
            sellerProfileID: sellerObj.sellerProfileID,
            username: this.currentUser.userName,
            stageCd: this.stage_seller[event.value],
            applicationDeadline: sellerObj.applicationDeadline
        }
        this.service.inlineUpdateSellerProfile(param).subscribe(rsp => {
            if (rsp["status"] == "success") {
                this.gridContainer.instance.refresh();
            }
        })
        //this.service.getOpportunityDetails(sellerObj.sellerProfileID).subscribe(res => {
        //    if (res["status"] == "success"){
                
        //        this.sellerRes.sellerProfile.sellerName=res["data"].sellerName;
        //        this.sellerRes.sellerProfile.sellerDescription=res["data"].sellerDescription;
        //        this.sellerRes.sellerProfile.applicationDeadline = res["data"].applicationDeadline;
                

        //        this.sellerRes.sellerProfile.source=res["data"].source;
        //        this.sellerRes.sellerProfile.valuationMidPoint=res["data"].valuationMidPoint != null ? res["data"].valuationMidPoint : "";
        //        this.sellerRes.sellerProfile.primaryMasterRepID=res["data"].primaryMasterRepID
        //        this.sellerRes.sellerProfile.stateCd=res["data"].stateCd;
        //        this.sellerRes.sellerProfile.region=res["data"].region;
        //        this.sellerRes.sellerProfile.stageCd=this.stage_seller[event.value];
        //        this.sellerRes.sellerProfile.reccuringRevenue=res["data"].reccuringRevenue;
        //        this.sellerRes.sellerProfile.sellerProfileID=res["data"].sellerProfileID;

        //        this.sellerRes.sellerAUM = res["data"].sellerAUM;
        //        this.sellerRes.sellerBusinessDetail = res["data"].sellerBusinessDetail;
        //        this.sellerRes.sellerClientDetail = res["data"].sellerClientDetail;
        //        this.sellerRes.sellerGDC = res["data"].sellerGDC;
        //        this.sellerRes.username=this.currentUser.userName;
                
        //        this.service.saveSellerOpportunity(this.sellerRes).subscribe(rsp =>{
        //            if(rsp["status"] == "success"){
        //                this.gridContainer.instance.refresh();
        //            }
        //        })
        //    }
        //})
    }

    calculateFilterExpressionSource(filterValue, selectedFilterOperation) {
        return ["source", filterValue];
    }

    calculateFilterExpressionStage(filterValue, selectedFilterOperation) {
        console.log(filterValue)
        return ["sellerprofilestage", filterValue];
    
    }


}
