import { Component, OnInit } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import CustomStore from 'devextreme/data/custom_store';
import { HomeService } from '../../services/home.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AddNoteComponent } from 'src/app/modules/_shared/components/add-note/add-note.component';


@Component({
  selector: 'app-task-det',
  templateUrl: './task-det.component.html',
  styleUrls: ['./task-det.component.scss']
})
export class TaskDetComponent implements OnInit {

  constructor(private homeService : HomeService, private modalService: BsModalService) { }

  public myNoteList: any;
  dataSource: any = {};
  public bsModalRef: BsModalRef;

  ngOnInit() {
    this.initializeGrid();
  }

  initializeGrid(){
    this.dataSource.store = new CustomStore({
      key: "noteId",
      load: (loadOptions: any) => {
       //let param = this.generateParameter(loadOptions);
        return new Promise((resolve) => {
          var result =  this.homeService.getNotes();
          this.myNoteList = result.data.noteList;
          let data = result['data'];      
          resolve({
            data: data['noteList']
          });
           
        });  
      }
    });
  }

  onValueChange(e,d){
    console.log(e);
  }

  openAddNote(){
    let initialState = {
      //currentUser : this.currentUser,
      //taskData: stage,
      title: 'Add Note',
      goalDetail : {},
      openFrom : 'taskdet-page',
      //userType: this.userType,
    };
    
    this.bsModalRef = this.modalService.show(AddNoteComponent, {initialState, backdrop: 'static', class: 'modal-lg'});
    this.bsModalRef.content.closeBtnName = 'Close';
    // this.bsModalRef.content.taskSavedHome.subscribe(value => {     
     
    // })
  }

}
