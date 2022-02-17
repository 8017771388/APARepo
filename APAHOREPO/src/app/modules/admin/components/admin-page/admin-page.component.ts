import { Component, OnInit } from '@angular/core';
import { AdvisorProfileComponent } from '../advisor-profile/advisor-profile.component';
import { CommunicationService } from '../../../_shared/services/communication.services';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  public currentTab : any;

    constructor(private communicationService : CommunicationService) { 
      this.currentTab = 'AdvisorProfile';
    }

  ngOnInit() { 
    this.communicationService.hideNotiIcon();
   }

  adminRoute(event){
    if(event.target.tagName.toLowerCase()=='span' && event.target.textContent.toLowerCase()=="manage cfo home profile"){
      this.currentTab = 'HomeProfile';
    }else if (event.target.tagName.toLowerCase()=='span' && event.target.textContent.toLowerCase()=="manage advisor profile"){
      this.currentTab = 'AdvisorProfile';
    }
  }

}
