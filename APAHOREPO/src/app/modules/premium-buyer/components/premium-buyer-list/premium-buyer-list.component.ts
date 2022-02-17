import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  DoCheck,
  ChangeDetectorRef,
} from "@angular/core";
import DataSource from "devextreme/data/data_source";
import ArrayStore from "devextreme/data/array_store";
import { DxDataGridComponent, DxDataGridModule } from "devextreme-angular";
import { DxDateBoxModule, DxSelectBoxModule } from 'devextreme-angular';
import CustomStore from "devextreme/data/custom_store";
import { CommunicationService } from "../../../_shared/services/communication.services";
import {
  AppSettings,
  CW_IMAGE_URL,
} from "../../../_shared/constants/api-constant";
import { Router } from "@angular/router";
//import { service } from "../../../home/services/home.service";
import { UserInfo } from "../../../_shared/services/userInfo.service";
import { AdvisorService } from "../../../admin/services/advisor.service";
import { PremiumBuyerService } from "../../services/premium-buyer.service";
import { BP_PROFILE_STATUS, BUYERSTATUS, MONTH } from "../../../_shared/constants/global.constant";

@Component({
  selector: 'app-premium-buyer-list',
  templateUrl: './premium-buyer-list.component.html',
  styleUrls: ['./premium-buyer-list.component.scss'],
  providers: [AdvisorService]
})
export class PremiumBuyerListComponent implements OnInit {

  @ViewChild("gridContainer")
  gridContainer: DxDataGridComponent;
  //public bsModalRef : BsModalRef;
  public showHeaderFilter: boolean = true;
  public advisorProfile: any = [];
  public advisorProfileDetails: any = [];
  public param: any;
  public repItemStorage: any = [];
  public totalCount: number;
  public totalActiveCount: number;
  public showAdvisorSubsriptionForm: boolean = false;
  public editFormData: any;
  public customFilterData: any = {};
  public filterData: any;
  public CurrentViewIdentifier: any;
  public dataSource: any = {};
  public currentUser: any;

  public advisorDetailList: any = [];
  public masterAdvsiorDetail: any = [];
  public splitAdvsiorDetail: any = [];
  public searchText: any = "";
  public checkedAdvisors: any = [];
  public unCheckedAdvisors: any = [];
  public disableCwAccessButton: boolean = false;
  vcfoArr: any;
  public selectedMasterdet: any;
  public actionReq: boolean = false;
    public filterValues= BP_PROFILE_STATUS;
  // manage deal variables
  public matchingDeals: any;
  //public repItemStorage: any =[];
  public fromDate: any = [];
  public toDate: any = [];
  //dataSource: any = {};

  public pagingInfo: string = "";
  public pageNumbered: number;
    public buyerStatus= BUYERSTATUS;
  public filterValue = ["ACT", "NST"];

  public filterResponse = [{id:"Active", value:"ACT"}, {id:"Terminated", value:"TER"}, {id:"Not Started", value:"NST"}];

  public buyerStatusObj = [
    "Active",
    "Not Started",
    "Terminated"
  ]
    public months = MONTH;
   
  constructor(
      private service: PremiumBuyerService,
      private communicationService: CommunicationService,
      private router: Router,
      //private service: service,
      private userInfo: UserInfo
  ) {}
    
  ngOnInit() {
      this.totalCount = 0;
      this.totalActiveCount = 0;
      this.filterData = { primaryMasterRepID: "", buyerProfileStatus: "" };
      this.currentUser = this.userInfo._currentUserFn();
      
      (this.CurrentViewIdentifier = 0),
          //this.loadGridData();
          
          this.customFilterData = {
          buyerProfileStatus: { value: ["ACT", "NST"] }}
      console.log("from initiate", this.customFilterData)
        this.initializeGrid();
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
                    let param = {
                        viewId: _self.CurrentViewIdentifier,
                        columnName: obj,
                        username: _self.currentUser.userName,
                    };
                    
                    
                    _self.service
                        .getFilterValues(param)
                        .subscribe((rsp) => {
                           
                            if (rsp["status"] == "success") {

                                if(obj == "buyerProfileStatus"){
                                    _self.communicationService.setBuyerProfileStatusFlag(true);
                                }
                                else{
                                    _self.communicationService.setBuyerProfileStatusFlag(false); 
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

editDeal(advDet, dealDet) {
    //console.log(advDet, dealDet);
    this.router.navigate(["/admin/create-deal/" + dealDet.dealId]);
}

calculateFilterExpressionRep(filterValue, selectedFilterOperation) {
    return ["primaryMasterRepID", filterValue];
}
    calculateFilterExpressionActive(filterValue, selectedFilterOperation) {
        console.log('filterValue', filterValue)
        console.log('selectedFilterOperation', selectedFilterOperation)
    return ["buyerProfileStatus", filterValue];

}

onValueChange(event, dateType, i) {
    let format = "MMM d, yyyy";
}

searchAdvisor() {
    this.gridContainer.instance.refresh();
}

searchOnEnter(e) {
    if (e.keyCode == 13) {
        if (this.searchText) this.searchAdvisor();
    }
    if (e.keyCode == 8 || e.keyCode == 46) {
        if (this.searchText.length == 1) this.searchAdvisor();
    }
}


initializeGrid() {
    this.headerFilterData();
    this.dataSource.store = new CustomStore({
        key: "buyerProfileID",
        load: (loadOptions: any) => {
            let param = this.generateParameter(loadOptions);
            console.log('param',param)
          
            return new Promise((resolve) => {
                this.service.getPremiumBuyer(param).subscribe((result) => {
                    //var result = this.service.getFilterValues(param);
                    //var result=this.service.getPremiumBuyer(param);
                   
                    console.log(result);
                    if (result["status"] == "success") {
                        //var result = this.service.getMatchingDealsData("");
                        let data = result["data"];
                        this.totalCount = result["data"].totalCount;
                        
                        this.matchingDeals =
                            result["data"].buyerList;
                        this.totalActiveCount=0;
                        data.buyerList.forEach((item: any) => {
                            item.showFilter = false;
                           if(item.buyerProfileStatusCd=='ACT'){
                            this.totalActiveCount++;
                           }


                        });
                        resolve({
                            data: data["buyerList"],
                            totalCount: data["totalCount"],
                           // totalActiveCount: data["totalActiveCount"],
                        });
                    } else {
                        console.log("error");
                    }
                });
            });
        },
    });
}
generateParameter(loadOptions) {
    let orderByColumns = [
        
    ];
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
        CurrentViewIdentifier: 1,
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
   // console.log('loadOptions',loadOptions);
    //console.log('this.customFilterData_first', this.customFilterData);
   // this.customFilterData = {};
   
   
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
                console.log(loadOptions.filter)
                this.createCustomFilter(loadOptions.filter);
            }
        }
    }
    else {

        this.communicationService.getBuyerProfileStatusFlag().subscribe(status => {
            if(status == true){
                //console.log("in true")
                this.customFilterData = {
                buyerProfileStatus: { value: ["ACT", "NST", "TER"] }}
                var filter = [];
                filter[0]="buyerProfileStatus";
                filter[1]=this.customFilterData.buyerProfileStatus.value;
                filter["columnIndex"]=5;
                filter["value"]=this.customFilterData.buyerProfileStatus.value;
                loadOptions.filter = filter;
                this.createCustomFilter(loadOptions.filter);
            }
            else{
                //console.log("in false")
                this.customFilterData = {
                    buyerProfileStatus: { value: ["ACT", "NST"] }}
                var filter = [];
                filter[0]="buyerProfileStatus";
                filter[1]=this.customFilterData.buyerProfileStatus.value;
                filter["columnIndex"]=5;
                filter["value"]=this.customFilterData.buyerProfileStatus.value;
                loadOptions.filter = filter;
                this.createCustomFilter(loadOptions.filter);
            }
        })

        

    }

    let GridDataFilter = {
        ColumnFilterList: [],
    };
    console.log('this.customFilterData',this.customFilterData);
    for (let i in this.customFilterData) {
        GridDataFilter.ColumnFilterList.push({
            Name: i,
            ValueFilter: this.customFilterData[i].value,
        });
    }
    this.customFilterData = {};
    //this.communicationService.setBuyerProfileStatusFlag(false);
    return GridDataFilter;
}

createCustomFilter(f) {
    //console.log(f)
    if(f[0] == '!'){
        f = f[1];       
        
        if(f.length < 3){
            let multiFilter = [];
            this.filterResponse.forEach(element => {
                if(element.value != f[1]){
                    multiFilter.push(element.value)
                }
            });
            f[1] = multiFilter;
            f["filterValue"] = multiFilter;
        }
        else{
            let correctFilter;
            let unselected = this.filterResponse.filter(element => element.value != f[0][1] && element.value != f[2][1]);
            console.log(unselected);
            correctFilter = unselected[0].value;
            f=[];
            f[0]="buyerProfileStatus";
            f[1]=correctFilter;
            f["columnIndex"]=5;
            f["filterValue"] = correctFilter;
        }
        
    }
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
calculateFilterExpression(value, selectedFilterOperations, target) {
    let column = this as any;
    if (target === "headerFilter" && value === "weekends") {
        return [[this.getTasks, "=", 0], "or", [this.getTasks, "=", 6]];
    }
    return column.defaultCalculateFilterExpression.apply(this, arguments);
}

orderHeaderFilter(data) {
    data.dataSource.postProcess = (results) => {
        results.push({
            text: "Weekends",
            value: "weekends",
        });
        return results;
    };
}

getTasks(key) {
    //console.log("key", key);
    let item = this.repItemStorage.find((i) => i.key === key);
    //console.log(item);
    //console.log(this.matchingDeals);
    if (!item) {
        var tasksDet = this.matchingDeals.filter(
            (item) => item.dealId == key
        );
        item = {
            key: key,
            dataSourceInstance: new DataSource({
                store: new ArrayStore({
                    data: tasksDet[0].advisors,
                    key: "advKey",
                }),
                filter: ["advKey", "=", key],
            }),
        };

        this.repItemStorage.push(item);
    }
    //console.log(item.dataSourceInstance);
    return item.dataSourceInstance;
}

goToEditProfile(profileID) {
    //this.communicationService.setEditDealFrom("admin");
    this.router.navigate(["/premium-buyer/premium-buyer-page/create-profile/" + profileID]);
}

    changedValuation(event, buyerObj) {
        console.log('buyerObj', buyerObj);
        let formatDate;
        if (typeof (event.value) == 'object') {
            var format = event.value.toString().split(" ");
            formatDate = format[3] + '-' + this.months[format[1]] + '-' + format[2] + 'T' + format[4];

        }
        else {
            formatDate = event.value
        }
        var param = {
            username: this.currentUser.userName,
            buyerProfileID: buyerObj.buyerProfileID,
            lastValuationDate: formatDate,
            buyerProfileStatusCd: buyerObj.buyerProfileStatusCd
           // advisors: buyerObj.advisors,
           // statusChange: 0
        }
        this.service.inlineUpdateBuyerProfile(param).subscribe(rsp => {
            if (rsp["status"] == "success") {
                this.gridContainer.instance.refresh();
            }
        });
        

}

    changedStatus(event, buyerObj) {
        
        var statusChanged=0
        console.log('buyerObj.advisors', buyerObj.advisors);
        if (this.buyerStatus[event.value] === 'ACT' && (buyerObj.buyerProfileStatusCd === 'NST' || buyerObj.buyerProfileStatusCd === 'TER')) {
            statusChanged = 2;
        }
        else if ((this.buyerStatus[event.value] === 'NST' || this.buyerStatus[event.value] === 'TER') && (buyerObj.buyerProfileStatusCd === 'ACT')) {
            statusChanged = 1;
        }
        console.log('statusChanged', statusChanged);
        var param = {
            username: this.currentUser.userName,
            buyerProfileID: buyerObj.buyerProfileID,
            lastValuationDate: buyerObj.lastValuationDate,
            buyerProfileStatusCd: this.buyerStatus[event.value],
            advisors: buyerObj.advisors,
            statusChange: statusChanged
        }
        this.service.inlineUpdateBuyerProfile(param).subscribe(rsp => {
            if (rsp["status"] == "success") {
                this.gridContainer.instance.refresh();
            }
        });
}


}
