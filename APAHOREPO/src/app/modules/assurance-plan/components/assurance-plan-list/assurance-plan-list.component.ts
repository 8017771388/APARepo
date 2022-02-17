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
import { AssurancePlanService } from "../../services/assurance-plan.service";

@Component({
    selector: "app-assurance-plan-list",
    templateUrl: "./assurance-plan-list.component.html",
    styleUrls: ["./assurance-plan-list.component.scss"],
    providers: [AdvisorService],
})
export class AssurancePlanListComponent implements OnInit {
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

    // manage deal variables
    public matchingDeals: any;
    //public repItemStorage: any =[];
    public fromDate: any = [];
    public toDate: any = [];
    //dataSource: any = {};

    public pagingInfo: string = "";
    public pageNumbered: number;

    public filterResponse = [{id:"Active", value:"Active"}, {id:"Terminated", value:"Terminated"}];

    constructor(
        private service: AssurancePlanService,
        private communicationService: CommunicationService,
        private router: Router,
        //private service: service,
        private userInfo: UserInfo
    ) {}

    ngOnInit() {
        this.totalCount = 0;
        this.totalActiveCount = 0;
        this.filterData = { repid: "", profilestatus: "" };
        this.currentUser = this.userInfo._currentUserFn();
        
        (this.CurrentViewIdentifier = 0),
            //this.loadGridData();       
        
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
        return ["repID", filterValue];
    }
    calculateFilterExpressionActive(filterValue, selectedFilterOperation) {
        return ["profileStatus", filterValue];
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
            key: "profileID",
            load: (loadOptions: any) => {
                let param = this.generateParameter(loadOptions);
                return new Promise((resolve) => {
                    this.service.getPlanList(param).subscribe((result) => {
                        //var result = this.service.getFilterValues(param);
                        console.log(result);
                        if (result["status"] == "success") {
                            //var result = this.service.getMatchingDealsData("");
                            let data = result["data"];
                            this.totalCount = result["data"].totalCount;
                            this.totalActiveCount =
                                result["data"].totalActiveCount;
                            this.matchingDeals =
                                result["data"].advisorProfileList;
                            data.advisorProfileList.forEach((item: any) => {
                                item.showFilter = false;
                            });
                            resolve({
                                data: data["advisorProfileList"],
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
            PageSize: 17,
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
            this.pagingInfo = "1-17";
        } else if (pgNumber > 1) {
            let firstIndex = 17 * (pgNumber - 1) + 1;
            let lastIndex = 17 * pgNumber;

            if (lastIndex > this.totalCount) {
                lastIndex = this.totalCount;
            }

            this.pagingInfo =
                firstIndex.toString() + "-" + lastIndex.toString();
        }
    }

    transformFilterData(loadOptions) {
        console.log(loadOptions);
        this.customFilterData = {};
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
        return GridDataFilter;
    }

    createCustomFilter(f) {
        //console.log(f)
        if(f[0] == '!'){
            f = f[1];
            let correctFilter;
            this.filterResponse.forEach(element => {
                if(element.value != f[1]){
                    correctFilter = element.value
                }
            });
            f[1] = correctFilter;
            f["filterValue"] = correctFilter;
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
        this.router.navigate(["/assurance-plan/create-profile/" + profileID]);
    }
}
