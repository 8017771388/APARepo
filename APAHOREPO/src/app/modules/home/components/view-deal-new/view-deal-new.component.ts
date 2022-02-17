import {
    Component,
    OnInit,
    ChangeDetectorRef,
    ViewChild,
    ElementRef,
} from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { Observable } from "rxjs";
import { TypeaheadMatch } from "ngx-bootstrap/typeahead";
import {
    GOAL_STATUS,
    TASK_STATUS,
    TASKACTION,
    TASKCATEGORY,
    TASKOWNER,
    TASKSTATUS,
} from "../../../_shared/constants/global.constant";
import { AddTaskComponent } from "../../../_shared/components/add-task/add-task.component";
import { ViewDealService } from "../../services/view-deal.service";
import { CommunicationService } from "../../../_shared/services/communication.services";
import { ConfirmModalComponent } from "../../../_shared/components/confirm-modal/confirm-modal.component";
import { AddNoteComponent } from "../../../_shared/components/add-note/add-note.component";
import { CompletedTasksComponent } from "../../../_shared/components/completed-tasks/completed-tasks.component";
import { ReassignTaskComponent } from "../../../_shared/components/reassign-task/reassign-task.component";
import { DatePipe } from "@angular/common";
import { UserInfo } from "../../../_shared/services/userInfo.service";
import { Router, ActivatedRoute } from "@angular/router";
import { HomeService } from "../../services/home.service";
import { AddMasterTasksComponent } from "../../../master-library/components/add-master-tasks/add-master-tasks.component";
import * as moment from "moment";
import { DxDataGridComponent } from "devextreme-angular";

@Component({
    selector: "app-view-deal-new",
    templateUrl: "./view-deal-new.component.html",
    styleUrls: ["./view-deal-new.component.scss"],
    providers: [DatePipe],
})
export class ViewDealNewComponent implements OnInit {
    @ViewChild("completedTaskGrid") myScrollContainer: ElementRef;
    @ViewChild("gridContainer")
    gridContainer: DxDataGridComponent;

    public taskConstant = TASK_STATUS;
    public bsModalRef: BsModalRef;
    public dealResponse: any = [];
    public dealStages: any = [];
    public dealInfo: any = [];
    public dealTasks: any = [];
    public dealCompletedTasks: any = [];
    public currentUser: any;
    public requestData: any;
    public goalStatus: string = "";
    public showTasks: boolean = true;
    public repId: string;
    public advisorName: string;
    public expandedRow: number = -1;
    public advisor: any;
    public allAdvisors: any;
    public dataSource: Observable<any>;
    public noResult: boolean = false;
    public visibleTask: boolean = false;
    public userType: any;
    addGoalObj: any;
    public sortOrderASC: boolean = true;
    public completedTasks: any = [];
    public dealID: string;
    public dealTypeID: any;
    public dealStage: string;
    public coppiedTasks: any = [];
    public activeStage: any = {};
    public showHeaderFilter: boolean = true;
    public minDate: Date;
    public taskOwner: any = TASKOWNER;
    public taskCategory: any = TASKCATEGORY;
    public taskAction: any = TASKACTION;
    public taskStatus: any = TASKSTATUS;
    public percCompletionPerStage: any;
    public notificationDetails : any;

    //public editDate: any;

    constructor(
        private modalService: BsModalService,
        private viewDealService: ViewDealService,
        private communicationService: CommunicationService,
        private changeDetector: ChangeDetectorRef,
        public datePipe: DatePipe,
        private userInfo: UserInfo,
        private route: ActivatedRoute,
        private router: Router,
        private homeService: HomeService
    ) {
        this.minDate = new Date();
        //this.minDate.setDate(this.minDate.getDate() + 1);
    }

    scrollTo(el: HTMLElement) {
        setTimeout(() => {
            this.myScrollContainer.nativeElement.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }, 100);
    }

    ngOnInit() {
        this.communicationService.displayLoader(true);
        this.communicationService.showNotiIcon(true);
        this.currentUser = this.userInfo._currentUserFn();
        this.dealID = this.route.snapshot.paramMap.get("dealID");
        //this.dealTypeID = this.route.snapshot.paramMap.get("dealTypeID");
        this.dealTypeID = 0;
        this.communicationService
            .getAccessType()
            .subscribe((userType) => (this.userType = userType));
        this.getDeal(this.dealID, this.dealTypeID);

        this.communicationService.getNotificationDeal().subscribe(notificationDet => {
            this.notificationDetails = notificationDet;            
       
        if(this.notificationDetails != null){
            this.addNotes(this.notificationDetails.dealDet, this.notificationDetails.taskDet);
        }
        })
    }

    saveTask(params) {
        ////console.log(params);
        this.communicationService.displayLoader(true);
        this.homeService.saveDealTask(params).subscribe(
            (rsp: any) => {
                //console.log(rsp);
                if (rsp.status.toLowerCase() == "success") {
                    //this.communicationService.clearLoader();
                    this.getDeal(this.dealID, this.dealTypeID);
                    this.bsModalRef.hide();
                }
            },
            (err) => {
                //console.log(err);
                this.communicationService.clearLoader();
            }
        );
    }

    getDeal(dealID, dealTypeID) {
        let param = { dealID: dealID, dealTypeID: dealTypeID };

        this.homeService.getStagesList(param).subscribe(
            (result) => {
                this.dealResponse = result["data"];
                this.dealInfo = this.dealResponse.dealInfo;
                this.dealStage = this.dealInfo.dealStage;
                this.dealStages = this.dealResponse.masterlibrary;

                if (JSON.stringify(this.activeStage) == "{}") {
                    this.dealStages.forEach((element) => {
                        if (this.dealInfo.dealStage == element.stage) {
                            element.visibleCompletedTasks = false;
                            this.getStageTasks(element);
                        }
                    });
                } else {
                    this.dealStages.forEach((element) => {
                        if (this.activeStage.stage == element.stage) {
                            element.visibleCompletedTasks = false;
                            this.getStageTasks(element);
                        }
                    });
                }
                this.communicationService.clearLoader();
            },
            (err) => {
                this.communicationService.clearLoader();
            }
        );
    }

    getStageTasks(stageTask) {
        ////console.log(stageTask);
        this.communicationService.displayLoader(true);
        this.dealStage = stageTask.stage;
        this.activeStage = stageTask;
        this.activeStage.visibleCompletedTasks = false;
        this.dealTasks = JSON.parse(JSON.stringify(stageTask.tasks));
        this.dealCompletedTasks = JSON.parse(
            JSON.stringify(stageTask.completedTasks)
        );
        this.dealTasks.forEach((element) => {
            var taskDueDate =
                element.dueDate != null
                    ? moment(element.dueDate).format("YYYY-MM-DD")
                    : element.dueDate;
            var today = moment().format("YYYY-MM-DD");
            if (taskDueDate != null && taskDueDate < today) {
                element.status = "PastDue";
            } else {
                element.status = "FutureTasks";
            }
        });

        // this.dealCompletedTasks.forEach((element) => {
        //     var checkDueDate =
        //         element.dueDate != null
        //             ? new Date(element.dueDate)
        //             : element.dueDate;
        //     if (
        //         element.dueDate != null &&
        //         new Date(element.dueDate) < this.minDate
        //     ) {
        //         element.status = "PastDue";
        //     } else {
        //         element.status = "FutureTasks";
        //     }
        // });
        this.communicationService.setDealData(this.dealResponse);

        if (this.dealTasks.length > 0) {
            if (this.dealCompletedTasks.length > 0) {
                this.percCompletionPerStage = Math.floor(
                    (this.dealCompletedTasks.length /
                        (this.dealTasks.length +
                            this.dealCompletedTasks.length)) *
                        100
                );
                //this.percCompletionPerStage = Math.floor(30.9)
            } else {
                this.percCompletionPerStage = 0;
            }
            this.showTasks = true;
        } else {
            if (this.dealCompletedTasks.length > 0) {
                this.percCompletionPerStage = 100;
            }
            this.showTasks = false;
        }
        this.communicationService.clearLoader();
    }

    setOwnerName(taskEdit, event) {
        if (event == "Seller") {
            taskEdit.seletecdOwner = this.dealInfo.seller;
        } else if (event == "Buyer") {
            taskEdit.seletecdOwner = this.dealInfo.buyers;
        } else {
            var ds = [{ repId: "", name: this.dealInfo.dealSpecialist }];
            taskEdit.seletecdOwner = ds;
        }
        //taskEdit.ownerName = taskEdit.seletecdOwner[0].name;
    }

    setAssignedTo(task, event) {
        ////console.log(event)
    }

    trackByFn(index, item) {
        return index;
    }

    typeaheadOnSelect(event: TypeaheadMatch): void {
        this.repId = event.item.repid;
        this.advisorName = event.item.name;
        // this.router.navigate(['home/core-plan/'+this.repId+'/'+this.advisorName]);
        // this.getActionPlan("");
    }

    typeaheadNoResults(event: boolean): void {
        this.noResult = event;
    }

    expandRow(index) {
        this.expandedRow = index;
    }

    markStageComplete() {
        let initialState = {
            //currentUser : this.currentUser,
            //taskData: stage,
            title: "Mark Complete Stage",
            confirmTxt: "Do you want to mark complete this stage?",
            openFrom: "view-deal",
            //userType: this.userType,
        };

        this.bsModalRef = this.modalService.show(ConfirmModalComponent, {
            initialState,
            backdrop: "static",
            class: "modal-lg",
        });
        this.bsModalRef.content.closeBtnName = "Close";
        this.bsModalRef.content.confirm.subscribe((value) => {
            ////console.log(value);
        });
    }

    addTask(stage) {
        this.coppiedTasks = [];
        this.dealStages.forEach((stages, i) => {
            if (stages.tasks.length > 0) {
                stages.tasks.forEach((task) => {
                    this.coppiedTasks.push(task);
                });
            }
        });

        let initialState = {
            currentUser: this.currentUser,
            stageID: this.activeStage.stageID,
            title: "Add Task",
            taskList: this.coppiedTasks,
            openFrom: "viewDeal",
            taskInfo: null,
        };

        this.bsModalRef = this.modalService.show(AddMasterTasksComponent, {
            initialState,
            backdrop: "static",
            class: "modal-lg",
        });
        this.bsModalRef.content.closeBtnName = "Close";
        this.bsModalRef.content.mstrLibTaskSaved.subscribe((value) => {
            if (value) {
                //console.log(value);
                var params = {
                    username: this.currentUser.userName,
                    dealInfo: this.dealInfo,
                    tasks: "",
                };
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
                if (value.taskJson.taskInfo.taskStatusCd) {
                    value.taskJson.taskInfo.taskStatus = this.taskStatus.filter(
                        (val) =>
                            val.code == value.taskJson.taskInfo.taskStatusCd
                    )[0].name;
                }
                value.taskJson.taskInfo.isAdhocTask = 1;
                params.tasks = value.taskJson.taskInfo;
                ////console.log(params);
                this.saveTask(params);
            }
        });
    }

    editTask(stage, task, openFor) {
        if (task.dueDate) task.dueDate = moment(task.dueDate).format("ll");
        console.log(task);
        this.coppiedTasks = [];
        this.dealStages.forEach((stages) => {
            if (stages.tasks.length > 0) {
                stages.tasks.forEach((taskCp: any) => {
                    if (taskCp.task.toLowerCase() != task.task.toLowerCase())
                        this.coppiedTasks.push(taskCp);
                });
            }
        });
        ////console.log(stage);
        ////console.log(this.activeStage.stageID);

        task.openFor = openFor;
        let initialState = {
            currentUser: this.currentUser,
            stageID: task.stageID,
            title: openFor == "edit" ? "Edit Task" : "Reopen Task",
            taskList: this.coppiedTasks,
            openFrom: "viewDeal",
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
                console.log(value);
                var params = {
                    username: this.currentUser.userName,
                    dealInfo: this.dealInfo,
                    tasks: "",
                };
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
                if (value.taskJson.taskInfo.taskStatusCd) {
                    value.taskJson.taskInfo.taskStatus = this.taskStatus.filter(
                        (val) =>
                            val.code == value.taskJson.taskInfo.taskStatusCd
                    )[0].name;
                }
                value.taskJson.taskInfo.isAdhocTask = task.isAdhocTask;
                params.tasks = value.taskJson.taskInfo;
                //console.log(params);
                this.saveTask(params);
            }
        });
    }

    markComplete(taskCompleted, event) {}

    addNotes(dealDet, task) {
        var noteObj;
        //this.communicationService.getPlanData().subscribe(data => {
        //    noteObj = data;
        //});

        let initialState = {
            taskDetail: task,
            dealInfo: dealDet,
            // repId: noteObj.repId,
            currentUser: this.currentUser,
            title: "View/Add Task Notes",
            userType: this.userType,
        };

        this.bsModalRef = this.modalService.show(AddNoteComponent, {
            initialState,
            backdrop: "static",
            class: "modal-lg",
        });
        this.bsModalRef.content.closeBtnName = "Close";
        this.bsModalRef.content.notesAdded.subscribe((updatedTask) => {
            this.getDeal(this.dealID, this.dealTypeID);
        });
    }

    onValueChange(event, dateType) {
        let format = "MMM d, yyyy";
        // if(dateType === 'duedate'){
        //this.dealTasks[1].dueDate = this.datePipe.transform(event, format);
        //   this.maxDate = new Date(this.tasks.dueDate);
        //   this.maxDate.setDate(this.maxDate.getDate() - 1);
        // }
        // else{

        //   if(event == 'Invalid Date')
        //     event = '';
        //   this.tasks.internalDueDate = this.datePipe.transform(event, format);
        // }
    }
    completedDealTasks(deal) {
        let initialState = {
            dealInfo: deal,
            markedCompleteTask: this.completedTasks,
            currentUser: this.currentUser,
            title: "Completed Tasks",
        };

        this.bsModalRef = this.modalService.show(CompletedTasksComponent, {
            initialState,
            backdrop: "static",
            class: "modal-lg",
        });
        this.bsModalRef.content.closeBtnName = "Close";
        this.bsModalRef.content.taskReopened.subscribe((taskReopened) => {});
        this.bsModalRef.content.taskCount.subscribe((count) => {});
    }

    sortTaskByDate(tasks) {
        ////console.log(tasks);
        tasks.map((val) => {
            if (val.dueDate) val.dueDate = new Date(val.dueDate);
        });
        // Sort array by date in DESCENDING order
        // //console.log(this.sortOrderASC);
        if (this.sortOrderASC) {
            tasks.sort(function (a, b) {
                if (a.dueDate && b.dueDate) {
                    if (a.dueDate > b.dueDate) return -1;
                    if (a.dueDate < b.dueDate) return 1;
                } else if (!a.dueDate && b.dueDate) {
                    return 1;
                } else if (a.dueDate && !b.dueDate) {
                    return -1;
                }
                return 0;
            });
        } else {
            tasks.sort(function (a, b) {
                if (a.dueDate && b.dueDate) {
                    if (a.dueDate > b.dueDate) return 1;
                    if (a.dueDate < b.dueDate) return -1;
                } else if (!a.dueDate && b.dueDate) {
                    return -1;
                } else if (a.dueDate && !b.dueDate) {
                    return 1;
                }
                return 0;
            });
        }
        this.sortOrderASC = !this.sortOrderASC;
    }

    goToEditDeal(dealID) {
        this.communicationService.setEditDealFrom("managePlan");
        this.router.navigate(["/admin/create-deal/" + dealID]);
    }

    deleteTask(task, stage) {
        let initialState = {
            //currentUser : this.currentUser,
            //taskData: stage,
            title: "Confirm Action",
            confirmTxt: "Do you want to delete this task?",
            openFrom: "manage-deal",
            //userType: this.userType,
        };

        this.bsModalRef = this.modalService.show(ConfirmModalComponent, {
            initialState,
            backdrop: "static",
            class: "modal-lg",
        });
        //this.bsModalRef.content.closeBtnName = "Close";
        this.bsModalRef.content.confirm.subscribe((value) => {
            //console.log(value);
            if (value == "true") {
                //console.log(task);
                //console.log(stage);
                //task.isActive = 0;
                // task.steps.map((step) => {
                //     step.isActive = 0;
                // });
                //task.steps[index].isActive = 0;
                task.isActive = 0;

                if (task.steps.length > 0) {
                    task.steps.map((step) => (step.isActive = 0));
                }
                if (task.noteInfo) {
                    task.noteInfo.isActive = 0;
                }

                var params = {
                    username: this.currentUser.userName,
                    dealInfo: this.dealInfo,
                    tasks: task,
                };
                //console.log(params);
                this.saveTask(params);
            }
        });
    }
}
