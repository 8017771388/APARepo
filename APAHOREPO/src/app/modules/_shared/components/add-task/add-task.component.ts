import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { DatePipe } from "@angular/common";
import { TASKOWNER } from "../../constants/global.constant";

@Component({
    selector: "app-add-task",
    templateUrl: "./add-task.component.html",
    styleUrls: ["./add-task.component.scss"],
    providers: [DatePipe],
})
export class AddTaskComponent implements OnInit {
    @Output() taskSaved = new EventEmitter();

    constructor(public bsModalRef: BsModalRef, public datePipe: DatePipe) {
        this.minDate = new Date();
        this.minDate.setDate(this.currentDate.getDate() + 1);
    }

    public title: any;
    public openFrom: any;
    public tasks: any = {
        task: "",
        owner: "",
        ownerName: "",
        dueDate: "",
        note: "",
        department: "",
        sla: "",
        notes: [],
    };
    public taskOwner: any = TASKOWNER;
    public currentDate = new Date();
    public minDate: Date;
    public goalType: any;
    public dealDetail: any;
    public taskDetail: any;
    public currentUser: any;
    masterLibraryTask: any;
    public masterLibrary: any;
    public multipleTask: any = {};
    public tasksSelected: any = {};
    public repId: any = null;
    public cfoName: any = null;
    public cfoUserName: any = null;
    public isNewGoal: boolean = false;
    public taskData: any = null;
    public isEdit: boolean = false;
    public editDate: any;
    public editInternalDate: any;
    public allTaskExist: boolean = false;
    public taskExist: boolean = false;
    public clickOnce: boolean = false;
    public userType: any;
    public allInternalStatus: any;
    public maxDate: any;
    public advDetGoals: any;
    public type: any;
    public showNotes: boolean = true;
    public showMasterLibrary: boolean = true;

    ngOnInit() {
        if (this.openFrom == "view-deal") {
            if (this.title == "Edit Task") {
                this.tasks = Object.assign({}, this.taskDetail);
                if (this.taskDetail.dueDate !== null) {
                    this.editDate = new Date(this.taskDetail.dueDate);
                } else {
                    this.editDate = this.taskDetail.dueDate;
                }
                // this.tasks.owner = this.taskDetail.vcfoOrAdvisor;
            }
        } else if (this.openFrom == "build-deal-plan") {
            console.log(this.dealDetail);
            this.showNotes = false;
            this.showMasterLibrary = false;
        }
    }

    onValueChange(event, dateType) {
        let format = "MMM d, yyyy";
        // if(dateType === 'duedate'){
        this.tasks.dueDate = this.datePipe.transform(event, format);
        //   this.maxDate = new Date(this.tasks.dueDate);
        //   this.maxDate.setDate(this.maxDate.getDate() - 1);
        // }
        // else{

        //   if(event == 'Invalid Date')
        //     event = '';
        //   this.tasks.internalDueDate = this.datePipe.transform(event, format);
        // }
    }

    saveTask() {
        if (this.tasks.owner != "") {
            this.tasks.ownerName =
                this.tasks.owner == "Deal Specialist"
                    ? this.dealDetail.dealSpecialist
                    : this.tasks.owner == "Buyer"
                    ? this.dealDetail.buyers[0].name
                    : this.dealDetail.seller[0].name;
        }

        //this.tasks.actionPlanDetailId = this.title == "Add Task" ? 0 : this.taskDetail.actionPlanDetailId

        this.taskSaved.emit(this.tasks);
        this.bsModalRef.hide();
    }
}
