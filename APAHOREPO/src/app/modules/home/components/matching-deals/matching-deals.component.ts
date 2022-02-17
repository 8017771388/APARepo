import { Component, OnInit, ViewChild } from "@angular/core";
import { HomeService } from "../../services/home.service";
import DataSource from "devextreme/data/data_source";
import ArrayStore from "devextreme/data/array_store";
import CustomStore from "devextreme/data/custom_store";
import { UserInfo } from "../../../_shared/services/userInfo.service";
import { DxDataGridComponent } from "devextreme-angular";
import { CommunicationService } from "../../../_shared/services/communication.services";
import { Router } from "@angular/router";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { NotificationComponent } from '../../../_shared/components/notification/notification.component';

@Component({
    selector: "app-matching-deals",
    templateUrl: "./matching-deals.component.html",
    styleUrls: ["./matching-deals.component.scss"],
})
export class MatchingDealsComponent implements OnInit {
    constructor(
        private homeService: HomeService,
        private userInfo: UserInfo,
        private cs: CommunicationService,
        private router: Router,
        private modalService: BsModalService
    ) {}

    @ViewChild("gridContainer")
    gridContainer: DxDataGridComponent;

    public bsModalRef: BsModalRef;
    public matchingDeals: any;
    public repItemStorage: any = [];
    public fromDate: any = [];
    public toDate: any = [];
    dataSource: any = {};
    public filterData: any = {};
    public CurrentViewIdentifier: any;
    public currentUser: any;
    public searchText: any = "";
    public showHeaderFilter: boolean = true;
    public customFilterData: any = {};
    public totalCount: any;
    public pagingInfo: string = "";
    public pageNumbered: number;
    public allNotifications: any;
    public newNotifications: any;
    public notificationCount : any;
    public showNotification : boolean = true;

    ngOnInit() {
        //this.totalCount = 0;
        this.filterData = { dealSpecialist: "", stage: "" };
        (this.CurrentViewIdentifier = 1),
            (this.currentUser = this.userInfo._currentUserFn());
        this.initializeGrid();
        // this.getNotification();
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
            key: "dealID",
            load: (loadOptions: any) => {
                let param = this.generateParameter(loadOptions);
                return new Promise((resolve) => {
                    this.homeService.getDealList(param).subscribe((result) => {
                        if (result["status"] == "success") {
                            this.matchingDeals = result["data"].dealList;
                            this.totalCount = result["data"].totalCount;
                            let data = result["data"];
                            console.log(data);
                            data.dealList.forEach((item: any) => {
                                item.showFilter = false;
                            });
                            resolve({
                                data: data["dealList"],
                                totalCount: data["totalCount"],
                            });
                        } else {
                            console.log(result);
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
                        let param = {
                            viewId: _self.CurrentViewIdentifier,
                            columnName: obj,
                            username: _self.currentUser.userName,
                        };

                        _self.homeService
                            .getFilterValues(param)
                            .subscribe((rsp) => {
                                if ((rsp["status"] = "success")) {
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
                                    });
                                } else {
                                    console.log(rsp);
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
            CurrentViewIdentifier: this.CurrentViewIdentifier,
            CurrentPageNumber: this.getPageNumber(loadOptions),
            PageSize: 14,
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
            this.pagingInfo = "1-14";
        } else if (pgNumber > 1) {
            let firstIndex = 14 * (pgNumber - 1) + 1;
            let lastIndex = 14 * pgNumber;

            if (lastIndex > this.totalCount) {
                lastIndex = this.totalCount;
            }

            this.pagingInfo =
                firstIndex.toString() + "-" + lastIndex.toString();
        }
    }

    createCustomFilter(f) {
        if (f != "or" && f != "and") {
            //let val = f[1];
            let val = f["filterValue"];
            let col = f[0];
            if (val && col && f.columnIndex >= 0) {
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
        }
    }

    transformFilterData(loadOptions) {
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
        for (let i in this.customFilterData) {
            GridDataFilter.ColumnFilterList.push({
                Name: i,
                ValueFilter: this.customFilterData[i].value,
            });
        }
        return GridDataFilter;
    }

    calculateFilterExpression(value, selectedFilterOperations, target) {
        let column = this as any;
        if (target === "headerFilter" && value === "weekends") {
            return [[this.getTasks, "=", 0], "or", [this.getTasks, "=", 6]];
        }
        return column.defaultCalculateFilterExpression.apply(this, arguments);
    }

    calculateFilterExpressionDS(filterValue, selectedFilterOperation) {
        return ["dealSpecialist", filterValue];
    }

    calculateFilterExpressionS(filterValue, selectedFilterOperation) {
        return ["stage", filterValue];
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
        console.log("key", key);
        let item = this.repItemStorage.find((i) => i.key === key);
        if (!item) {
            var tasksDet = this.matchingDeals.filter(
                (item) => item.dealId == key
            );
            item = {
                key: key,
                dataSourceInstance: new DataSource({
                    store: new ArrayStore({
                        data: tasksDet[0].tasks,
                        key: "taskKey",
                    }),
                    filter: ["taskKey", "=", key],
                }),
            };

            this.repItemStorage.push(item);
        }
        return item.dataSourceInstance;
    }

    onValueChange(event, dateType, i) {
        let format = "MMM d, yyyy";
        //console.log(event, dateType, i);
        //console.log(this.showFilter);
        // if(dateType === 'duedate'){
        //   this.tasks.dueDate = this.datePipe.transform(event, format);
        //   this.maxDate = new Date(this.tasks.dueDate);
        //   this.maxDate.setDate(this.maxDate.getDate() - 1);
        // }
        // else{
        //   ////console.log(event);
        //   if(event == 'Invalid Date')
        //     event = '';
        //   this.tasks.internalDueDate = this.datePipe.transform(event, format);
        // }
    }

    goToEditDeal(dealID) {
        this.cs.setEditDealFrom("matchingDeal");
        this.router.navigate(["/admin/create-deal/" + dealID]);
    }

    // getNotification(){
        
    //     this.homeService.getAllNotifications(this.currentUser.userName).subscribe(res => {
    //         if(res){               
    //             this.allNotifications = JSON.parse(JSON.stringify(res["data"].dealList));
    //             this.notificationCount = this.allNotifications.filter(element => element.dealInfo.notification.readFlag=='U').length;
    //             this.showNotification = true;
    //         }
    //     }, (err) => {

    //     })
        
    // }

    // openNotification(){
    //     this.showNotification = false;
    //     let initialState = {
    //         //currentUser : this.currentUser,
    //         //taskData: stage,
    //         title: "Notifications",
    //         openFrom: "view-deal",
    //         //userType: this.userType,
    //     };

    //     this.bsModalRef = this.modalService.show(NotificationComponent, {
    //         initialState,
    //         backdrop: "static",
    //         class: "modal-lg",
    //     });
    //     this.bsModalRef.content.closeBtnName = "Close";
    //     this.bsModalRef.content.notificationClosed.subscribe((value) => {
    //         if(value){
    //             this.getNotification();
    //         }
    //     }); 
        
    //   }
}
