import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ViewDealService } from  '../../../home/services/view-deal.service';
import { DatePipe } from '@angular/common';
import { CommunicationService } from '../../../_shared/services/communication.services';
import { GOAL_STATUS } from '../../../_shared/constants/global.constant';

@Component({
  selector: 'app-completed-tasks',
  templateUrl: './completed-tasks.component.html',
  styleUrls: ['./completed-tasks.component.scss'],
  providers : [DatePipe, ViewDealService]
})
export class CompletedTasksComponent implements OnInit {

  @Output() taskReopened = new EventEmitter();
  @Output() taskCount = new EventEmitter();

  public taskConstant = GOAL_STATUS;
  public dealInfo : any;
  public completedTask : any;
  public dealDetail: any;
  public completedTaskRes;
  public title: any;
  public markedCompleteTask : any;
  public taskToBeReopened : any;
  public minDate: Date;

  constructor(private dealService : ViewDealService, private comService : CommunicationService, private datePipe : DatePipe, private modalService : BsModalService, public bsModalRef: BsModalRef) {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() + 1);
   }

  ngOnInit() {
    this.getCompletedTask();
  }

  getCompletedTask(){
    this.comService.displayLoader(true);
    // var request = {actionPlanId : this.actionPlanDet.actionplanId, goal: this.goalDetail.goal, goalId: this.goalDetail.goalId,
    //   categoryId: this.goalDetail.categoryId, category: this.goalDetail.category, status: 'completed'};

      this.completedTaskRes  = this.dealService.getDealDetails();
      this.dealDetail= this.completedTaskRes.data.dealInfo;
      this.completedTask = this.completedTaskRes.data.dealInfo.tasks;
      
      if(this.markedCompleteTask.length > 0){
        this.markedCompleteTask.forEach(element => {
          this.completedTask.push(element);
        });
      }

      this.taskToBeReopened = JSON.parse(JSON.stringify(this.completedTask));
      this.taskToBeReopened.forEach(element => {
        if(element.dueDate != null){
          element.dueDate = new Date(element.dueDate)
        }
      });
    this.comService.clearLoader();
  }

  onValueChange(event, dateType) {
    let format = "MMM d, yyyy";
    
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
      taskEdit.ownerName = taskEdit.seletecdOwner[0].name;
  }

  reopenTask(taskReopened){
    this.completedTask= this.completedTask.filter(ele => ele.task != taskReopened.task);
    this.taskToBeReopened= this.taskToBeReopened.filter(ele => ele.task != taskReopened.task);
    this.taskReopened.emit(taskReopened);
    this.taskCount.emit(this.completedTask.length)
  }

  cancel(task){
    this.completedTask.forEach((element,index) => {
      if(element.actionPlanDetailId == task.actionPlanDetailId){
        this.taskToBeReopened[index] = element;
        this.taskToBeReopened[index].dueDate = new Date(element.dueDate);
      }
    });
  }

}
