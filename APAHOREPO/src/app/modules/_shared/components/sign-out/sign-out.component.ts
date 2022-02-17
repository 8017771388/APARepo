import { Component, AfterViewInit, HostListener } from "@angular/core";
import { LocationStrategy } from '@angular/common';
import { JqFunctions } from '../../static-class/jqfunctions.static';
import { STORAGE_KEY } from '../../constants/global.constant';
import { Router } from '@angular/router';
import { CommunicationService } from '../../services/communication.services';


@Component({
  selector: "signout",
  templateUrl: "./sign-out.component.html",
  styleUrls: ["./sign-out.component.scss"]
})
export class SignOutComponent implements AfterViewInit {
  isClicked = false;
  urlSubscription: any;
  @HostListener("window:load", ["$event"])
  onWebsiteLoad(_event): void {
    this.destoryData();
  }
  constructor(private locationStrategy: LocationStrategy, private router : Router, private communicationService : CommunicationService) {
    const self = this;
    
    window.addEventListener("storage", function (ev) {
      if (
        ev.key == STORAGE_KEY &&
        ev.newValue != "" &&
        ev.newValue != null &&
        ev.newValue != "undefined" &&
        self.isClicked == false
      ) {
        //self.login();
      }
    });
  }
  ngAfterViewInit() {
    this.destoryData();
    this.preventBackButton();
    this.communicationService.setUserInfo(null);
  }

  destoryData() {
    JqFunctions.deleteLocalStorage(); // clear stoarge
  }

  ngOnDestroy() {
    if (this.urlSubscription) {
      this.urlSubscription.unsubscribe();
    }
  }

  preventBackButton() {
    history.pushState(null, null, location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, null, location.href);
    })

  }

  reloadToHome() {
    //location.reload(true, '/home/home-page');
    this.router.navigate(['home']);
    //this.router.url;
  }

}