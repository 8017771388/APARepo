import { Component, OnInit } from '@angular/core';
import { CommunicationService } from "../../../_shared/services/communication.services";

@Component({
  selector: 'app-premium-buyer',
  templateUrl: './premium-buyer.component.html',
  styleUrls: ['./premium-buyer.component.scss']
})
export class PremiumBuyerComponent implements OnInit {

  public currentTab: any;

  constructor(private communicationService: CommunicationService) {
    this.currentTab = "Buyers";
  }

  ngOnInit() {
    this.communicationService.hideNotiIcon();
  }

  adminRoute(event) {
    console.log(event)
    if(event.target.innerText.toLowerCase() == 'buyers'){
      this.currentTab = "Buyers"
    }
    else if(event.target.innerText.toLowerCase() == 'sellers'){
      this.currentTab = "Sellers"
    }
  }

}
