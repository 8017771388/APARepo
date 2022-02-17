import { Component, OnInit } from '@angular/core';
//import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HomeService } from '../../../home/services/home.service';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-create-tasks',
  templateUrl: './create-tasks.component.html',
  styleUrls: ['./create-tasks.component.scss']
})
export class CreateTasksComponent implements OnInit {

  constructor(private homeService: HomeService, private modalService : BsModalService) { }

  public stageList: any;
  public bsModalRef : BsModalRef;

  ngOnInit() {
   var stageList = this.homeService.getStageTask();
   this.stageList = stageList.data.stageList;
  }

  switchAccordian(category){
    if(!category.switch)
      category.isCollapsed = true;
    else{
      category.isCollapsed = false;
      
    }

  }

  addTask(stage){
    let initialState = {
      //currentUser : this.currentUser,
      taskData: stage,
      title: 'Add Task',
      goalDetail : {},
      openFrom : 'home-page',
      //userType: this.userType,
    };
    
    this.bsModalRef = this.modalService.show(AddTaskComponent, {initialState, backdrop: 'static', class: 'modal-lg'});
    this.bsModalRef.content.closeBtnName = 'Close';
    // this.bsModalRef.content.taskSavedHome.subscribe(value => {     
     
    // })
  }

}
