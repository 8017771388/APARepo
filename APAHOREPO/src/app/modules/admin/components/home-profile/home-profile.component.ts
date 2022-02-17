import { Component, OnInit } from '@angular/core';
import {HomeService } from '../../services/home.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
//import { UpdateVcfoComponent } from '../../../_shared/components/update-vcfo/update-vcfo.component';
import { UserInfo } from  '../../../_shared/services/userInfo.service';
import { CommunicationService } from '../../../_shared/services/communication.services';
import { AppSettings } from '../../../_shared/constants/api-constant';

@Component({
  selector: 'app-home-profile',
  templateUrl: './home-profile.component.html',
  styleUrls: ['./home-profile.component.scss'],
  providers : [HomeService]
})
export class HomeProfileComponent implements OnInit {
  public showHeaderFilter : boolean = true;
  public housers : any = [];
  public param : any;
  public totalCount :number;
  public bsModalRef : BsModalRef;
  public updateformdata : any;
  public currentUser : any;
  public userRole : any;
  public dealSpecialist = AppSettings.adGroup.dealSpecialist;
  

  constructor(private service : HomeService,private modalService : BsModalService, private userinfo : UserInfo, private communicationService: CommunicationService) { }

  ngOnInit() {
    this.initData();    
    this.currentUser = this.userinfo._currentUserFn();
    this.currentUser.groups.forEach(value => {
      if (value.name.toLowerCase() == this.dealSpecialist.toLowerCase() ) {
        this.userRole = AppSettings.adGroup.dealSpecialist;
      }
      
    }); 
  }
  
  contentReady(e){
    this.totalCount = e.component.totalCount();
  }
  
  initData(){
    this.service.getData().subscribe( data => {
      this.housers = data['data'];
      this.totalCount = this.housers.length;
      this.communicationService.setCFO(this.housers);
    });
  }

  updateVcfo(data){
    this.updateformdata = data;

    let initialState = {
      vcfoDetail:this.updateformdata.data,
      title : "Update CFO",
      openFor: "Edit",
      currentUser : this.currentUser
    };

    //this.bsModalRef = this.modalService.show(UpdateVcfoComponent, {initialState, backdrop: 'static', class: 'modal-lg'});
    //this.bsModalRef.content.closeBtnName = 'Close';
    //this.bsModalRef.content.updatevcfo.subscribe(value => {
    //  if(value){
    //    this.initData();
    //  }
    //})
  }

  addCFO(){
    var allCFO
    this.communicationService.getCFO().subscribe(data => {
      allCFO = data;
      //this.addGoalObj = this.orderPipe.transform(this.addGoalObj, 'goals.goalOrder');
    });

    let initialState = {
      title: 'Add New CFO',
      openFor: "Add",
      cfosData : allCFO,
      currentUser : this.currentUser
    };
    
    //this.bsModalRef = this.modalService.show(UpdateVcfoComponent, {initialState, backdrop: 'static', class: 'modal-lg'});
    //this.bsModalRef.content.closeBtnName = 'Close';
    //this.bsModalRef.content.updatevcfo.subscribe(value => {
    //  if(value){
    //    this.initData();
    //  }
    //})

  }
}


