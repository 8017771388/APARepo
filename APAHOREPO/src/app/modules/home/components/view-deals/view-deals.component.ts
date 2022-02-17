import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { Observable } from "rxjs";
import { TypeaheadMatch } from "ngx-bootstrap/typeahead";
import {
    GOAL_STATUS,
    TASK_STATUS,
} from "../../../_shared/constants/global.constant";
import { AddTaskComponent } from "../../../_shared/components/add-task/add-task.component";
import { ViewDealService } from "../../services/view-deal.service";
import { CommunicationService } from "../../../_shared/services/communication.services";
import { ConfirmModalComponent } from "../../../_shared/components/confirm-modal/confirm-modal.component";
import { AddNoteComponent } from "../../../_shared/components/add-note/add-note.component";
import { CompletedTasksComponent } from "../../../_shared/components/completed-tasks/completed-tasks.component";

@Component({
    selector: "app-view-deals",
    templateUrl: "./view-deals.component.html",
    styleUrls: ["./view-deals.component.scss"],
})
export class ViewDealsComponent implements OnInit {
    public taskConstant = TASK_STATUS;
    public bsModalRef: BsModalRef;
    public dealResponse: any = [];
    public dealInfo: any = [];
    public dealTasks: any = [];
    public currentUser: any;
    public requestData: any;
    public goalStatus: string = "";
    public showTasks: boolean = false;
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

    public completedTasks: any = [];

    constructor(
        private modalService: BsModalService,
        private viewDealService: ViewDealService,
        private communicationService: CommunicationService,
        private changeDetector: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.getDeal();
    }

    getDeal() {
        this.communicationService.displayLoader(true);
        this.requestData = {
            repId: this.repId,
        };
        this.dealResponse = this.viewDealService.getDeals(this.requestData);
        this.dealInfo = this.dealResponse.data.dealInfo;
        this.dealTasks = Object.assign(
            [],
            this.dealResponse.data.dealInfo.tasks
        );
        this.dealTasks.selectedOwner = [];
        // this.dealTasks.forEach(element => {
        //   this.setOwnerName(element, element.owner);
        // });
        //if(data){
        //this.corePlanResponse = data;
        //var arrayToBesorted= this.corePlanResponse.data.advisorInfo;
        //this.corePlanGoals = this.orderPipe.transform(arrayToBesorted, 'goals.goalOrder');
        //this.communicationService.setPlanData(data);
        this.communicationService.setDealData(this.dealResponse);

        if (this.dealTasks.length > 0) {
            this.showTasks = true;
        } else {
            this.showTasks = false;
        }
        this.communicationService.clearLoader();
        //}
        //this.communicationService.clearLoader();
        //})
    }

    setOwnerName(task, event) {
        //console.log(event);
        if (event == "Seller") {
            task.seletecdOwner = this.dealInfo.seller;
        } else if (event == "Buyer") {
            task.seletecdOwner = this.dealInfo.buyers;
        } else {
            var ds = [{ repId: "", name: this.dealInfo.dealSpecialist }];
            task.seletecdOwner = ds;
        }
    }

    setAssignedTo(task, event) {
        //console.log(event)
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
            console.log(value);
        });
    }

    addTask(dealDet) {
        let initialState = {
            //currentUser : this.currentUser,
            dealDetail: dealDet,
            title: "Add Task",
            goalDetail: {},
            openFrom: "view-deal",
            //userType: this.userType,
        };

        this.bsModalRef = this.modalService.show(AddTaskComponent, {
            initialState,
            backdrop: "static",
            class: "modal-lg",
        });
        this.bsModalRef.content.closeBtnName = "Close";
        this.bsModalRef.content.taskSaved.subscribe((task) => {
            console.log(task);
            task.actionPlanDetailId = this.dealTasks.length;
            this.dealTasks.push(task);
        });
    }

    editTask(dealDet, task, event) {
        let initialState = {
            //currentUser : this.currentUser,
            dealDetail: dealDet,
            title: "Edit Task",
            taskDetail: task,
            openFrom: "view-deal",
            //userType: this.userType,
        };

        this.bsModalRef = this.modalService.show(AddTaskComponent, {
            initialState,
            backdrop: "static",
            class: "modal-lg",
        });
        this.bsModalRef.content.closeBtnName = "Close";
        this.bsModalRef.content.taskSaved.subscribe((updatedTask) => {
            this.dealTasks.forEach((element, i) => {
                if (
                    element.actionPlanDetailId == updatedTask.actionPlanDetailId
                ) {
                    this.dealTasks[i] = updatedTask;
                    //this.setOwnerName(this.dealTasks[i], this.dealTasks[i].owner);
                }
            });
            this.changeDetector.detectChanges();
            console.log(this.dealTasks);
        });
    }

    deleteTask(taskDeleted, event) {
        let initialState = {
            //currentUser : this.currentUser,
            //taskData: stage,
            title: "Confirm Action",
            confirmTxt: "Do you want to delete this task?",
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
            if (value == "true") {
                this.dealTasks = this.dealTasks.filter(
                    (task) =>
                        task.actionPlanDetailId !=
                        taskDeleted.actionPlanDetailId
                );
                console.log(this.dealTasks.length);
            }
        });
    }

    markComplete(taskCompleted, event) {
        var taskExist = false;
        if (this.completedTasks.length > 0) {
            this.completedTasks.forEach((element) => {
                if (
                    element.actionPlanDetailId !=
                    taskCompleted.actionPlanDetailId
                ) {
                    taskExist = false;
                } else {
                    taskExist = true;
                }
            });
        } else {
            taskExist = false;
            //this.completedTasks.push(taskCompleted);
        }

        if (taskExist == false) {
            this.completedTasks.push(taskCompleted);
        }

        this.dealTasks = this.dealTasks.filter(
            (task) =>
                task.actionPlanDetailId != taskCompleted.actionPlanDetailId
        );
        this.dealInfo.completedTasks = this.dealInfo.completedTasks + 1;
    }

    addNotes(task, dealDet, index) {
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
            this.dealTasks.forEach((element, i) => {
                if (
                    element.actionPlanDetailId == updatedTask.actionPlanDetailId
                ) {
                    //this.dealTasks[i] =updatedTask;
                    element.totalNote = updatedTask.notes.length;
                }
            });
        });
    }

    addActivity(deal, task, index) {}

    editActivity(task, activity, index) {}

    deleteActivity(dealInfo, activity, index) {}

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
    }
}
