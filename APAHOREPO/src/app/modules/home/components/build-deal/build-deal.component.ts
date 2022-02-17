import { Component, OnInit } from "@angular/core";
import { CorePlanService } from "../../services/core-plan.service";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
//import { AddNewGoalComponent } from '../../../_shared/components/add-new-goal/add-new-goal.component';
import { UserInfo } from "../../../_shared/services/userInfo.service";
import { Router, ActivatedRoute } from "@angular/router";
// import { AddTaskComponent } from "../../../_shared/components/add-task/add-task.component";
// import { AngularWaitBarrier } from "blocking-proxy/built/lib/angular_wait_barrier";
import { CommunicationService } from "../../../_shared/services/communication.services";
import { HomeService } from "../../services/home.service";
import { ViewDealService } from "../../services/view-deal.service";
import { DatePipe } from "@angular/common";
import {
    TASKOWNER,
    TASKCATEGORY,
    TASKACTION,
} from "../../../_shared/constants/global.constant";
import { AddMasterTasksComponent } from "../../../master-library/components/add-master-tasks/add-master-tasks.component";
import { DirtyComponent } from '../../../_shared/models/dirty-component';
declare var jQuery: any;

@Component({
    selector: "app-build-deal",
    templateUrl: "./build-deal.component.html",
    styleUrls: ["./build-deal.component.scss"],
    providers: [DatePipe],
})
export class BuildDealComponent implements OnInit, DirtyComponent {
    private planRequest: any = {
        repId: null,
        username: null,
        task: [],
    };

    isCollapsed = false;
    public stagesList: any = null;
    public coppiedStagesList: any = null;
    public tempArrayToStoreTask: any = [];
    public bsModalRef: BsModalRef;
    public currentUser: any;
    public incrementalId: number = 0;
    public dealID: string;
    public dealTypeID: string;
    public cfoName: string;
    public cfoUserName: string;
    goalObj: any;
    taskObj: any;
    coppiedData: any = null;
    searchTxt: string = null;
    saveBtnEnabled: boolean = false;
    public userType: any;
    public dealResponse: any = [];
    public dealInfo: any = [];
    public requestData: any;
    public showTasks: boolean = false;
    public allDates: any = [];
    public currentDate = new Date();
    public minDate: Date;
    public taskOwner: any = TASKOWNER;
    public taskCategory: any = TASKCATEGORY;
    public taskAction: any = TASKACTION;
    public coppiedTasks: any = [];
    public searchOn: boolean = false;
    public isDirty : boolean = false;

    constructor(
        private corePlanService: CorePlanService,
        private modalService: BsModalService,
        private userInfo: UserInfo,
        private route: ActivatedRoute,
        private router: Router,
        private communicationService: CommunicationService,
        private homeService: HomeService,
        private viewDealService: ViewDealService,
        public datePipe: DatePipe
    ) {
        this.minDate = new Date();
        this.minDate.setDate(this.currentDate.getDate() + 1);
    }

    ngOnInit() {
        //this.communicationService.setIsDirty(true);
        this.communicationService.clearIsDirty();
        this.communicationService.setIsDirty(true);
        this.communicationService.displayLoader(true);
        this.currentUser = this.userInfo._currentUserFn();
        this.dealID = this.route.snapshot.paramMap.get("dealID");
        this.dealTypeID = this.route.snapshot.paramMap.get("dealTypeID");
        this.communicationService
            .getAccessType()
            .subscribe((userType) => (this.userType = userType));
        this.getDealStagesList(this.dealID, this.dealTypeID);

        //(function ($) {
        //    $(document).ready(function(){
        //        $("input[type='text']").keypress(function(){
        //            console.log(this.isDirty);
        //            this.isDirty = true;
        //        });
        //    });
        //  })(jQuery);
    }

    onModelChange(modal: any) {
        this.communicationService.setIsDirty(true);
    }

    canDeactivate() {
        var isDirtyDup = false;
        this.communicationService.getIsDirty().subscribe((dirty) => {
            isDirtyDup = dirty;
        });
        return isDirtyDup;
    }

    getDealStagesList(dealID, dealTypeID) {
        let param = { dealID: dealID, dealTypeID: dealTypeID };
        //this.stagesList = this.homeService.getStagesList(param);
        this.homeService.getStagesList(param).subscribe(
            (result) => {
                this.stagesList = result;
                this.dealInfo = this.stagesList.data.dealInfo;
                this.stagesList.data.masterlibrary.forEach((stage, i) => {
                    stage.isCollapsed = false;
                    stage.switch = false;
                    if (stage.tasks.length > 0) {
                        stage.tasks.forEach((task) => {
                            this.coppiedTasks.push(task);
                            task.checked = true;
                            task.taskDueDate = null;
                        });
                    }
                    this.tempArrayToStoreTask.push(stage);
                });
                this.coppiedData = JSON.parse(JSON.stringify(this.stagesList));
                this.communicationService.clearLoader();
            },
            (err) => {
                this.communicationService.clearLoader();
            }
        );
    }

    onValueChange(event, task) {
        let format = "MMM d, yyyy";
        task.dueDate = this.datePipe.transform(event, format);
    }

    addGoaltoTemp(event, stage, task) {
        if (event.target.checked) {
            task.checked = true;
            this.saveBtnEnabled = true;
            if (!stage.switch) {
                stage.isCollapsed = true;
                stage.switch = true;
            }
            var tempArr = this.tempArrayToStoreTask.filter(
                (val) => val.stageID == stage.stageID
            );
            if (tempArr.length == 0) this.tempArrayToStoreTask.push(stage);
        } else {
            task.checked = false;
            this.saveBtnEnabled = false;
            if (this.tempArrayToStoreTask.length > 0) {
                this.tempArrayToStoreTask.forEach((element, index) => {
                    if (element.stageID == stage.stageID) {
                        var tempFlag = false;
                        element.tasks.forEach((val) => {
                            if (val.checked) tempFlag = true;
                        });
                        if (!tempFlag) {
                            this.tempArrayToStoreTask.splice(index, 1);
                        }
                    }
                });
            }
        }
        if (this.tempArrayToStoreTask.length > 0) {
            this.saveBtnEnabled = true;
        } else {
            this.saveBtnEnabled = false;
        }
    }

    addTask(stage) {
        this.coppiedTasks = [];
        this.stagesList.data.masterlibrary.forEach((stage, i) => {
            if (stage.tasks.length > 0) {
                stage.tasks.forEach((task) => {
                    this.coppiedTasks.push(task);
                });
            }
        });

        let initialState = {
            currentUser: this.currentUser,
            stageID: stage.stageID,
            title: "Add Task",
            taskList: this.coppiedTasks,
            openFrom: "buildDeal",
        };

        this.bsModalRef = this.modalService.show(AddMasterTasksComponent, {
            initialState,
            backdrop: "static",
            class: "modal-lg",
        });
        this.bsModalRef.content.closeBtnName = "Close";
        this.bsModalRef.content.mstrLibTaskSaved.subscribe((value) => {
            if (value) {
                if (value.taskJson.taskInfo.taskOwnerCd) {
                    value.taskJson.taskInfo.taskOwner = this.taskOwner.filter(
                        (val) => val.code == value.taskJson.taskInfo.taskOwnerCd
                    )[0].name;
                }
                if (value.taskJson.taskInfo.taskCategoryCd) {
                    value.taskJson.taskInfo.taskCategory = this.taskCategory.filter(
                        (val) =>
                            val.code == value.taskJson.taskInfo.taskCategoryCd
                    )[0].name;
                }
                if (value.taskJson.taskInfo.taskActionCd) {
                    value.taskJson.taskInfo.taskAction = this.taskAction.filter(
                        (val) =>
                            val.code == value.taskJson.taskInfo.taskActionCd
                    )[0].name;
                }
                value.taskJson.taskInfo.checked = true;
                stage.tasks.push(value.taskJson.taskInfo);
                this.coppiedData.data.masterlibrary.forEach((cpstage, i) => {
                    if (cpstage.stageID == stage.stageID)
                        cpstage.tasks.push(value.taskJson.taskInfo);
                });
                this.saveBtnEnabled = true;
                if (!stage.switch) {
                    stage.isCollapsed = true;
                    stage.switch = true;
                }
                var tempArr = this.tempArrayToStoreTask.filter(
                    (val) => val.stageID == stage.stageID
                );
                if (tempArr.length == 0) this.tempArrayToStoreTask.push(stage);
            }
        });
    }

    editTask(stage, task, i) {
        console.log(task.task.toLowerCase());
        this.coppiedTasks = [];
        this.stagesList.data.masterlibrary.forEach((stage, i) => {
            if (stage.tasks.length > 0) {
                stage.tasks.forEach((taskCp: any) => {
                    console.log(
                        taskCp.task.toLowerCase() != task.task.toLowerCase()
                    );
                    if (taskCp.task.toLowerCase() != task.task.toLowerCase())
                        this.coppiedTasks.push(taskCp);
                });
            }
        });
        console.log(this.coppiedTasks);
        let initialState = {
            currentUser: this.currentUser,
            stageID: stage.stageID,
            title: "Edit Task",
            taskList: this.coppiedTasks,
            openFrom: "buildDeal",
            taskInfo: task,
        };

        this.bsModalRef = this.modalService.show(AddMasterTasksComponent, {
            initialState,
            backdrop: "static",
            class: "modal-lg",
        });
        this.bsModalRef.content.closeBtnName = "Close";
        this.bsModalRef.content.mstrLibTaskSaved.subscribe((value) => {
            if (value) {
                value.taskJson.taskInfo.checked = task.checked;
                stage.tasks[i] = value.taskJson.taskInfo;
                this.coppiedData.data.masterlibrary.forEach((cpstage, i) => {
                    if (cpstage.tasks.length > 0) {
                        if (cpstage.stageID == stage.stageID)
                            cpstage.tasks[i] = value.taskJson.taskInfo;
                    }
                });
            }
        });
    }

    savePlan() {
        this.communicationService.clearIsDirty();
        var reqObj = JSON.parse(JSON.stringify(this.stagesList.data));
        reqObj.username = this.currentUser.userName;
        reqObj.masterlibrary.forEach((stage, index) => {
            let tasks = stage.tasks.filter((task) => task.checked);
            stage.tasks = tasks;
        });
        console.log(reqObj);
        this.homeService.saveDealPlan(reqObj).subscribe(
            (result: any) => {
                console.log(result);
                this.router.navigate([
                    "/home/view-deals-new/",
                    this.dealID,
                    this.dealTypeID,
                ]);
                // if(result.status.toLowerCase() == 'success')
                //     this.router.navigate(["/home"]);
            },
            (err) => {}
        );
    }

    deleteTask(stage, task) {
        stage.tasks.forEach((val, i) => {
            if (val.actionPlanDetailId == task.actionPlanDetailId)
                stage.tasks.splice(i, 1);
        });
    }

    cancel() {
        this.router.navigate(["/home"]);
    }

    switchAccordian(stage) {
        if (!stage.switch) stage.isCollapsed = true;
        else {
            stage.isCollapsed = false;
            //console.log(this.tempArrayToStoreTask);
            if (this.tempArrayToStoreTask.length > 0) {
                this.tempArrayToStoreTask.forEach((element, index) => {
                    if (element.stageid == stage.stageid) {
                        var tempFlag = false;
                        element.tasks.forEach((val, i) => {
                            if (val.checked) {
                                tempFlag = true;
                                stage.tasks[i].checked = false;
                            }
                        });
                        ////console.log(tempFlag);
                        if (tempFlag) {
                            this.tempArrayToStoreTask.splice(index, 1);
                            //stage.switch = false;
                        }
                    }
                });
            }
        }
        //console.log(this.tempArrayToStoreTask);
        if (this.tempArrayToStoreTask.length > 0) {
            this.saveBtnEnabled = true;
        } else {
            this.saveBtnEnabled = false;
        }
    }

    searchStagesAndTasks(e: any) {
        if (!this.coppiedData)
            this.coppiedData = JSON.parse(JSON.stringify(this.stagesList));
        var newArray = [];
        if (this.searchTxt) {
            this.searchOn = true;
            if (
                this.stagesList.data.masterlibrary.length <
                this.coppiedData.data.masterlibrary.length
            )
                this.stagesList = JSON.parse(JSON.stringify(this.coppiedData));
            this.stagesList.data.masterlibrary.forEach((stage, i) => {
                stage.isCollapsed = false;
                var newTask = [];
                var stageFound = false;
                stage.tasks.forEach((task) => {
                    if (
                        task.task
                            .toLowerCase()
                            .indexOf(this.searchTxt.toLowerCase()) >= 0
                    ) {
                        stage.isCollapsed = true;
                        newTask.push(task);
                    }
                });

                if (
                    stage.stage
                        .toLowerCase()
                        .indexOf(this.searchTxt.toLowerCase()) >= 0
                ) {
                    newArray.push(stage);
                    stageFound = true;
                }

                if (newTask.length > 0) {
                    if (!newArray[i]) {
                        stage.tasks = newTask;
                        if (!stageFound) newArray.push(stage);
                    } else {
                        newArray[i].tasks = newTask;
                    }
                }

                stageFound = false;
            });
            this.stagesList.data.masterlibrary = newArray;
            //console.log(this.stagesList.data.masterlibrary);
        } else {
            this.stagesList.data = this.coppiedData.data;
            this.stagesList.data.masterlibrary.forEach((element) => {
                element.isCollapsed = false;
            });
            ////console.log(this.stagesList.data);
            this.coppiedData = null;
            this.searchOn = false;
        }
        ////console.log(this.coppiedData);
        //this.coppiedData = ;
    }
}
