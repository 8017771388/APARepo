import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import {
    TASKACTION,
    TASKCATEGORY,
    TASKOWNER,
    TASKSTATUS,
} from "../../../_shared/constants/global.constant";
import { MasterLibraryService } from "../../services/master-library.service";
import { DatePipe } from "@angular/common";
import { UserInfo } from "../../../_shared/services/userInfo.service";

@Component({
    selector: "app-add-master-tasks",
    templateUrl: "./add-master-tasks.component.html",
    styleUrls: ["./add-master-tasks.component.scss"],
    providers: [DatePipe],
})
export class AddMasterTasksComponent implements OnInit {
    @Output() mstrLibTaskSaved = new EventEmitter();

    public title: any;
    public currentUser: any;
    public taskList: any;
    public stageID: any;
    public action: any = TASKACTION;
    public category: any = TASKCATEGORY;
    public taskowner: any = TASKOWNER;
    public status: any = TASKSTATUS;
    public invalidTask: boolean = false;
    public openFrom: string;
    public taskInfo: any;
    public currentDate = new Date();
    public minDate: Date;

    public tasks: any = {
        username: "",
        taskJson: {
            taskInfo: {
                dealTaskID: 0,
                taskID: 0,
                stageID: 0,
                task: "",
                taskCategoryCd: "",
                taskActionCd: "",
                taskOwnerCd: "",
                taskStatusCd: "NS",
                isActive: 1,
                taskDueDate: null,
                noteInfo: {
                    note: "",
                    noteID: 0,
                    isActive: 1,
                    noteLevel: "TL",
                    realFlag: "R",
                    isInternal: 0,
                    createdByName:""
                },
                steps: [],
            },
        },
    };
    public disableOnEdit: boolean = false;
    public showDateCal: boolean = false;
    public showNote: boolean = false;
    public showStatus: boolean = false;
    public isReOpen: boolean = false;

    constructor(
        public bsModalRef: BsModalRef,
        private masterLibraryService: MasterLibraryService,
        private userInfo: UserInfo,
        public datePipe: DatePipe
    ) {
        this.minDate = new Date();
        this.minDate.setDate(this.currentDate.getDate() + 1);
    }

    ngOnInit() {
        //console.log(this.taskInfo.dueDate);
        //console.log(this.stageID);
        this.currentUser = this.userInfo._currentUserFn();
        this.tasks.taskJson.taskInfo.stageID = this.stageID;
        this.tasks.username = this.currentUser.userName;
        this.tasks.taskJson.taskInfo.noteInfo.createdByName = this.currentUser.displayName;
        if (this.openFrom == "buildDeal" || this.openFrom == "viewDeal") {
            if (this.taskInfo) {
                this.tasks.taskJson.taskInfo.dealTaskID = this.taskInfo.dealTaskID;
                this.tasks.taskJson.taskInfo.taskID = this.taskInfo.taskID;
                this.tasks.taskJson.taskInfo.task = this.taskInfo.task;
                this.tasks.taskJson.taskInfo.taskCategoryCd = this.taskInfo.taskCategoryCd;
                this.tasks.taskJson.taskInfo.taskActionCd = this.taskInfo.taskActionCd;
                this.tasks.taskJson.taskInfo.taskOwnerCd = this.taskInfo.taskOwnerCd;
                this.tasks.taskJson.taskInfo.taskDueDate = this.taskInfo
                    .taskDueDate
                    ? this.taskInfo.taskDueDate
                    : this.taskInfo.dueDate;
                // this.tasks.taskJson.taskInfo.taskDueDate = this.taskInfo
                //     .taskDueDate
                //     ? this.taskInfo.taskDueDate
                //     : this.taskInfo.dueDate;
                // if (this.openFrom == "buildDeal") {
                //     //console.log(this.taskInfo.taskDueDate);
                //     this.tasks.taskJson.taskInfo.taskDueDate = this.taskInfo.taskDueDate;
                // } else {
                //     //console.log(this.taskInfo.dueDate);
                //     this.tasks.taskJson.taskInfo.taskDueDate = this.taskInfo.dueDate ? ;
                // }
                this.tasks.taskJson.taskInfo.taskStatusCd = this.taskInfo.taskStatusCd;
                this.tasks.taskJson.taskInfo.steps = this.taskInfo.steps;
                
                if (this.taskInfo.taskID != 0) this.disableOnEdit = true;
                if (this.openFrom == "viewDeal") {
                    this.showStatus = true;
                    if (this.taskInfo.openFor == "reopen") {
                        this.isReOpen = true;
                        this.tasks.taskJson.taskInfo.taskStatusCd = "";
                        this.status = this.status.filter((stat) =>
                            stat.code == "CM" ? false : true
                        );
                    } else {
                        this.tasks.taskJson.taskInfo.noteInfo = {
                            note: "",
                            noteID: 0,
                            isActive: 1,
                            noteLevel: "TL",
                            realFlag: "R",
                            isInternal: 0,
                            createdByName: this.currentUser.displayName
                        };
                    }
                }
                //console.log(this.tasks.taskJson.taskInfo);
            }
            this.showDateCal = true;
        }
        if (this.openFrom == "viewDeal") {
            this.showNote = true;
            this.showDateCal = true;
            // if (this.taskInfo.openFor == "reopen") this.showNote = false;
        }
        //console.log(this.taskList);
    }

    onValueChange(event, task) {
        let format = "MMM d, yyyy";
        task.taskDueDate = this.datePipe.transform(event, format);
    }

    addStep() {
        if (this.tasks.taskJson.taskInfo.steps.length < 3) {
            this.tasks.taskJson.taskInfo.steps.push({
                stepID: 0, //this.tasks.taskJson.taskInfo.steps.length + 1,
                step: "",
                isActive: 1,
            });
        }
    }

    checkDuplicateTask() {
        this.invalidTask = false;
        var resArr = this.taskList.filter(
            (taskdet) =>
                taskdet.task.toLowerCase() ==
                this.tasks.taskJson.taskInfo.task.toLowerCase()
        );
        if (resArr.length > 0) this.invalidTask = true;
    }

    deleteStep(i) {
        this.tasks.taskJson.taskInfo.steps.splice(i, 1);
    }

    saveTask() {
        console.log(this.tasks)
        if (this.openFrom == "buildDeal" || this.openFrom == "viewDeal") {
            this.mstrLibTaskSaved.emit(this.tasks);
            this.bsModalRef.hide();
        } else {
            this.masterLibraryService.saveTask(this.tasks).subscribe(
                (rsp: any) => {
                    console.log(rsp);
                    if (rsp.status.toLowerCase() == "success") {
                        this.mstrLibTaskSaved.emit(true);
                        this.bsModalRef.hide();
                    }
                },
                (err) => {
                    console.log(err);
                }
            );
        }
    }
}
