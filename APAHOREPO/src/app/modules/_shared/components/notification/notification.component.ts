import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HomeService } from '../../../home/services/home.service';
import { Router } from "@angular/router";
import { CommunicationService } from '../../services/communication.services';
import { UserInfo } from '../../services/userInfo.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  @Output() notificationClosed = new EventEmitter();

  //public bsModalRef: BsModalRef;
  public allNotification : any;
  public title: any;
  public currentUser : any;
  public readDeal : any = null;

  constructor(public bsModalRef: BsModalRef, private homeService : HomeService, public router : Router, public cs : CommunicationService, private userInfo: UserInfo) { }

  ngOnInit() {
    this.currentUser = this.userInfo._currentUserFn();
    this.getAllNotification();
  }

  getAllNotification(){
    this.homeService.getAllNotifications(this.currentUser.userName).subscribe(res => {
     // var data = this.homeService.getAllNotifications();
      this.allNotification = JSON.parse(JSON.stringify(res["data"].dealList));
      console.log(this.allNotification.length)
    })
    
  }

  getDealNotification(){
    this.homeService.getAllNotifications(this.currentUser.userName).subscribe(res => {
       this.allNotification = JSON.parse(JSON.stringify(res["data"].dealList));
       this.allNotification.forEach(element => {
        if(this.readDeal != null && element.dealInfo.notification.notificationID == this.readDeal.notification.notificationID){
          element.dealInfo.notification.visibleNote = this.readDeal.notification.visibleNote ;
        }
      });
     })
    
    
  }

  viewNote(dealInfo, noteNotificationInfo){
    var dealDet = {
      "dealID": dealInfo.dealID,
      "dealTypeID": dealInfo.dealTypeID,
      "dealType": dealInfo.dealType,    
      "dealName": dealInfo.dealName
    }
    var notObj = {
      dealDet : dealDet,
      taskDet : noteNotificationInfo
    }
    this.bsModalRef.hide();
    this.cs.setNotificationDeal(notObj);
    
    this.router.navigate(['home/view-deals-new/'+dealInfo.dealID+"/"+dealInfo.dealTypeID]);
  }

  readNote(deal, notification, event){
    event.stopPropagation();
    this.readDeal = deal;
    if(notification.readFlag == "U"){
      var req = {
        "notificationID" : notification.notificationID,
         "notificationType": notification.notificationType,
         "dealTaskID" : notification.dealTaskID,
         "noteID ":notification.noteID,
         "readFlag": "R",
         "isDismissed": "",
         "role" : notification.role,
         "notificationTo": notification.notificationTo,
         "username": this.currentUser.userName
      }
  
      this.homeService.updateNotification(req).subscribe(res => {
        if(res){
          this.readDeal.notification.visibleNote = true;
          this.getDealNotification();
        }
      })
    }
    else{
      this.readDeal.notification.visibleNote = !this.readDeal.notification.visibleNote;
      this.getDealNotification();
    }
    
  }

  dismissNotification(deal, notification){
    var req = {
      "notificationID" : notification.notificationID,
       "notificationType": notification.notificationType,
       "dealTaskID" : notification.dealTaskID,
       "noteID ":notification.noteID,
       "readFlag": notification.readFlag,
       "isDismissed": true,
       "role" : notification.role,
       "notificationTo": notification.notificationTo,
       "username": this.currentUser.userName
    }

    this.homeService.updateNotification(req).subscribe((res) => {
      if(res){
        this.getAllNotification();
      }
    }, (err) => {

    })
  }

  closeModal(){
    this.notificationClosed.emit(true);
    this.bsModalRef.hide();
  
  }
}
