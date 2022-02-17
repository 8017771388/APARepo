import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TASK_STATUS } from '../../constants/global.constant';
import { HomeService } from '../../../home/services/home.service';
import { CommunicationService } from '../../services/communication.services';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {

  constructor(public bsModalRefNote: BsModalRef, private homeService : HomeService, private cs : CommunicationService) {
    this.today = new Date();
  }

  @Output() notesAdded = new EventEmitter();

  public title: any;
  public taskDetail : any;
  public dealInfo : any;
  public notes : any = "";
  public currentUser : any;
  public taskConstant = TASK_STATUS
  public taskNotes = [];
  public allNotes = [];
  public today: Date;
  public dueDateStatus : string= "";
  public clickOnce : boolean = false;

  ngOnInit() {
    this.getAllNotes();       
  }

  getAllNotes(){
    this.cs.displayLoader(true);
    this.homeService.getAllNotes(this.taskDetail.dealTaskID).subscribe((res) => {
      if(res["status"] == 'success'){
        var data = res["data"];
        this.taskNotes = data.taskInfo;  
        this.allNotes = data.notes;
        var dueDate  = data.taskInfo.taskDueDate;
        this.dueDateStatus = (dueDate != null && new Date(dueDate) < this.today) ? "PastDue" : "FutureTasks";  
        
        this.cs.clearLoader();
      }    
                
    }, (err) => {
       console.log(err)
       this.cs.clearLoader();
    })
  }

  saveNote(){
    this.clickOnce = true;
    var noteObj = {
        "noteID":0,
        "dealID":this.dealInfo.dealID,
        "dealTaskID":this.taskDetail.dealTaskID,
        "note": this.notes,
        "isInternal":0,  
        "noteLevel":'TL', 
        "isActive" :1, 
        "readFlag" :"R",
        "username": this.currentUser.userName,
        "createdByName": this.currentUser.displayName
    }

    this.homeService.saveNotes(noteObj).subscribe((res)=> {
      if(res["status"] == "success"){
        this.notesAdded.emit("true");
        this.notes = ""
        this.cs.resetNotificationDeal();
        this.bsModalRefNote.hide();
        //this.getAllNotes();       
               
      }
    }, (err) => {
      console.log(err);
      this.cs.resetNotificationDeal();
      this.bsModalRefNote.hide();
    })
    
  }

  closeNoteModal(){
    this.cs.resetNotificationDeal();
    this.bsModalRefNote.hide();
  }

}
