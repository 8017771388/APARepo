import { Component, OnInit } from "@angular/core";
import { MasterLibraryService } from "../../services/master-library.service";
import { AddTaskComponent } from "../../../_shared/components/add-task/add-task.component";
import { TaskReorderComponent } from "../../../_shared/components/task-reorder/task-reorder.component";
import { UserInfo } from "../../../_shared/services/userInfo.service";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { AddMasterTasksComponent } from "../add-master-tasks/add-master-tasks.component";
import { CommunicationService } from "../../../_shared/services/communication.services";
import { ConfirmModalComponent } from "../../../_shared/components/confirm-modal/confirm-modal.component";
import {
    TASKACTION,
    TASKCATEGORY,
    TASKOWNER,
} from "../../../_shared/constants/global.constant";

@Component({
    selector: "app-task",
    templateUrl: "./task.component.html",
    styleUrls: ["./task.component.scss"],
})
export class TaskComponent implements OnInit {
    public currentUser: any;
    private reqObj: any = {
        departmentId: null,
        username: null,
    };
    public taskList: any = { status: "", data: [] };
    public searchTxt: "";
    public coppiedTasks: any;
    public errMsg: string;
    public bsModalRef: BsModalRef;
    public dealtypeList: any = { status: "", data: [] };
    public statusObj: any;
    public errorMessage: string;
    public coppiedstage: any;
    public dealType: any;
    public stageList: any = { status: "", data: [] };
    public stageSearched: boolean = false;
    public deal: string = "";
    public selectedDealType: any = "";
    public selectedDealTypeObj: any="";
    public selectedStage: any = "";
    public stage: string = "";
    public selectStageMsg = "";
    public taskAction: any = TASKACTION;
    public taskCategory: any = TASKCATEGORY;
    public taskOwner: any = TASKOWNER;
    public showSelectStageMsg : boolean = false;
    

    constructor(
        private masterLibraryService: MasterLibraryService,
        public modalService: BsModalService,
        private userInfo: UserInfo,
        private communicationService: CommunicationService
    ) {}

    ngOnInit() {
        this.currentUser = this.userInfo._currentUserFn();
        this.reqObj.username = this.currentUser.userName;
        this.getAllDealtypes();
        //console.log(TASKACTION);
    }

    getAllDealtypes() {
        //this.communicationService.displayLoader(true);
        // this.masterLibraryService.getAllDealtypes().subscribe((resp) => {
        //     this.categoryList = resp;
        //     if (this.categoryList.status != "success") {
        //         this.categoryList.data = [];
        //     }
        //     this.communicationService.clearLoader();
        // });
        this.dealtypeList = this.masterLibraryService.getAllDealTypes();
        //console.log(this.dealtypeList);

        this.communicationService.displayLoader(true);
        this.masterLibraryService.getAllDealTypes().subscribe(
            (resp) => {
                this.dealtypeList = resp;
                if (this.dealtypeList.status != "success") {
                    this.dealtypeList.data = [];
                } else {
                    //this.communicationService.clearLoader();
                    // this.selectedDealType = this.dealtypeList.data[0].dealTypeID;
                    // this.getSatges(this.selectedDealType, this.searchTxt);
                    // this.getAllTasks(
                    //     this.selectedDealType,
                    //     null,
                    //     this.searchTxt
                    // );
                }
                this.communicationService.clearLoader();
            },
            function (err) {
                this.communicationService.clearLoader();
            }
        );
    }    

    getSatges(event, searchTxt) {
        this.communicationService.displayLoader(true);
        var dealTyepId = 0;
        this.selectedStage = "";
        ////console.log(this.dealType);
        if (this.selectedDealType) {
            //this.dealType = {};
            dealTyepId = this.selectedDealType ? this.selectedDealType : 0;
        }
        if (searchTxt == null) {
            this.searchTxt = "";
            this.stageSearched = false;
        } else {
            this.stageSearched = true;
        }
        if (dealTyepId && dealTyepId > 0) {
            this.masterLibraryService
                .getAllStages(dealTyepId)
                .subscribe((resp) => {
                    this.stageList = resp;
                    if (this.stageList.status != "success") {
                        this.stageList.data = [];
                        this.communicationService.clearLoader();
                    } else {
                        //this.selectedStage = this.stageList.data[0].stageID;

                        this.communicationService.clearLoader();
                    }
                });
        }
        else{
            this.selectedStage = "";
        }
        this.communicationService.clearLoader();
    }

    searchWithTxt(e: any) {
        if (e.keyCode == 13) {
            var dealTypeId;
            if (!this.selectedDealType) {
                dealTypeId = 0;
            } else {
                dealTypeId = this.selectedDealType.dealTypeId;
            }
            this.getSatges(dealTypeId, this.searchTxt);
        }
    }

    getAllTasks(dealTypeID, stageID, searchString) {
        this.selectStageMsg = "";
        this.showSelectStageMsg = false;
       
       
        console.log('this.dealtypeList.data', this.dealtypeList.data);
        this.selectedDealTypeObj = this.dealtypeList.data.filter(
            type => type.dealTypeID === this.selectedDealType);
        console.log('selectedDealTypeObj', this.selectedDealTypeObj);
        var param = {
            dealTypeID: dealTypeID,
            stageID: null,
            searchString: null,
        };
        this.communicationService.displayLoader(true);
        this.masterLibraryService.getAllTasks(param).subscribe((rsp) => {
            this.taskList = rsp;
            if (this.taskList.status != "success") {
                this.taskList.data = [];
            } else {
                this.taskList.data.forEach((task) => {
                    task.isCollapsed = false;
                });
                this.coppiedTasks = this.taskList.data.map((x) =>
                    Object.assign({}, x)
                );
                if (stageID) {
                    var newArr = this.taskList.data.filter(
                        (task) => task.stageID == stageID
                    );
                    this.taskList.data = newArr;
                }
            }
            this.communicationService.clearLoader();
        });
    }

    addTask() {
        if (this.selectedStage) {
            this.selectStageMsg = "";
            console.log(this.selectedStage);
            let initialState = {
                currentUser: this.currentUser,
                stageID: this.selectedStage,
                title: "Add Task",
                taskList: this.coppiedTasks,
                openFrom: "masterLibrary",
                //userType: this.userType,
            };

            this.bsModalRef = this.modalService.show(AddMasterTasksComponent, {
                initialState,
                backdrop: "static",
                class: "modal-lg",
            });
            this.bsModalRef.content.closeBtnName = "Close";
            this.bsModalRef.content.mstrLibTaskSaved.subscribe((value) => {
                if (value) {
                    this.getAllTasks(
                        this.selectedDealType,
                        this.selectedStage,
                        this.searchTxt
                    );
                }
            });
        } else {
            this.selectStageMsg = "Select a stage to add task.";
        }
    }

    reOrder(){
        if(this.selectedStage){
            this.showSelectStageMsg = false;
            
            let initialState = {
                //currentUser: this.currentUser,
                stageID: this.selectedStage,
                dealType: this.selectedDealType,
                title: "Rearrange Task",
                //List: this.coppiedTasks,
                openFrom: "masterLibrary",
                //userType: this.userType,
            };
            this.bsModalRef = this.modalService.show(TaskReorderComponent, {
                initialState,
                backdrop: "static",
                class: "modal-xl",
            });
            this.bsModalRef.content.taskOrdered.subscribe((value) => {
                if (value) {
                    this.searchTxt = ""
                    this.getAllTasks(
                        this.selectedDealType,
                        this.selectedStage,
                        this.searchTxt
                    );
                }
            });
        }
        else{
            this.showSelectStageMsg = true;
            
        }
        
    }

    deleteTask(taskDeleted) {
        let initialState = {
            //currentUser : this.currentUser,
            //taskData: stage,
            title: "Confirm Action",
            confirmTxt: "Do you want to delete this task?",
            openFrom: "master-library",
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
            if (value == "true") {
                //console.log(taskDeleted);
                taskDeleted.isActive = 0;
                taskDeleted.steps.map((step) => {
                    step.isActive = 0;
                });

                var param = {
                    username: this.currentUser.userName,
                    taskJson: {
                        taskInfo: taskDeleted,
                    },
                };

                this.masterLibraryService.saveTask(param).subscribe(
                    (rsp: any) => {
                        console.log(rsp);
                        if (rsp.status.toLowerCase() == "success") {
                            var stargeID = this.selectedStage
                                ? this.selectedStage
                                : null;
                            this.getAllTasks(
                                this.selectedDealType,
                                stargeID,
                                this.searchTxt
                            );
                        }
                    },
                    (err) => {
                        console.log(err);
                    }
                );
            }
        });
    }

    addStep(task) {
        console.log(task);
    }

    checkDuplicateTask(task, i) {}

    updateTask(task) {}

    deleteStep(task, index) {
        let initialState = {
            //currentUser : this.currentUser,
            //taskData: stage,
            title: "Confirm Action",
            confirmTxt: "Do you want to delete this step?",
            openFrom: "master-library",
            //userType: this.userType,
        };

        this.bsModalRef = this.modalService.show(ConfirmModalComponent, {
            initialState,
            backdrop: "static",
            class: "modal-lg",
        });
        //this.bsModalRef.content.closeBtnName = "Close";
        this.bsModalRef.content.confirm.subscribe((value) => {
            console.log(value);
            if (value == "true") {
                //console.log(taskDeleted);
                //task.isActive = 0;
                // task.steps.map((step) => {
                //     step.isActive = 0;
                // });
                task.steps[index].isActive = 0;

                var param = {
                    username: this.currentUser.userName,
                    taskJson: {
                        taskInfo: task,
                    },
                };

                this.masterLibraryService.saveTask(param).subscribe(
                    (rsp: any) => {
                        console.log(rsp);
                        if (rsp.status.toLowerCase() == "success") {
                            // var stargeID = this.selectedStage
                            //     ? this.selectedStage
                            //     : null;
                            // this.getAllTasks(
                            //     this.selectedDealType,
                            //     stargeID,
                            //     this.searchTxt
                            // );
                            task.steps.splice(index, 1);
                        }
                    },
                    (err) => {
                        console.log(err);
                    }
                );
            }
        });
    }
}
