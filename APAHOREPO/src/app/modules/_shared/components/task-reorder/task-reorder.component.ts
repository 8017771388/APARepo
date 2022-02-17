import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { DatePipe } from "@angular/common";
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MasterLibraryService } from '../../../master-library/services/master-library.service';
import { UserInfo } from '../../services/userInfo.service';

@Component({
  selector: 'app-task-reorder',
  templateUrl: './task-reorder.component.html',
  styleUrls: ['./task-reorder.component.scss'],
  providers: [DatePipe]
})

export class TaskReorderComponent implements OnInit {

  @Output() taskOrdered = new EventEmitter();

  public title : any;
  public openFrom : any;
  public tasks : any;
  public currentUser : any;
  public originalTaskOrder : any;
  public stageID : any;
  public dealType : any;

  constructor(public bsModalRef: BsModalRef, public service : MasterLibraryService, public userInfo : UserInfo) { }

  ngOnInit() {
    this.currentUser = this.userInfo._currentUserFn();
    this.getDealLibraryTask();
  }

  getDealLibraryTask(){
    var param = {
      dealTypeID: this.dealType,
      stageID: this.stageID,
      searchString: null,
    };

    this.service.getAllTasks(param).subscribe(rsp => {
      var data = rsp;
      this.tasks = JSON.parse(JSON.stringify(data["data"]));
      this.tasks = this.tasks.filter(element => element.stageID == this.stageID);
      this.originalTaskOrder = JSON.parse(JSON.stringify(data["data"]));
      this.originalTaskOrder = this.originalTaskOrder.filter(element => element.stageID == this.stageID);
    });
  }

  onDrop(event: CdkDragDrop<string[]>) {
    //console.log(event);
    // moveItemInArray(
    //    this.allNumbers, 
    //    event.previousIndex, 
    //    event.currentIndex
    // );
    if (event.previousContainer === event.container) {
           moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
   } else {
      transferArrayItem(event.previousContainer.data,
      this.tasks,
      event.previousIndex,
      event.currentIndex);
   }
    
  //  this.tasks.forEach((element, index) => {
  //    element.taskOrder = index + 1;
  //  });
    
   
  } 

  saveOrder(){
    this.tasks.forEach((element, index) => {
      element.taskOrder = index + 1;
    });

    var param = {
      stageID : this.stageID,
      username: this.currentUser.userName,
      jsonTasks: this.tasks
    }
    //console.log(param)
    this.service.saveDealLibraryTaskOrder(param).subscribe(res => {
      //console.log(res);
      if(res["status"] == 'success'){
        this.taskOrdered.emit("true");
        this.bsModalRef.hide();
      }
    })

  }

  cancelOrder(){
    this.tasks = JSON.parse(JSON.stringify(this.originalTaskOrder));
    this.bsModalRef.hide();
  }
}
